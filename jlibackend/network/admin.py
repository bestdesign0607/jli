# network/admin.py
from django.contrib import admin
from .models import AmbassadorProfile, Wallet, Transaction, CompanyAccount, WithdrawalRequest, Purchase, EarningsLog

@admin.register(AmbassadorProfile)
class AmbassadorAdmin(admin.ModelAdmin):
    list_display = ('user', 'referral_code', 'parent', 'level', 'created_at')
    search_fields = ('referral_code', 'user__email')

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'balance', 'updated_at')

@admin.register(CompanyAccount)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'balance', 'updated_at')

@admin.register(WithdrawalRequest)
class WithdrawalAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'status', 'created_at', 'processed_at')
    actions = ['approve_requests']

    def approve_requests(self, request, queryset):
        for w in queryset:
            if w.status == 'pending':
                w.status = 'approved'
                w.save()
                # optionally schedule execute_withdrawal_task
                from .tasks import execute_withdrawal_task
                execute_withdrawal_task.delay(w.id)
