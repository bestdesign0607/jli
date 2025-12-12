# network/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import AmbassadorProfile, Wallet, Transaction, WithdrawalRequest
User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    is_ambassador = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id", "username", "email", "first_name", "last_name",
            "is_ambassador"
        ]

    def get_is_ambassador(self, obj):
        return hasattr(obj, 'ambassador')  # True if user has an ambassador profile
    
class AmbassadorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmbassadorProfile
        fields = ['referral_code', 'parent', 'level', 'created_at']

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['balance', 'updated_at']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['tx_type', 'amount', 'note', 'created_at']

class WithdrawalRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = WithdrawalRequest
        read_only_fields = ['status', 'created_at', 'processed_at', 'paystack_transfer_code']
        fields = ['id', 'amount', 'bank_name', 'account_number', 'account_name', 'status', 'admin_note', 'created_at', 'processed_at', 'paystack_transfer_code']
