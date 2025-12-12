from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Order, Payment, Shipment, UserProfile
from django.core.mail import send_mail
from django.contrib.auth import get_user_model



User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=Payment)
def payment_confirmed(sender, instance, created, **kwargs):
    # Send email only if payment is confirmed and this is the first confirmation
    if instance.confirmed and (created or not kwargs.get('update_fields')):
        order = instance.order
        send_mail(
            subject='Payment confirmed',
            message=f'Hi, your payment for order #{order.id} has been confirmed. We\'ll prepare shipment.',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[order.email],
            fail_silently=False
        )

@receiver(post_save, sender=Shipment)
def shipment_updated(sender, instance, created, **kwargs):
    order = instance.order
    if instance.shipped_at and not instance.delivered_at:
        send_mail(
            subject='Your order has shipped',
            message=f'Order #{order.id} is on its way. Tracking: {instance.tracking_code}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[order.email],
            fail_silently=False
        )
    if instance.delivered_at:
        send_mail(
            subject='Order delivered',
            message=f'Order #{order.id} has been delivered. Enjoy!',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[order.email],
            fail_silently=False
        )
