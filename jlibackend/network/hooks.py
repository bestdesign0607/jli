from .tasks import distribute_for_purchase_task  # NOT from services.py

def handle_network_after_payment(order, payment_id):
    """
    This function can be called after a successful payment
    to trigger network distributions asynchronously.
    """
    referrer_code = getattr(order.user.ambassador, 'referral_code', None)
    distribute_for_purchase_task.delay(payment_reference=payment_id, referrer_code=referrer_code)
