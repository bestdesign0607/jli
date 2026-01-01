# network/services.py
from decimal import Decimal
from django.db import transaction
from django.db.models import F, Sum
from django.utils import timezone
from datetime import timedelta, datetime
from django.db import IntegrityError
from .models import Purchase, AmbassadorProfile, Wallet, Transaction, CompanyAccount, EarningsLog, WithdrawalRequest
from .utils import find_strict_matrix_parent, make_unique_referral_code, is_same_device
from decimal import Decimal
from django.db.models import Sum
from collections import deque
from .models import Wallet, Transaction, AmbassadorProfile

# REGISTRATION_FEE = Decimal('5.00')
# MIN_QUALIFY_PROFIT = Decimal('10.00')
# MAX_LEVEL = 10
# DAILY_EARNINGS_CAP = Decimal('20.00')  # example cap per user per day (adjust to your rules)

REGISTRATION_FEE = Decimal("5.00")
MIN_QUALIFY_PROFIT = Decimal("10.00")
MAX_LEVEL = 10
DAILY_EARNINGS_CAP = Decimal("20.00")
COMMISSION_PER_GROUP = Decimal("5.00")
MATRIX_WIDTH = 3

# def _check_and_pay_uplines(profile):
#     """
#     Pays ₦5 whenever an upline completes a new group of 3 downlines.
#     Triggered ONLY when a new ambassador is attached.
#     """
#     current = profile.parent
#     level = 1

#     while current and level <= MAX_LEVEL:
#         downline_count = current.children.count()
#         completed_groups = downline_count // MATRIX_WIDTH

#         if completed_groups > current.completed_groups:
#             new_groups = completed_groups - current.completed_groups
#             payout = COMMISSION_PER_GROUP * new_groups

#             wallet = _ensure_wallet(current.user)
#             wallet.balance = F("balance") + payout
#             wallet.save(update_fields=["balance"])

#             Transaction.objects.create(
#                 user=current.user,
#                 tx_type="PAYOUT",
#                 amount=payout,
#                 note=f"{new_groups} completed downline group(s) at level {level}"
#             )

#             current.completed_groups = completed_groups
#             current.save(update_fields=["completed_groups"])

#         current = current.parent
#         level += 1

def _check_and_pay_uplines(profile):
    """
    Pays commissions to ALL ancestors up to MAX_LEVEL.
    Even if direct downlines < 3, every ancestor gets linked downlines for commission.
    """
    visited = set()
    queue = deque()
    queue.append((profile, 0))  # (node, distance_from_new)

    while queue:
        node, level = queue.popleft()
        if level == 0:
            # skip self for payout
            pass
        elif level <= MAX_LEVEL:
            if node.id not in visited:
                visited.add(node.id)
                downline_count = node.children.count()
                completed_groups = downline_count // MATRIX_WIDTH

                if completed_groups > node.completed_groups:
                    new_groups = completed_groups - node.completed_groups
                    payout = COMMISSION_PER_GROUP * new_groups

                    wallet = _ensure_wallet(node.user)
                    wallet.balance = F("balance") + payout
                    wallet.save(update_fields=["balance"])

                    Transaction.objects.create(
                        user=node.user,
                        tx_type="PAYOUT",
                        amount=payout,
                        note=f"{new_groups} completed downline group(s) at level {level}"
                    )

                    node.completed_groups = completed_groups
                    node.save(update_fields=["completed_groups"])

        # enqueue parent for next iteration
        if node.parent:
            queue.append((node.parent, level + 1))


def _ensure_wallet(user):
    wallet, _ = Wallet.objects.get_or_create(user=user)
    return wallet

def _ensure_company_account():
    obj, _ = CompanyAccount.objects.get_or_create(pk=1)
    return obj




def recompute_wallet_balance(user):
    total = (
        Transaction.objects
        .filter(user=user)
        .exclude(tx_type__in=["WITHDRAW_REQ"])
        .aggregate(s=Sum("amount"))["s"]
        or Decimal("0.00")
    )

    wallet, _ = Wallet.objects.get_or_create(user=user)
    wallet.balance = total
    wallet.save(update_fields=["balance", "updated_at"])
    return wallet


def count_downlines(profile):
    q = deque([profile])
    seen = set()
    count = 0

    while q:
        node = q.popleft()
        for child in node.children.all():
            if child.id not in seen:
                seen.add(child.id)
                count += 1
                q.append(child)

    return count


def build_matrix(profile, max_depth=3, width=3):
    levels = []
    current = [profile]

    for level in range(1, max_depth + 1):
        next_level = []
        children_data = []

        for p in current:
            children = p.children.all().order_by("created_at")[:width]
            for c in children:
                children_data.append({
                    "id": c.user_id,
                    "username": c.user.username,
                    "children_count": c.children.count(),
                })
                next_level.append(c)

        if not children_data:
            break

        levels.append({
            "level": level,
            "children": children_data
        })

        current = next_level

    return levels

# def attach_ambassador(user, referrer_profile=None, device_fingerprint=None):
#     """
#     Create AmbassadorProfile if missing, attach to parent (BFS), set level, return profile.
#     Call inside a transaction to avoid races.
#     """
#     profile = getattr(user, 'ambassador', None)
#     if profile:
#         return profile

#     parent = find_parent_for_new_ambassador(referrer_profile)
#     level = parent.level + 1 if parent else 0
#     if level > MAX_LEVEL:
#         level = MAX_LEVEL

#     code = make_unique_referral_code()
#     profile = AmbassadorProfile.objects.create(user=user, referral_code=code, parent=parent, level=level,
#                                                device_fingerprint=device_fingerprint)
#     return profile

# def attach_ambassador(user, referrer_profile=None, device_fingerprint=None):
#     """
#     Create AmbassadorProfile if missing, attach to parent (strict matrix), set level, return profile.
#     Call inside a transaction to avoid race conditions.
#     """
#     profile = getattr(user, 'ambassador', None)
#     if profile:
#         return profile

#     # Use strict matrix placement instead of naive BFS
#     parent = find_strict_matrix_parent(referrer_profile)
#     level = parent.level + 1 if parent else 0
#     if level > MAX_LEVEL:
#         level = MAX_LEVEL

#     code = make_unique_referral_code()
#     profile = AmbassadorProfile.objects.create(
#         user=user,
#         referral_code=code,
#         parent=parent,
#         level=level,
#         device_fingerprint=device_fingerprint
#     )
#     return profile

def attach_ambassador(user, referrer_profile=None, device_fingerprint=None):
    """
    Create AmbassadorProfile if missing, attach under strict matrix parent.
    Propagate payouts to uplines.
    """
    profile = getattr(user, 'ambassador', None)
    if profile:
        return profile

    parent = find_strict_matrix_parent(referrer_profile)
    level = parent.level + 1 if parent else 0
    if level > MAX_LEVEL:
        level = MAX_LEVEL

    code = make_unique_referral_code()
    profile = AmbassadorProfile.objects.create(
        user=user,
        referral_code=code,
        parent=parent,
        level=level,
        device_fingerprint=device_fingerprint
    )

    # Propagate commissions to all uplines
    _check_and_pay_uplines(profile)

    return profile

def create_ambassador_profile(user, parent=None, device_fingerprint=None):
    """
    Safely create AmbassadorProfile with unique code, retrying once on race/collision.
    """
    for attempt in range(2):
        code = make_unique_referral_code()
        try:
            profile = AmbassadorProfile.objects.create(
                user=user,
                referral_code=code,
                parent=parent,
                level=(parent.level + 1) if parent else 0,
                device_fingerprint=device_fingerprint
            )
            return profile
        except IntegrityError:
            # rare: code collision between selecting unique code and commit; retry
            if attempt == 1:
                raise
    # fallback (should never hit)
    return AmbassadorProfile.objects.create(
        user=user,
        referral_code=make_unique_referral_code(),
        parent=parent,
        level=(parent.level + 1) if parent else 0,
        device_fingerprint=device_fingerprint
    )

def _user_daily_earned(user, day=None):
    """
    Sum of EarningsLog.amount for user for the provided day (default today).
    """
    if day is None:
        day = timezone.now().date()
    start = datetime.combine(day, datetime.min.time()).replace(tzinfo=timezone.utc)
    end = datetime.combine(day, datetime.max.time()).replace(tzinfo=timezone.utc)
    s = EarningsLog.objects.filter(user=user, created_at__range=(start, end)).aggregate(total=Sum('amount'))['total']
    return s or Decimal('0')

# @transaction.atomic
# def distribute_for_purchase(payment_reference, referrer_code=None, device_fingerprint=None, order_obj=None):
#     """
#     Distribute network payouts for a purchase.
#     Works for qualifying and non-qualifying purchases.
#     """
#     purchase = Purchase.objects.select_for_update().get(payment_reference=payment_reference)
    
#     if purchase.distribution_processed:
#         return {'status': 'already_processed'}

#     profit = purchase.profit

#     # If not qualifying, company gets all profit
#     if not purchase.is_qualifying or profit < MIN_QUALIFY_PROFIT:
#         purchase.distribution_processed = True
#         purchase.save(update_fields=['distribution_processed'])
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=profit,
#             note='Not qualifying or profit < minimum.'
#         )
#         company = _ensure_company_account()
#         CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
#         return {'status': 'not_qualify'}

#     # Qualifying: attach ambassador, compute ancestor payouts
#     buyer = purchase.user
#     referrer_profile = None
#     if referrer_code:
#         try:
#             referrer_profile = AmbassadorProfile.objects.get(referral_code=referrer_code)
#         except AmbassadorProfile.DoesNotExist:
#             referrer_profile = None

#     buyer_profile = attach_ambassador(buyer, referrer_profile, device_fingerprint=device_fingerprint)

#     # Build ancestor chain
#     ancestors = []
#     cur = buyer_profile.parent
#     while cur and len(ancestors) < MAX_LEVEL:
#         ancestors.append(cur)
#         cur = cur.parent

#     # Skip ancestors with same device fingerprint
#     payouts = []
#     payouts_total = Decimal('0')
#     for idx, ancestor in enumerate(ancestors, start=1):
#         if device_fingerprint and ancestor.device_fingerprint == device_fingerprint:
#             continue

#         gross_amount = REGISTRATION_FEE * (2 ** (idx - 1))
#         today_earned = _user_daily_earned(ancestor.user)
#         allowed = DAILY_EARNINGS_CAP - today_earned
#         if allowed <= Decimal('0'):
#             continue
#         payout_amount = gross_amount if gross_amount <= allowed else allowed
#         payouts.append((ancestor.user, payout_amount, idx))
#         payouts_total += payout_amount

#     reg_fee_total = REGISTRATION_FEE
#     total_required = reg_fee_total + payouts_total
#     if total_required > profit:
#         # fallback: company takes all
#         company = _ensure_company_account()
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=profit,
#             note='Insufficient profit for network payouts.'
#         )
#         CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
#         purchase.distribution_processed = True
#         purchase.save(update_fields=['distribution_processed'])
#         return {'status': 'insufficient_profit'}

#     # Lock wallets
#     user_ids = set([buyer.id] + [u.id for u, _, _ in payouts])
#     wallets = Wallet.objects.select_for_update().filter(user_id__in=user_ids)
#     wallets_map = {w.user_id: w for w in wallets}
#     for uid in user_ids:
#         if uid not in wallets_map:
#             wallets_map[uid] = Wallet.objects.create(user_id=uid, balance=Decimal('0.00'))

#     # Company account
#     company = _ensure_company_account()
#     company = CompanyAccount.objects.select_for_update().get(pk=company.pk)

#     # 1️⃣ Registration fee -> company
#     Transaction.objects.create(
#         purchase=purchase,
#         user=buyer,
#         tx_type='REG',
#         amount=reg_fee_total,
#         note='Registration fee for ambassador'
#     )
#     company.balance += reg_fee_total

#     # 2️⃣ Pay ancestors
#     for ancestor_user, amount, distance in payouts:
#         wallet = wallets_map[ancestor_user.id]
#         wallet.balance += amount
#         wallet.save(update_fields=['balance', 'updated_at'])
#         Transaction.objects.create(
#             purchase=purchase,
#             user=ancestor_user,
#             tx_type='PAYOUT',
#             amount=amount,
#             note=f'Network payout distance={distance}'
#         )
#         EarningsLog.objects.create(
#             user=ancestor_user,
#             amount=amount,
#             source='PAYOUT',
#             purchase_ref=payment_reference
#         )

#     # 3️⃣ Company remainder
#     company_amount = profit - reg_fee_total - payouts_total
#     if company_amount > Decimal('0.00'):
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=company_amount,
#             note='Company retained profit after payouts'
#         )
#         company.balance += company_amount

#     company.save(update_fields=['balance', 'updated_at'])

#     # ✅ Mark distribution done
#     purchase.distribution_processed = True
#     purchase.save(update_fields=['distribution_processed'])

#     return {
#         'status': 'ok',
#         'payouts_total': str(payouts_total),
#         'company_amount': str(company_amount),
#         'payouts': [(u.id, str(a)) for u, a, _ in payouts]
#     }



# @transaction.atomic
# def distribute_for_purchase(payment_reference, referrer_code=None, device_fingerprint=None, order_obj=None):
#     """
#     Distribute network payouts for a purchase according to strict matrix placement.
#     """
#     purchase = Purchase.objects.select_for_update().get(payment_reference=payment_reference)

#     if purchase.distribution_processed:
#         return {'status': 'already_processed'}

#     profit = purchase.profit
#     ancestors = [buyer_profile] + ancestors  # prepend buyer for self-purchase bonus


#     # 1️⃣ Not qualifying → company gets all
#     if not purchase.is_qualifying or profit < MIN_QUALIFY_PROFIT:
#         purchase.distribution_processed = True
#         purchase.save(update_fields=['distribution_processed'])
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=profit,
#             note='Not qualifying or profit < minimum.'
#         )
#         company = _ensure_company_account()
#         CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
#         return {'status': 'not_qualify'}

#     # 2️⃣ Attach ambassador according to strict matrix
#     buyer = purchase.user
#     referrer_profile = None
#     if referrer_code:
#         try:
#             referrer_profile = AmbassadorProfile.objects.get(referral_code=referrer_code)
#         except AmbassadorProfile.DoesNotExist:
#             referrer_profile = None

#     buyer_profile = attach_ambassador(buyer, referrer_profile, device_fingerprint=device_fingerprint)

#     # 3️⃣ Build ancestor chain strictly by matrix (max 10 levels)
#     ancestors = []
#     current = buyer_profile
#     while current.parent and len(ancestors) < MAX_LEVEL:
#         parent = current.parent

#         # Skip if same device (fraud prevention)
#         if device_fingerprint and parent.device_fingerprint == device_fingerprint:
#             current = parent
#             continue

#         ancestors.append(parent)
#         current = parent

#     # 4️⃣ Compute payouts
#     payouts = []
#     payouts_total = Decimal('0')
#     for idx, ancestor in enumerate(ancestors, start=1):
#         gross_amount = REGISTRATION_FEE * (2 ** (idx - 1))
#         today_earned = _user_daily_earned(ancestor.user)
#         allowed = DAILY_EARNINGS_CAP - today_earned
#         if allowed <= Decimal('0'):
#             continue
#         payout_amount = gross_amount if gross_amount <= allowed else allowed
#         payouts.append((ancestor.user, payout_amount, idx))
#         payouts_total += payout_amount

#     reg_fee_total = REGISTRATION_FEE
#     total_required = reg_fee_total + payouts_total
#     if total_required > profit:
#         # fallback → company takes all
#         company = _ensure_company_account()
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=profit,
#             note='Insufficient profit for network payouts.'
#         )
#         CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
#         purchase.distribution_processed = True
#         purchase.save(update_fields=['distribution_processed'])
#         return {'status': 'insufficient_profit'}

#     # 5️⃣ Lock wallets
#     user_ids = set([buyer.id] + [u.id for u, _, _ in payouts])
#     wallets = Wallet.objects.select_for_update().filter(user_id__in=user_ids)
#     wallets_map = {w.user_id: w for w in wallets}
#     for uid in user_ids:
#         if uid not in wallets_map:
#             wallets_map[uid] = Wallet.objects.create(user_id=uid, balance=Decimal('0.00'))

#     # 6️⃣ Company account
#     company = _ensure_company_account()
#     company = CompanyAccount.objects.select_for_update().get(pk=company.pk)

#     # 7️⃣ Registration fee → company
#     Transaction.objects.create(
#         purchase=purchase,
#         user=buyer,
#         tx_type='REG',
#         amount=reg_fee_total,
#         note='Registration fee for ambassador'
#     )
#     company.balance += reg_fee_total

#     # 8️⃣ Pay ancestors
#     for ancestor_user, amount, distance in payouts:
#         wallet = wallets_map[ancestor_user.id]
#         wallet.balance += amount
#         wallet.save(update_fields=['balance', 'updated_at'])
#         Transaction.objects.create(
#             purchase=purchase,
#             user=ancestor_user,
#             tx_type='PAYOUT',
#             amount=amount,
#             note=f'Network payout distance={distance}'
#         )
#         EarningsLog.objects.create(
#             user=ancestor_user,
#             amount=amount,
#             source='PAYOUT',
#             purchase_ref=payment_reference
#         )

#     # 9️⃣ Company remainder
#     company_amount = profit - reg_fee_total - payouts_total
#     if company_amount > Decimal('0.00'):
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=company_amount,
#             note='Company retained profit after payouts'
#         )
#         company.balance += company_amount

#     company.save(update_fields=['balance', 'updated_at'])

#     # 10️⃣ Mark distribution done
#     purchase.distribution_processed = True
#     purchase.save(update_fields=['distribution_processed'])

#     return {
#         'status': 'ok',
#         'payouts_total': str(payouts_total),
#         'company_amount': str(company_amount),
#         'payouts': [(u.id, str(a)) for u, a, _ in payouts]
#     }


@transaction.atomic
def withdraw_from_wallet(user, amount: Decimal, note="Withdrawal to local bank"):
    """
    Safely withdraw from user's wallet to bank.
    Locks wallet row to prevent race conditions.
    Logs transaction and updates wallet balance.
    """
    if amount <= Decimal("0.00"):
        raise ValueError("Withdrawal amount must be positive")

    # Lock the wallet row for this user
    wallet = Wallet.objects.select_for_update().get(user=user)

    if wallet.balance < amount:
        raise ValueError("Insufficient balance")

    # Deduct balance
    wallet.balance -= amount
    wallet.save(update_fields=["balance", "updated_at"])

    # Log the withdrawal
    Transaction.objects.create(
        user=user,
        tx_type="WITHDRAW_REQ",
        amount=-amount,
        note=note,
    )

    return wallet.balance


# @transaction.atomic
# def distribute_for_purchase(payment_reference, referrer_code=None, device_fingerprint=None, order_obj=None):
#     """
#     Distribute network payouts for a purchase according to strict matrix placement.
#     Includes self-purchase bonus.
#     """
#     purchase = Purchase.objects.select_for_update().get(payment_reference=payment_reference)

#     if purchase.distribution_processed:
#         return {'status': 'already_processed'}

#     profit = purchase.profit
#     buyer = purchase.user

#     # 1️⃣ Not qualifying → company gets all
#     if not purchase.is_qualifying or profit < MIN_QUALIFY_PROFIT:
#         purchase.distribution_processed = True
#         purchase.save(update_fields=['distribution_processed'])
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=profit,
#             note='Not qualifying or profit < minimum.'
#         )
#         company = _ensure_company_account()
#         CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
#         return {'status': 'not_qualify'}

#     # 2️⃣ Attach ambassador (first purchase creates profile)
#     referrer_profile = None
#     if referrer_code:
#         try:
#             referrer_profile = AmbassadorProfile.objects.get(referral_code=referrer_code)
#         except AmbassadorProfile.DoesNotExist:
#             referrer_profile = None

#     buyer_profile = attach_ambassador(buyer, referrer_profile, device_fingerprint=device_fingerprint)

#     # 3️⃣ Build ancestor chain (max 10 levels)
#     ancestors = []
#     current = buyer_profile
#     while current.parent and len(ancestors) < MAX_LEVEL:
#         parent = current.parent
#         # Skip same device (fraud prevention)
#         if device_fingerprint and parent.device_fingerprint == device_fingerprint:
#             current = parent
#             continue
#         ancestors.append(parent)
#         current = parent

#     # 4️⃣ Include self-purchase bonus ONLY if not first qualifying purchase
#     if Purchase.objects.filter(user=buyer, is_qualifying=True).exclude(id=purchase.id).exists():
#         ancestors = [buyer_profile] + ancestors  # prepend self

#     # 5️⃣ Compute payouts
#     payouts = []
#     payouts_total = Decimal('0')
#     for idx, ancestor in enumerate(ancestors, start=1):
#         gross_amount = REGISTRATION_FEE * (2 ** (idx - 1))
#         today_earned = _user_daily_earned(ancestor.user)
#         allowed = DAILY_EARNINGS_CAP - today_earned
#         if allowed <= Decimal('0'):
#             continue
#         payout_amount = gross_amount if gross_amount <= allowed else allowed
#         payouts.append((ancestor.user, payout_amount, idx))
#         payouts_total += payout_amount

#     # 6️⃣ Registration fee
#     reg_fee_total = REGISTRATION_FEE
#     total_required = reg_fee_total + payouts_total
#     if total_required > profit:
#         company = _ensure_company_account()
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=profit,
#             note='Insufficient profit for network payouts.'
#         )
#         CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
#         purchase.distribution_processed = True
#         purchase.save(update_fields=['distribution_processed'])
#         return {'status': 'insufficient_profit'}

#     # 7️⃣ Lock wallets
#     user_ids = set([buyer.id] + [u.id for u, _, _ in payouts])
#     wallets = Wallet.objects.select_for_update().filter(user_id__in=user_ids)
#     wallets_map = {w.user_id: w for w in wallets}
#     for uid in user_ids:
#         if uid not in wallets_map:
#             wallets_map[uid] = Wallet.objects.create(user_id=uid, balance=Decimal('0.00'))

#     # 8️⃣ Pay company reg fee
#     company = _ensure_company_account()
#     company = CompanyAccount.objects.select_for_update().get(pk=company.pk)
#     Transaction.objects.create(
#         purchase=purchase,
#         user=buyer,
#         tx_type='REG',
#         amount=reg_fee_total,
#         note='Registration fee for ambassador'
#     )
#     company.balance += reg_fee_total

#     # 9️⃣ Pay payouts
#     for ancestor_user, amount, distance in payouts:
#         wallet = wallets_map[ancestor_user.id]
#         wallet.balance += amount
#         wallet.save(update_fields=['balance', 'updated_at'])
#         Transaction.objects.create(
#             purchase=purchase,
#             user=ancestor_user,
#             tx_type='PAYOUT',
#             amount=amount,
#             note=f'Network payout distance={distance}'
#         )
#         EarningsLog.objects.create(
#             user=ancestor_user,
#             amount=amount,
#             source='PAYOUT',
#             purchase_ref=payment_reference
#         )

#     # 🔟 Company remainder
#     company_amount = profit - reg_fee_total - payouts_total
#     if company_amount > Decimal('0.00'):
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=company_amount,
#             note='Company retained profit after payouts'
#         )
#         company.balance += company_amount

#     company.save(update_fields=['balance', 'updated_at'])

#     # 1️⃣1️⃣ Mark distribution done
#     purchase.distribution_processed = True
#     purchase.save(update_fields=['distribution_processed'])

#     return {
#         'status': 'ok',
#         'payouts_total': str(payouts_total),
#         'company_amount': str(company_amount),
#         'payouts': [(u.id, str(a)) for u, a, _ in payouts]
#     }












# @transaction.atomic
# def distribute_for_purchase(payment_reference, referrer_code=None, device_fingerprint=None, order_obj=None):
#     """
#     Distribute network payouts for a purchase (strict matrix + self-purchase bonus).
#     Guarantees wallets are updated atomically using F() expressions.
#     """
#     purchase = Purchase.objects.select_for_update().get(payment_reference=payment_reference)
#     if purchase.distribution_processed:
#         return {'status': 'already_processed'}

#     buyer = purchase.user
#     profit = purchase.profit

#     # 1️⃣ Not qualifying → company gets all
#     if not purchase.is_qualifying or profit < MIN_QUALIFY_PROFIT:
#         purchase.distribution_processed = True
#         purchase.save(update_fields=['distribution_processed'])
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=profit,
#             note='Not qualifying or profit < minimum.'
#         )
#         company = _ensure_company_account()
#         CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
#         return {'status': 'not_qualify'}

#     # 2️⃣ Attach ambassador (first purchase creates profile)
#     referrer_profile = None
#     if referrer_code:
#         try:
#             referrer_profile = AmbassadorProfile.objects.get(referral_code=referrer_code)
#         except AmbassadorProfile.DoesNotExist:
#             referrer_profile = None

#     buyer_profile = attach_ambassador(buyer, referrer_profile, device_fingerprint=device_fingerprint)

#     # 3️⃣ Build ancestor chain (max 10 levels)
#     ancestors = []
#     current = buyer_profile
#     while current.parent and len(ancestors) < MAX_LEVEL:
#         parent = current.parent
#         # Skip if same device (fraud prevention)
#         if device_fingerprint and parent.device_fingerprint == device_fingerprint:
#             current = parent
#             continue
#         ancestors.append(parent)
#         current = parent

#     # 4️⃣ Include self-purchase bonus if not first qualifying purchase
#     if Purchase.objects.filter(user=buyer, is_qualifying=True).exclude(id=purchase.id).exists():
#         ancestors = [buyer_profile] + ancestors  # prepend self

#     # 5️⃣ Compute payouts and cap by daily earnings
#     payouts = []
#     payouts_total = Decimal('0')
#     for idx, ancestor in enumerate(ancestors, start=1):
#         gross_amount = REGISTRATION_FEE * (2 ** (idx - 1))
#         today_earned = _user_daily_earned(ancestor.user)
#         allowed = DAILY_EARNINGS_CAP - today_earned
#         if allowed <= Decimal('0'):
#             continue
#         payout_amount = min(gross_amount, allowed)
#         payouts.append((ancestor.user, payout_amount, idx))
#         payouts_total += payout_amount

#     reg_fee_total = REGISTRATION_FEE
#     total_required = reg_fee_total + payouts_total
#     if total_required > profit:
#         # fallback → company takes all
#         company = _ensure_company_account()
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=profit,
#             note='Insufficient profit for network payouts.'
#         )
#         CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
#         purchase.distribution_processed = True
#         purchase.save(update_fields=['distribution_processed'])
#         return {'status': 'insufficient_profit'}

#     # 6️⃣ Lock wallets for buyer + ancestors
#     user_ids = set([buyer.id] + [u.id for u, _, _ in payouts])
#     wallets = Wallet.objects.select_for_update().filter(user_id__in=user_ids)
#     wallets_map = {w.user_id: w for w in wallets}
#     for uid in user_ids:
#         if uid not in wallets_map:
#             wallets_map[uid] = Wallet.objects.create(user_id=uid, balance=Decimal('0.00'))

#     # 7️⃣ Company account
#     company = _ensure_company_account()
#     company = CompanyAccount.objects.select_for_update().get(pk=company.pk)

#     # 8️⃣ Pay registration fee → company
#     Transaction.objects.create(
#         purchase=purchase,
#         user=buyer,
#         tx_type='REG',
#         amount=reg_fee_total,
#         note='Registration fee for ambassador'
#     )
#     CompanyAccount.objects.filter(pk=company.pk).update(balance=F('balance') + reg_fee_total)

#     # 9️⃣ Pay payouts using atomic F() updates
#     for ancestor_user, amount, distance in payouts:
#         wallet = wallets_map[ancestor_user.id]
#         Wallet.objects.filter(pk=wallet.pk).update(balance=F('balance') + amount)
#         wallet.refresh_from_db()
#         Transaction.objects.create(
#             purchase=purchase,
#             user=ancestor_user,
#             tx_type='PAYOUT',
#             amount=amount,
#             note=f'Network payout distance={distance}'
#         )
#         EarningsLog.objects.create(
#             user=ancestor_user,
#             amount=amount,
#             source='PAYOUT',
#             purchase_ref=payment_reference
#         )

#     # 🔟 Company remainder
#     company_amount = profit - reg_fee_total - payouts_total
#     if company_amount > Decimal('0.00'):
#         Transaction.objects.create(
#             purchase=purchase,
#             tx_type='COMPANY',
#             amount=company_amount,
#             note='Company retained profit after payouts'
#         )
#         CompanyAccount.objects.filter(pk=company.pk).update(balance=F('balance') + company_amount)

#     # 1️⃣1️⃣ Mark distribution done
#     purchase.distribution_processed = True
#     purchase.save(update_fields=['distribution_processed'])

#     return {
#         'status': 'ok',
#         'payouts_total': str(payouts_total),
#         'company_amount': str(company_amount),
#         'payouts': [(u.id, str(a)) for u, a, _ in payouts]
#     }








@transaction.atomic
def distribute_for_purchase(payment_reference, referrer_code=None, device_fingerprint=None, order_obj=None):
    """
    Distribute network payouts for a purchase (strict matrix + self-purchase bonus).
    Ensures wallets reflect all commissions properly.
    Returns `show_signup_form` for frontend display logic.
    """
    purchase = Purchase.objects.select_for_update().get(payment_reference=payment_reference)
    if purchase.distribution_processed:
        return {'status': 'already_processed'}

    buyer = purchase.user
    profit = purchase.profit

    # 1️⃣ Not qualifying → company gets all
    if not purchase.is_qualifying or profit < MIN_QUALIFY_PROFIT:
        purchase.distribution_processed = True
        purchase.save(update_fields=['distribution_processed'])
        Transaction.objects.create(
            purchase=purchase,
            tx_type='COMPANY',
            amount=profit,
            note='Not qualifying or profit < minimum.'
        )
        company = _ensure_company_account()
        CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
        return {'status': 'not_qualify', 'show_signup_form': False}

    # 2️⃣ Detect if buyer is new ambassador
    is_new_ambassador = not hasattr(buyer, 'ambassador') or buyer.ambassador is None

    # 3️⃣ Attach ambassador profile (creates if missing)
    referrer_profile = None
    if referrer_code:
        try:
            referrer_profile = AmbassadorProfile.objects.get(referral_code=referrer_code)
        except AmbassadorProfile.DoesNotExist:
            referrer_profile = None

    from .services import attach_ambassador  # ensure correct import
    buyer_profile = AmbassadorProfile.objects.filter(user=buyer).first()

    if not buyer_profile:
        purchase.ambassador_eligible = True
        purchase.save(update_fields=["ambassador_eligible"])

    # 4️⃣ Self-purchase bonus (always pays to buyer)
    buyer_profile = AmbassadorProfile.objects.filter(user=buyer).first()
    is_ambassador = buyer_profile is not None
    is_first_qualifying = not Purchase.objects.filter(
        user=buyer,
        is_qualifying=True
    ).exclude(id=purchase.id).exists()

    # Flag for frontend
    show_signup_form = not is_ambassador and is_first_qualifying

    # 5️⃣ Build ancestor chain (uplines, max 10 levels)
    ancestors = []
    current = buyer_profile
    while current.parent and len(ancestors) < MAX_LEVEL:
        parent = current.parent
        # Skip same device (fraud prevention)
        if device_fingerprint and parent.device_fingerprint == device_fingerprint:
            current = parent
            continue
        ancestors.append(parent)
        current = parent

    # 6️⃣ Compute uplines payouts (with daily cap)
    payouts = []
    payouts_total = Decimal('0')
    for idx, ancestor in enumerate(ancestors, start=1):
        gross_amount = REGISTRATION_FEE * (2 ** (idx - 1))
        today_earned = _user_daily_earned(ancestor.user)
        allowed = DAILY_EARNINGS_CAP - today_earned
        if allowed <= Decimal('0'):
            continue
        payout_amount = min(gross_amount, allowed)
        payouts.append((ancestor.user, payout_amount, idx))
        payouts_total += payout_amount

    reg_fee_total = REGISTRATION_FEE
    total_required = reg_fee_total + payouts_total
    if total_required > profit:
        # fallback → company takes all
        company = _ensure_company_account()
        Transaction.objects.create(
            purchase=purchase,
            tx_type='COMPANY',
            amount=profit,
            note='Insufficient profit for network payouts.'
        )
        CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') + profit)
        purchase.distribution_processed = True
        purchase.save(update_fields=['distribution_processed'])
        return {'status': 'insufficient_profit', 'show_signup_form': is_new_ambassador}

    # 7️⃣ Lock wallets for uplines
    user_ids = set([u.id for u, _, _ in payouts])
    wallets = Wallet.objects.select_for_update().filter(user_id__in=user_ids)
    wallets_map = {w.user_id: w for w in wallets}
    for uid in user_ids:
        if uid not in wallets_map:
            wallets_map[uid] = Wallet.objects.create(user_id=uid, balance=Decimal('0.00'))

    # 8️⃣ Company account
    company = _ensure_company_account()
    company = CompanyAccount.objects.select_for_update().get(pk=company.pk)

    # 9️⃣ Pay registration fee → company
    Transaction.objects.create(
        purchase=purchase,
        user=buyer,
        tx_type='REG',
        amount=reg_fee_total,
        note='Registration fee for ambassador'
    )
    CompanyAccount.objects.filter(pk=company.pk).update(balance=F('balance') + reg_fee_total)

    # 🔟 Pay uplines payouts
    for ancestor_user, amount, distance in payouts:
        wallet = wallets_map[ancestor_user.id]
        Wallet.objects.filter(pk=wallet.pk).update(balance=F('balance') + amount)
        wallet.refresh_from_db()
        Transaction.objects.create(
            purchase=purchase,
            user=ancestor_user,
            tx_type='PAYOUT',
            amount=amount,
            note=f'Network payout distance={distance}'
        )
        EarningsLog.objects.create(
            user=ancestor_user,
            amount=amount,
            source='PAYOUT',
            purchase_ref=payment_reference
        )

    # 1️⃣1️⃣ Company remainder
    company_amount = profit - reg_fee_total - payouts_total
    if company_amount > Decimal('0.00'):
        Transaction.objects.create(
            purchase=purchase,
            tx_type='COMPANY',
            amount=company_amount,
            note='Company retained profit after payouts'
        )
        CompanyAccount.objects.filter(pk=company.pk).update(balance=F('balance') + company_amount)

    # 1️⃣2️⃣ Mark distribution done
    purchase.distribution_processed = True
    purchase.save(update_fields=['distribution_processed'])

    # ✅ Return response with signup flag
    return {
        'status': 'ok',
        'payouts_total': str(payouts_total + self_bonus_amount),
        'company_amount': str(company_amount),
        'payouts': [(u.id, str(a)) for u, a, _ in payouts],
        'self_bonus': str(self_bonus_amount),
        'show_signup_form': is_new_ambassador
    }
