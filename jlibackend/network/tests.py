# network/tests.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from decimal import Decimal
from network.models import Purchase, AmbassadorProfile, Wallet, CompanyAccount, WithdrawRequest
from network.services import distribute_for_purchase, request_withdrawal, process_withdrawal_request
from network.utils import make_unique_referral_code

User = get_user_model()

class DistributionTests(TestCase):
    def setUp(self):
        self.a = User.objects.create_user(username='a', password='x', email='a@example.com')
        self.b = User.objects.create_user(username='b', password='x', email='b@example.com')
        CompanyAccount.objects.create(pk=1, balance=Decimal('0.00'))
        self.prof_a = AmbassadorProfile.objects.create(user=self.a, referral_code=make_unique_referral_code(), parent=None, level=0)

    def test_simple_payout(self):
        purchase = Purchase.objects.create(user=self.b, order_id='o1', profit=Decimal('30000.00'), payment_reference='ref1')
        res = distribute_for_purchase('ref1', referrer_code=self.prof_a.referral_code)
        self.assertEqual(res['status'], 'ok')
        wa = Wallet.objects.get(user=self.a)
        self.assertEqual(wa.balance, Decimal('5000.00'))

    def test_withdraw_flow(self):
        # seed wallet
        w = Wallet.objects.create(user=self.a, balance=Decimal('10000.00'))
        wr = request_withdrawal(self.a, Decimal('5000.00'), bank_name='TestBank', account_number='0123456789', account_name='A User')
        self.assertEqual(wr.status, 'PENDING')
        # admin approve -> placeholder will mark paid
        res = process_withdrawal_request(wr.id, approve=True)
        wr.refresh_from_db()
        self.assertEqual(wr.status, 'PAID')
