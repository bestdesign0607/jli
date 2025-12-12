from django.urls import path
from .views import (
    AmbassadorDashboardAPIView,
    AmbassadorSignupAPIView,
    MyWalletAPIView,
    WalletLedgerAPIView,
    CreateWithdrawalAPIView,
    AdminApproveWithdrawalAPIView,
    DownlineTreeAPIView,
    TriggerDistributionAPIView
)

urlpatterns = [
    path('wallet/', MyWalletAPIView.as_view(), name='my-wallet'),
    path('wallet/ledger/', WalletLedgerAPIView.as_view(), name='wallet-ledger'),
    path('withdraw/', CreateWithdrawalAPIView.as_view(), name='request-withdraw'),
    path('withdraw/<int:pk>/process/', AdminApproveWithdrawalAPIView.as_view(), name='process-withdraw'),
    path('downline/', DownlineTreeAPIView.as_view(), name='downline-tree'),
    path('admin/trigger-distrib/', TriggerDistributionAPIView.as_view(), name='trigger-distrib'),
    path('ambassador/signup/', AmbassadorSignupAPIView.as_view(), name='ambassador-signup'),
    path("ambassador/dashboard/", AmbassadorDashboardAPIView.as_view()),
]
