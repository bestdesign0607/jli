# network/tasks.py
from celery import shared_task
from .services import distribute_for_purchase
from .services import _ensure_company_account
from django.conf import settings
from django.db.models import F
import requests
from .models import WithdrawalRequest, Transaction, CompanyAccount
from django.db import transaction

@shared_task(bind=True, max_retries=3, default_retry_delay=10)
def distribute_for_purchase_task(self, payment_reference, referrer_code=None, device_fingerprint=None):
    try:
        return distribute_for_purchase(payment_reference, referrer_code=referrer_code, device_fingerprint=device_fingerprint)
    except Exception as exc:
        raise self.retry(exc=exc)

# helper to call Paystack (transfer)
def paystack_transfer_request(payload):
    """
    payload = {
      'source': 'balance', 'amount': amount_in_kobo, 'recipient': recipient_code, 'reason': '...'
    }
    Precondition: you already resolved recipient using Paystack Beneficiary creation API or use "transfer to bank" flow.
    """
    secret = getattr(settings, 'PAYSTACK_SECRET_KEY', None)
    if not secret:
        raise RuntimeError("PAYSTACK_SECRET_KEY not configured")
    url = "https://api.paystack.co/transfer"
    headers = {"Authorization": f"Bearer {secret}"}
    resp = requests.post(url, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()
    return resp.json()

@shared_task(bind=True, max_retries=3, default_retry_delay=20)
def execute_withdrawal_task(self, withdrawal_id):
    from .models import WithdrawalRequest, Transaction
    try:
        w = WithdrawalRequest.objects.select_for_update().get(pk=withdrawal_id)
    except WithdrawalRequest.DoesNotExist:
        return {'status': 'missing'}

    if w.status != 'approved':
        return {'status': 'not_approved'}

    # convert naira to kobo
    amount_kobo = int(float(w.amount) * 100)

    # For Paystack you usually need to create recipient and then initiate transfer.
    # Here we assume the admin previously resolved recipient code and stored paystack_transfer_code on object.
    try:
        payload = {
            "source": "balance",
            "amount": amount_kobo,
            "recipient": w.paystack_transfer_code,
            "reason": f"Withdrawal for user {w.user_id} - request {w.id}"
        }
        result = paystack_transfer_request(payload)
    except Exception as e:
        # transfer failed
        w.status = 'failed'
        w.admin_note = f"transfer_failed: {str(e)}"
        w.processed_at = timezone.now()
        w.save(update_fields=['status', 'admin_note', 'processed_at'])
        return {'status': 'failed', 'error': str(e)}

    # success branch (Paystack returns data -> transfer_code or reference)
    transfer_ref = result.get('data', {}).get('reference') or result.get('data', {}).get('transfer_code')
    w.status = 'paid'
    w.paystack_transfer_code = transfer_ref
    w.processed_at = timezone.now()
    w.save(update_fields=['status', 'paystack_transfer_code', 'processed_at'])

    # ledger entry
    Transaction.objects.create(user=w.user, tx_type='WITHDRAW_PAY', amount=w.amount,
                               note=f'Paid via Paystack transfer {transfer_ref}')
    # Deduct company balance or ensure funds are available elsewhere
    company = _ensure_company_account()
    CompanyAccount.objects.select_for_update().filter(pk=company.pk).update(balance=F('balance') - w.amount)

    return {'status': 'ok', 'transfer_ref': transfer_ref}
