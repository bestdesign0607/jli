# network/views.py
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Wallet, Transaction, AmbassadorProfile, Purchase, WithdrawalRequest
from .serializers import UserProfileSerializer, WalletSerializer, TransactionSerializer, AmbassadorProfileSerializer, WithdrawalRequestSerializer
from .services import distribute_for_purchase
from .tasks import distribute_for_purchase_task, execute_withdrawal_task
from django.db import transaction
from django.utils import timezone
from decimal import Decimal
from .services import attach_ambassador
from rest_framework.permissions import IsAuthenticated



class AmbassadorSignupAPIView(APIView):
    """
    Endpoint for a customer to become an ambassador after qualifying purchase.
    Accepts: order_id, profit, optional referrer_code, device_fingerprint.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')
        profit = request.data.get('profit')
        referrer_code = request.data.get('referrer_code')
        device_fp = request.data.get('device_fingerprint')

        if not order_id or profit is None:
            return Response({"error": "order_id and profit are required"}, status=400)

        # Get user's Purchase (idempotent)
        purchase, created = Purchase.objects.get_or_create(
            user=request.user,
            order_id=order_id,
            defaults={
                "profit": Decimal(str(profit)),
                "device_fingerprint": device_fp,
                "payment_reference": f"{order_id}-{request.user.id}"
            }
        )

        # Attach the user as ambassador (creates profile if missing)
        with transaction.atomic():
            referrer_profile = None
            if referrer_code:
                try:
                    referrer_profile = AmbassadorProfile.objects.get(referral_code=referrer_code)
                except AmbassadorProfile.DoesNotExist:
                    referrer_profile = None

            profile = attach_ambassador(request.user, referrer_profile, device_fp)

        return Response({
            "status": "ok",
            "message": "You are now an ambassador!",
            "referral_code": profile.referral_code,
            "level": profile.level
        }, status=201)


class TriggerDistributionAPIView(APIView):
    """
    Endpoint to be called after payment confirmation.
    Accepts: payment_reference, profit, optional referrer_code, device_fingerprint.
    It will create network.Purchase mapping to order and enqueue distribution task (recommended).
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        payment_reference = request.data.get('payment_reference')
        profit = request.data.get('profit')
        referrer_code = request.data.get('referrer_code')
        device_fp = request.data.get('device_fingerprint')
        order_id = request.data.get('order_id')

        if not payment_reference or profit is None:
            return Response({"error": "payment_reference and profit required"}, status=400)

        # create Purchase if missing (idempotent)
        purchase, created = Purchase.objects.get_or_create(payment_reference=payment_reference,
                                                           defaults={'user': request.user,
                                                                     'profit': Decimal(str(profit)),
                                                                     'device_fingerprint': device_fp,
                                                                     'order_id': order_id})
        if not created:
            # update profit if needed
            if purchase.profit != Decimal(str(profit)):
                purchase.profit = Decimal(str(profit))
                purchase.save(update_fields=['profit'])

        # Use celery task
        distribute_for_purchase_task.delay(payment_reference, referrer_code, device_fp)
        return Response({'status': 'queued'}, status=202)

class MyWalletAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        serializer = WalletSerializer(wallet)
        return Response(serializer.data)

class WalletLedgerAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-created_at')

class CreateWithdrawalAPIView(APIView):
    """
    User requests withdrawal. We check balance and create WithdrawalRequest with status pending.
    Admin approves and executes via task (execute_withdrawal_task).
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        bank_name = request.data.get('bank_name')
        account_number = request.data.get('account_number')
        account_name = request.data.get('account_name', '')

        if not amount or not bank_name or not account_number:
            return Response({"error": "amount, bank_name, account_number required"}, status=400)

        amount = Decimal(str(amount))
        wallet = Wallet.objects.select_for_update().get_or_create(user=request.user)[0]

        if amount <= 0 or amount > wallet.balance:
            return Response({"error": "invalid amount"}, status=400)

        # create withdrawal request and do NOT deduct user's wallet yet -- only upon admin approval
        w = WithdrawalRequest.objects.create(user=request.user, amount=amount, bank_name=bank_name,
                                             account_number=account_number, account_name=account_name)
        # create ledger entry for withdraw request (optional)
        Transaction.objects.create(user=request.user, tx_type='WITHDRAW_REQ', amount=amount,
                                   note=f'Withdrawal request id={w.id}')
        serializer = WithdrawalRequestSerializer(w)
        return Response(serializer.data, status=201)

class AdminApproveWithdrawalAPIView(APIView):
    """
    Admin endpoint to approve/reject withdrawal. Approve -> schedule execute_withdrawal_task.
    """
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        action = request.data.get('action')  # 'approve' or 'reject'
        note = request.data.get('note', '')
        w = get_object_or_404(WithdrawalRequest, pk=pk)
        if action == 'approve':
            # Deduct wallet balance atomically (so user cannot double-withdraw)
            with transaction.atomic():
                wallet = Wallet.objects.select_for_update().get(user=w.user)
                if wallet.balance < w.amount:
                    return Response({"error": "insufficient wallet balance"}, status=400)
                wallet.balance = wallet.balance - w.amount
                wallet.save(update_fields=['balance', 'updated_at'])
                w.status = 'approved'
                w.admin_note = note
                w.save(update_fields=['status', 'admin_note'])
                # schedule transfer task (admin must have set w.paystack_transfer_code via admin UI or we can create recipient here)
                execute_withdrawal_task.delay(w.id)
            return Response({"status": "approved"})
        elif action == 'reject':
            w.status = 'rejected'
            w.admin_note = note
            w.processed_at = timezone.now()
            w.save(update_fields=['status', 'admin_note', 'processed_at'])
            return Response({"status": "rejected"})
        else:
            return Response({"error": "invalid action"}, status=400)

class DownlineTreeAPIView(APIView):
    """
    Return a subtree of the downline tree for visualization.
    Query params:
      - root_code (optional) — referral_code to render subtree for
      - depth (optional, default 3) — how many levels deep to return
    Response is JSON with child lists; cap nodes returned to avoid huge payloads.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        root_code = request.GET.get('root_code')
        depth = int(request.GET.get('depth', 3))
        max_nodes = int(request.GET.get('max_nodes', 1000))

        if root_code:
            try:
                root = AmbassadorProfile.objects.get(referral_code=root_code)
            except AmbassadorProfile.DoesNotExist:
                return Response({"error": "root not found"}, status=404)
        else:
            # default to current user's ambassador profile
            try:
                root = request.user.ambassador
            except AmbassadorProfile.DoesNotExist:
                return Response({"error": "you are not an ambassador"}, status=404)

        # BFS to build subtree with depth limit and node cap
        from collections import deque
        q = deque()
        q.append((root, 0))
        nodes = {}
        nodes_count = 0

        while q and nodes_count < max_nodes:
            node, lvl = q.popleft()
            node_data = {
                "user_id": node.user_id,
                "referral_code": node.referral_code,
                "level": node.level,
                "children": []
            }
            nodes[node.referral_code] = node_data
            nodes_count += 1
            if lvl < depth:
                children_qs = node.children.all().order_by('created_at')[:50]  # limit child count per node to 50
                for child in children_qs:
                    node_data['children'].append(child.referral_code)
                    q.append((child, lvl + 1))

        # convert nodes dict into list and return
        return Response({"root": root.referral_code, "nodes": nodes})


# network/views.py (ADD THIS AT THE BOTTOM)

class AmbassadorDashboardAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            profile = user.ambassador
        except AmbassadorProfile.DoesNotExist:
            return Response({
                "is_ambassador": False
            }, status=200)

        wallet, _ = Wallet.objects.get_or_create(user=user)

        transactions = (
            Transaction.objects
            .filter(user=user)
            .order_by("-created_at")[:10]
        )

        # downline stats
        direct_referrals = profile.children.count()

        total_downline = AmbassadorProfile.objects.filter(
            parent__isnull=False
        ).exclude(id=profile.id).count()

        return Response({
            "is_ambassador": True,
            "profile": {
                "referral_code": profile.referral_code,
                "level": profile.level,
                "created_at": profile.created_at,
            },
            "wallet": WalletSerializer(wallet).data,
            "recent_transactions": TransactionSerializer(transactions, many=True).data,
            "stats": {
                "direct_referrals": direct_referrals,
                "total_downline": total_downline,
            },
            "referral_link": f"https://your-frontend.com/?ref={profile.referral_code}"
        })


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)