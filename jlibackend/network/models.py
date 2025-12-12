# network/models.py
from django.conf import settings
from django.db import models
from django.utils import timezone
from decimal import Decimal

User = settings.AUTH_USER_MODEL

class CompanyAccount(models.Model):
    """
    Singleton row for company balance tracking. Keep single row with pk=1.
    """
    id = models.PositiveSmallIntegerField(primary_key=True, default=1)
    balance = models.DecimalField(max_digits=18, decimal_places=2, default=Decimal('0.00'))
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"CompanyAccount(balance={self.balance})"

class AmbassadorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='ambassador')
    referral_code = models.CharField(max_length=32, unique=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='children')
    level = models.PositiveSmallIntegerField(default=0)  # 0..10
    created_at = models.DateTimeField(auto_now_add=True)
    device_fingerprint = models.CharField(max_length=255, null=True, blank=True)  # for fraud checks

    class Meta:
        indexes = [
            models.Index(fields=['parent']),
            models.Index(fields=['referral_code']),
        ]

    def __str__(self):
        return f"Ambassador({self.user_id}) code={self.referral_code} lvl={self.level}"

    def children_count(self):
        return self.children.count()

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=18, decimal_places=2, default=Decimal('0.00'))
    updated_at = models.DateTimeField(auto_now=True)

    # daily earned cap bookkeeping: optional cache-free approach uses EarningsLog below
    def __str__(self):
        return f"Wallet(user={self.user_id} balance={self.balance})"

class EarningsLog(models.Model):
    """
    Each payout (payout to user) is logged here. Use it to compute daily earned totals.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='earnings_logs')
    amount = models.DecimalField(max_digits=18, decimal_places=2)
    source = models.CharField(max_length=32)  # e.g., 'PAYOUT', 'REG_REFUND', 'WITHDRAW'
    created_at = models.DateTimeField(auto_now_add=True)
    purchase_ref = models.CharField(max_length=128, null=True, blank=True)  # link to Purchase.payment_reference

# class Purchase(models.Model):
#     """
#     Map qualifying purchases to distribution logic. You already have an Order model;
#     store its id or reference here for idempotency linking.
#     """
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='network_purchases')
#     order = models.ForeignKey('store.Order', null=True, blank=True, on_delete=models.SET_NULL)  # change 'store' to your app label if needed
#     profit = models.DecimalField(max_digits=12, decimal_places=2)  # company profit from purchase
#     created_at = models.DateTimeField(auto_now_add=True)
#     payment_reference = models.CharField(max_length=128, unique=True)  # ensures idempotency
#     distribution_processed = models.BooleanField(default=False)
#     device_fingerprint = models.CharField(max_length=255, null=True, blank=True)

#     def __str__(self):
#         return f"Purchase(ref={self.payment_reference} user={self.user_id} profit={self.profit})"

class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='network_purchases')
    order = models.ForeignKey('store.Order', null=True, blank=True, on_delete=models.SET_NULL)
    profit = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    payment_reference = models.CharField(max_length=128, unique=True)
    distribution_processed = models.BooleanField(default=False)
    device_fingerprint = models.CharField(max_length=255, null=True, blank=True)
    is_qualifying = models.BooleanField(default=False)  # ✅ NEW FIELD

    def __str__(self):
        return f"Purchase(ref={self.payment_reference} user={self.user_id} profit={self.profit})"

class Transaction(models.Model):
    """
    Ledger.
    """
    TYPES = [
        ('REG', 'registration_fee'),
        ('PAYOUT', 'payout_to_user'),
        ('COMPANY', 'company_credit'),
        ('WITHDRAW_REQ', 'withdraw_request'),
        ('WITHDRAW_PAY', 'withdraw_paid'),
        ('REFUND', 'refund'),
    ]
    purchase = models.ForeignKey(Purchase, null=True, blank=True, on_delete=models.SET_NULL, related_name='transactions')
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='transactions')
    tx_type = models.CharField(max_length=20, choices=TYPES)
    amount = models.DecimalField(max_digits=18, decimal_places=2)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=['user']), models.Index(fields=['tx_type']), models.Index(fields=['created_at'])]

    def __str__(self):
        return f"TX({self.tx_type} {self.amount} user={self.user_id})"

class WithdrawalRequest(models.Model):
    """
    Withdrawal to bank (Nigerian banks via Paystack transfer). Admin must approve.
    """
    STATUS = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='withdrawal_requests')
    amount = models.DecimalField(max_digits=18, decimal_places=2)
    bank_name = models.CharField(max_length=255)
    account_number = models.CharField(max_length=32)
    account_name = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=16, choices=STATUS, default='pending')
    admin_note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    paystack_transfer_code = models.CharField(max_length=128, null=True, blank=True)  # upstream reference

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Withdrawal(user={self.user_id} amount={self.amount} status={self.status})"
