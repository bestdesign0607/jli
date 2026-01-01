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
import requests
from decimal import Decimal
from .services import attach_ambassador
from rest_framework.permissions import IsAuthenticated
from .services import (
    recompute_wallet_balance,
    count_downlines,
    build_matrix
)
from django.conf import settings



class AmbassadorSignupAPIView(APIView):
    """
    Endpoint for a customer to become an ambassador after qualifying purchase.
    Accepts: order_id, profit, optional referrer_code, device_fingerprint.
    """
    permission_classes = [permissions.IsAuthenticated]

    # def post(self, request):
    #     order_id = request.data.get('order_id')
    #     profit = request.data.get('profit')
    #     referrer_code = request.data.get('referrer_code')
    #     device_fp = request.data.get('device_fingerprint')

    #     if not order_id or profit is None:
    #         return Response({"error": "order_id and profit are required"}, status=400)

    #     # Get user's Purchase (idempotent)
    #     purchase, created = Purchase.objects.get_or_create(
    #         user=request.user,
    #         order_id=order_id,
    #         defaults={
    #             "profit": Decimal(str(profit)),
    #             "device_fingerprint": device_fp,
    #             "payment_reference": f"{order_id}-{request.user.id}"
    #         }
    #     )

    #     # Attach the user as ambassador (creates profile if missing)
    #     with transaction.atomic():
    #         referrer_profile = None
    #         if referrer_code:
    #             try:
    #                 referrer_profile = AmbassadorProfile.objects.get(referral_code=referrer_code)
    #             except AmbassadorProfile.DoesNotExist:
    #                 referrer_profile = None

    #         profile = attach_ambassador(request.user, referrer_profile, device_fp)

    #     return Response({
    #         "status": "ok",
    #         "message": "You are now an ambassador!",
    #         "referral_code": profile.referral_code,
    #         "level": profile.level
    #     }, status=201)
    def post(self, request):
        order_id = request.data.get('order_id')
        profit = request.data.get('profit')
        referrer_code = request.data.get('referrer_code')
        device_fp = request.data.get('device_fingerprint')

        if not order_id:
            return Response(
                {"error": "order_id is required"},
                status=400
            )

        # ✅ 1. Verify qualifying & unused purchase
        purchase = Purchase.objects.filter(
            user=request.user,
            order_id=order_id,
            ambassador_eligible=True
        ).first()

        if not purchase:
            return Response(
                {"error": "No qualifying purchase available for ambassador signup"},
                status=400
            )

        # ✅ 2. Prevent double signup
        if AmbassadorProfile.objects.filter(user=request.user).exists():
            return Response(
                {"error": "User is already an ambassador"},
                status=400
            )

        # ✅ 3. Attach ambassador safely
        with transaction.atomic():
            referrer_profile = None
            if referrer_code:
                referrer_profile = AmbassadorProfile.objects.filter(
                    referral_code=referrer_code
                ).first()

            profile = attach_ambassador(
                request.user,
                referrer_profile,
                device_fp
            )

            # ✅ 4. Consume eligibility (VERY IMPORTANT)
            purchase.ambassador_eligible = False
            purchase.save(update_fields=["ambassador_eligible"])

        return Response(
            {
                "status": "ok",
                "message": "You are now an ambassador!",
                "referral_code": profile.referral_code,
                "level": profile.level,
            },
            status=201
        )


# class TriggerDistributionAPIView(APIView):
#     """
#     Endpoint to be called after payment confirmation.
#     Accepts: payment_reference, profit, optional referrer_code, device_fingerprint.
#     It will create network.Purchase mapping to order and enqueue distribution task (recommended).
#     """
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request):
#         payment_reference = request.data.get('payment_reference')
#         profit = request.data.get('profit')
#         referrer_code = request.data.get('referrer_code')
#         device_fp = request.data.get('device_fingerprint')
#         order_id = request.data.get('order_id')

#         if not payment_reference or profit is None:
#             return Response({"error": "payment_reference and profit required"}, status=400)

#         # create Purchase if missing (idempotent)
#         purchase, created = Purchase.objects.get_or_create(payment_reference=payment_reference,
#                                                            defaults={'user': request.user,
#                                                                      'profit': Decimal(str(profit)),
#                                                                      'device_fingerprint': device_fp,
#                                                                      'order_id': order_id})
#         if not created:
#             # update profit if needed
#             if purchase.profit != Decimal(str(profit)):
#                 purchase.profit = Decimal(str(profit))
#                 purchase.save(update_fields=['profit'])

#         # Use celery task
#         distribute_for_purchase_task.delay(payment_reference, referrer_code, device_fp)
#         return Response({'status': 'queued'}, status=202)

# class TriggerDistributionAPIView(APIView):
#     """
#     Called after payment confirmation.
#     - Creates Purchase (idempotent)
#     - Ensures ambassador exists (only once)
#     - Credits ambassador commission immediately
#     - Triggers downline distribution task
#     """
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request):
#         payment_reference = request.data.get('payment_reference')
#         profit = request.data.get('profit')
#         referrer_code = request.data.get('referrer_code')
#         device_fp = request.data.get('device_fingerprint')
#         order_id = request.data.get('order_id')

#         if not payment_reference or profit is None:
#             return Response(
#                 {"error": "payment_reference and profit required"},
#                 status=400
#             )

#         profit = Decimal(str(profit))

#         # 1️⃣ Create Purchase (idempotent)
#         purchase, created = Purchase.objects.get_or_create(
#             payment_reference=payment_reference,
#             defaults={
#                 'user': request.user,
#                 'profit': profit,
#                 'device_fingerprint': device_fp,
#                 'order_id': order_id,
#                 'is_qualifying': profit >= MIN_QUALIFY_PROFIT
#             }
#         )

# # Ensure updates if already exists
#         updated = False

#         if purchase.profit != profit:
#             purchase.profit = profit
#             updated = True

#         if profit >= MIN_QUALIFY_PROFIT and not purchase.is_qualifying:
#             purchase.is_qualifying = True
#             updated = True

#         if updated:
#             purchase.save(update_fields=['profit', 'is_qualifying'])

#         # # 2️⃣ Ensure ambassador exists (DO NOT resign up)
#         # try:
#         #     profile = request.user.ambassador
#         # except AmbassadorProfile.DoesNotExist:
#         #     referrer_profile = None
#         #     if referrer_code:
#         #         try:
#         #             referrer_profile = AmbassadorProfile.objects.get(
#         #                 referral_code=referrer_code
#         #             )
#         #         except AmbassadorProfile.DoesNotExist:
#         #             referrer_profile = None

#         #     profile = attach_ambassador(
#         #         request.user,
#         #         referrer_profile,
#         #         device_fp
#         #     )

#         # # 3️⃣ Credit ambassador commission immediately
#         # wallet, _ = Wallet.objects.get_or_create(user=request.user)

#         # wallet.balance += profit
#         # wallet.save(update_fields=['balance'])

#         # Transaction.objects.create(
#         #     user=request.user,
#         #     tx_type='COMMISSION',
#         #     amount=profit,
#         #     note=f'Commission from order {order_id}'
#         # )
#         # 2️⃣ Check ambassador status (DO NOT auto-create)
#         is_ambassador = AmbassadorProfile.objects.filter(
#             user=request.user
#         ).exists()

#         # 3️⃣ Handle commission or eligibility
#         if is_ambassador:
#             wallet, _ = Wallet.objects.get_or_create(user=request.user)
#             wallet.balance += profit
#             wallet.save(update_fields=['balance'])

#             Transaction.objects.create(
#                 user=request.user,
#                 tx_type='COMMISSION',
#                 amount=profit,
#                 note=f'Commission from order {order_id}'
#             )
#         else:
#             # mark purchase as eligible only
#             purchase.ambassador_eligible = True
#             purchase.save(update_fields=['ambassador_eligible'])


#         # 4️⃣ Trigger referral distribution (unchanged)
#         distribute_for_purchase_task.delay(
#             payment_reference,
#             referrer_code,
#             device_fp
#         )

#         return Response({
#             "status": "success",
#             "is_ambassador": is_ambassador,
#             "ambassador_eligible": not is_ambassador,
#             "commission": float(profit) if is_ambassador else 0,
#         }, status=200)

class TriggerDistributionAPIView(APIView):
    """
    Called after payment confirmation.
    - Creates Purchase (idempotent)
    - Checks ambassador status
    - Credits commission immediately
    - Triggers referral distribution task
    """
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        payment_reference = request.data.get('payment_reference')
        order_id = request.data.get('order_id')
        referrer_code = request.data.get('referrer_code')
        device_fp = request.data.get('device_fingerprint')

        if not payment_reference or not order_id:
            return Response({"error": "payment_reference and order_id required"}, status=400)

        # 1️⃣ Create or update purchase (idempotent)
        profit = Decimal(str(request.data.get('profit', '0.00')))
        purchase, created = Purchase.objects.get_or_create(
            payment_reference=payment_reference,
            defaults={
                'user': request.user,
                'order_id': order_id,
                'profit': profit,
                'device_fingerprint': device_fp,
                'is_qualifying': profit >= MIN_QUALIFY_PROFIT
            }
        )

        updated = False
        if purchase.profit != profit:
            purchase.profit = profit
            updated = True
        if profit >= MIN_QUALIFY_PROFIT and not purchase.is_qualifying:
            purchase.is_qualifying = True
            updated = True
        if updated:
            purchase.save(update_fields=['profit', 'is_qualifying'])

        # 2️⃣ Check if user is an existing ambassador
        is_ambassador = AmbassadorProfile.objects.filter(user=request.user).exists()

        # 3️⃣ Handle commission / eligibility
        if is_ambassador and profit >= MIN_QUALIFY_PROFIT:
            wallet = _ensure_wallet(request.user)
            wallet.balance += profit
            wallet.save(update_fields=['balance'])

            Transaction.objects.create(
                user=request.user,
                tx_type='COMMISSION',
                amount=profit,
                note=f'Commission from order {order_id}'
            )
            ambassador_eligible = False
        else:
            # mark purchase as eligible for ambassador signup
            purchase.ambassador_eligible = True
            purchase.save(update_fields=['ambassador_eligible'])
            ambassador_eligible = True

        # 4️⃣ Trigger network distribution asynchronously (via services)
        distribute_for_purchase(
            payment_reference=payment_reference,
            referrer_code=referrer_code,
            device_fingerprint=device_fp
        )

        # 5️⃣ Response
        return Response({
            "status": "success",
            "profit": float(profit),
            "is_ambassador": is_ambassador,
            "ambassador_eligible": ambassador_eligible,
            "commission": float(profit) if is_ambassador else 0,
        }, status=200)

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

# class CreateWithdrawalAPIView(APIView):
#     """
#     User requests withdrawal. We check balance and create WithdrawalRequest with status pending.
#     Admin approves and executes via task (execute_withdrawal_task).
#     """
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request):
#         amount = request.data.get('amount')
#         bank_name = request.data.get('bank_name')
#         account_number = request.data.get('account_number')
#         account_name = request.data.get('account_name', '')

#         if not amount or not bank_name or not account_number:
#             return Response({"error": "amount, bank_name, account_number required"}, status=400)

#         amount = Decimal(str(amount))
#         wallet = Wallet.objects.select_for_update().get_or_create(user=request.user)[0]

#         if amount <= 0 or amount > wallet.balance:
#             return Response({"error": "invalid amount"}, status=400)

#         # create withdrawal request and do NOT deduct user's wallet yet -- only upon admin approval
#         w = WithdrawalRequest.objects.create(user=request.user, amount=amount, bank_name=bank_name,
#                                              account_number=account_number, account_name=account_name)
#         # create ledger entry for withdraw request (optional)
#         Transaction.objects.create(user=request.user, tx_type='WITHDRAW_REQ', amount=amount,
#                                    note=f'Withdrawal request id={w.id}')
#         serializer = WithdrawalRequestSerializer(w)
#         return Response(serializer.data, status=201)

PAYSTACK_SECRET_KEY = settings.PAYSTACK_SECRET_KEY  # safer than hardcoding

class CreateWithdrawalAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        bank_name = str(request.data.get('bank_name', '')).strip()
        account_number = str(request.data.get('account_number', '')).strip()
        account_name = str(request.data.get('account_name', '')).strip()

        # Basic required fields
        if not amount or not bank_name or not account_number or not account_name:
            return Response({"error": "amount, bank_name, account_number, account_name required"}, status=400)

        # Convert amount to Decimal
        try:
            amount = Decimal(str(amount))
        except:
            return Response({"error": "invalid amount"}, status=400)

        if amount <= 0:
            return Response({"error": "amount must be greater than zero"}, status=400)

        if len(account_number) != 10 or not account_number.isdigit():
            return Response({"error": "account_number must be 10 digits"}, status=400)

        bank_code = self.get_bank_code(bank_name)
        if not bank_code:
            return Response({"error": f"Bank '{bank_name}' not supported"}, status=400)

        with transaction.atomic():
            wallet = Wallet.objects.select_for_update().get(user=request.user)
            if amount > wallet.balance:
                return Response({"error": "insufficient wallet balance"}, status=400)

            wallet.balance -= amount
            wallet.save(update_fields=['balance'])

            w = WithdrawalRequest.objects.create(
                user=request.user,
                amount=amount,
                bank_name=bank_name,
                account_number=account_number,
                account_name=account_name,
                status='pending'
            )

            Transaction.objects.create(
                user=request.user,
                tx_type='WITHDRAW',
                amount=amount,
                note=f'Withdrawal request id={w.id}'
            )

        # Paystack transfer code (as before)
        headers = {
            "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        recipient_payload = {
            "type": "nuban",
            "name": account_name,
            "account_number": account_number,
            "bank_code": bank_code,
            "currency": "NGN"
        }

        try:
            recipient_res = requests.post(
                "https://api.paystack.co/transferrecipient",
                json=recipient_payload,
                headers=headers
            )
            recipient_data = recipient_res.json()
            if not recipient_data.get("status"):
                wallet.balance += amount
                wallet.save(update_fields=['balance'])
                w.status = "failed"
                w.save(update_fields=['status'])
                return Response({"error": "Failed to create recipient", "details": recipient_data}, status=400)

            recipient_code = recipient_data["data"]["recipient_code"]
            transfer_payload = {
                "source": "balance",
                "amount": int(amount * 100),
                "recipient": recipient_code,
                "reason": f"Wallet withdrawal for user {request.user.id}"
            }

            transfer_res = requests.post(
                "https://api.paystack.co/transfer",
                json=transfer_payload,
                headers=headers
            )
            transfer_data = transfer_res.json()

            if transfer_res.status_code == 200 and transfer_data.get("status"):
                w.status = "completed"
                w.save(update_fields=['status'])
                return Response({"status": "success", "message": "Withdrawal successful"})
            else:
                wallet.balance += amount
                wallet.save(update_fields=['balance'])
                w.status = "failed"
                w.save(update_fields=['status'])
                return Response({"error": "Withdrawal failed", "details": transfer_data}, status=400)

        except Exception as e:
            wallet.balance += amount
            wallet.save(update_fields=['balance'])
            w.status = "failed"
            w.save(update_fields=['status'])
            return Response({"error": str(e)}, status=500)

    def get_bank_code(self, bank_name):
        bank_codes = {
            "GTBank": "058",
            "Access Bank": "044",
            "Zenith Bank": "057",
            "UBA": "033",
            "First Bank": "011",
            "Fidelity Bank": "070",
            "Union Bank": "032",
            "Ecobank": "050",
            "Sterling Bank": "232",
            "Polaris Bank": "076",
            "Wema Bank": "035",
            "Keystone Bank": "082",
            "Unity Bank": "215",
            "Globus Bank": "223",
        }
        return bank_codes.get(bank_name.strip())



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

# class AmbassadorDashboardAPIView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         user = request.user

#         try:
#             profile = user.ambassador
#         except AmbassadorProfile.DoesNotExist:
#             return Response({
#                 "is_ambassador": False
#             }, status=200)

#         wallet, _ = Wallet.objects.get_or_create(user=user)

#         transactions = (
#             Transaction.objects
#             .filter(user=user)
#             .order_by("-created_at")[:10]
#         )

#         # downline stats
#         direct_referrals = profile.children.count()

#         total_downline = AmbassadorProfile.objects.filter(
#             parent__isnull=False
#         ).exclude(id=profile.id).count()

#         return Response({
#             "is_ambassador": True,
#             "profile": {
#                 "referral_code": profile.referral_code,
#                 "level": profile.level,
#                 "created_at": profile.created_at,
#             },
#             "wallet": WalletSerializer(wallet).data,
#             "recent_transactions": TransactionSerializer(transactions, many=True).data,
#             "stats": {
#                 "direct_referrals": direct_referrals,
#                 "total_downline": total_downline,
#             },
#             "referral_link": f"https://your-frontend.com/?ref={profile.referral_code}"
#         })

class AmbassadorDashboardAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            profile = user.ambassador
        except AmbassadorProfile.DoesNotExist:
            return Response({"is_ambassador": False})

        wallet, _ = Wallet.objects.get_or_create(user=user)

        transactions = (
            Transaction.objects
            .filter(user=user)
            .order_by("-created_at")[:10]
        )

        direct_referrals = profile.children.count()
        total_downline = count_downlines(profile)
        matrix = build_matrix(profile)

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
                "matrix": matrix,
            },
            "referral_link": f"https://your-frontend.com/?ref={profile.referral_code}"
        })

class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)