# from django.urls import path
# from .views import (
#     ProductListAPIView,
#     ProductDetailAPIView,
#     CreateOrderAPIView,
#     ConfirmPaymentAPIView,
#     ProductCreateAPIView,
#     ProductImageUploadAPIView,
#     verify_otp,
#     send_otp,
# )
# from . import views  # <-- FIXED

# urlpatterns = [
#     # Products
#     path('products/', ProductListAPIView.as_view(), name='api-products'),
#     path('products/create/', ProductCreateAPIView.as_view(), name='api-product-create'),
#     path('products/upload-image/', ProductImageUploadAPIView.as_view(), name='api-product-upload-image'),
#     path('products/<slug:slug>/', ProductDetailAPIView.as_view(), name='api-product-detail'),
#     path('products/<int:id>/', ProductDetailAPIView.as_view(), name='api-product-detail-id'),


#     # OTP
#     path('email/send-otp/', send_otp, name='send-otp'),
#     path('email/verify/', verify_otp, name='verify-otp'),

#     # Orders (Dashboard)
#     path("orders/all/", views.get_all_orders, name="get_all_orders"),
#     path("orders/deliver/<int:order_id>/", views.mark_order_delivered),

#     # Orders + Payment (Customer)
#     path('orders/', CreateOrderAPIView.as_view(), name='api-create-order'),
#     path('payments/confirm/', ConfirmPaymentAPIView.as_view(), name='api-confirm-payment'),
# 









from django.urls import path
from .views import ConfirmDigitalOrderAPIView, CreateDigitalOrderAPIView, DigitalOrderListAPIView, ProductReviewListCreateView, SignupAPIView, LoginAPIView, UploadPaymentProofAPIView, UploadVariantImageAPIView, UserOrderListView, UserOrdersAPIView, UserProfileAPIView, UserReviewListView, update_order_status
from .views import (
    GoogleAuthAPIView,
    ProductListAPIView,
    ProductDetailAPIView,
    ProductDetailBySlugAPIView,
    CreateOrderAPIView,
    ConfirmPaymentAPIView,
    ProductCreateAPIView,
    ProductImageUploadAPIView,
    BestSellingProductsAPIView,
    TopRatedProductsAPIView,
    NewProductsAPIView,
    SearchProductsAPIView,
    ProductDemoVideoUploadAPIView,
    OrderDetailAPIView,
    CategoryListAPIView,  # Optional, if you add categories
    verify_otp,
    send_otp,
)

from . import views



urlpatterns = [
    # Products
    path('products/', ProductListAPIView.as_view(), name='api-products'),
    path('products/create/', ProductCreateAPIView.as_view(), name='api-product-create'),
    path('products/upload-image/', ProductImageUploadAPIView.as_view(), name='api-product-upload-image'),
    path('products/upload-variant-image/', UploadVariantImageAPIView.as_view(), name='api-upload-variant-image'),
    

    # 🔥 Filtering & Special Listing (NEW)
    path('products/best-selling/', BestSellingProductsAPIView.as_view(), name='api-best-selling'),
    path('products/top-rated/', TopRatedProductsAPIView.as_view(), name='api-top-rated'),
    path('products/new/', NewProductsAPIView.as_view(), name='api-new-products'),
    path('products/search/', SearchProductsAPIView.as_view(), name='api-search-products'),
    path('categories/', CategoryListAPIView.as_view(), name='api-categories'),  # optional

    path("auth/google/", GoogleAuthAPIView.as_view(), name="google-auth"),
    path("auth/signup/", SignupAPIView.as_view(), name="signup"),
    path("auth/login/", LoginAPIView.as_view(), name="login"),
    # Detail views
    path('products/<int:id>/', ProductDetailAPIView.as_view(), name='api-product-detail-id'),
    path("products/upload-demo-video/", ProductDemoVideoUploadAPIView.as_view(), name="upload-demo-video"),
    # path('products/<int:id>/reviews/', views.product_reviews, name='product-reviews'),
    path('products/<slug:slug>/', ProductDetailBySlugAPIView.as_view(), name='api-product-detail-slug'),

    path("products/<int:id>/reviews/", ProductReviewListCreateView.as_view()),
    path("user/reviews/", UserReviewListView.as_view()),

    path("orders/my-orders/", UserOrdersAPIView.as_view(), name="user-orders"),
    path("orders/update-status/<str:order_type>/<int:order_id>/", update_order_status, name="update_order_status"),

    # OTP
    path('email/send-otp/', send_otp, name='send-otp'),
    path('email/verify/', verify_otp, name='verify-otp'),

    # Orders (Dashboard)
    path("orders/all/", views.get_all_orders, name="get_all_orders"),
    path("orders/deliver/<int:order_id>/", views.mark_order_delivered),

    # Orders + Payment (Customer)
    path('orders/', CreateOrderAPIView.as_view(), name='api-create-order'),
    path('payments/confirm/', ConfirmPaymentAPIView.as_view(), name='api-confirm-payment'),
    path("auth/profile/", UserProfileAPIView.as_view(), name="user-profile"),
    path("orders/<int:pk>/", OrderDetailAPIView.as_view()),
    path("orders/user/", UserOrderListView.as_view()),
    path("digital-orders/create/", CreateDigitalOrderAPIView.as_view()),
    path("admin/digital-orders/<int:order_id>/confirm/", ConfirmDigitalOrderAPIView.as_view()),
    path("digital-orders/<int:order_id>/upload-proof/", UploadPaymentProofAPIView.as_view(), name="upload-payment-proof"),
    path("admin/digital-orders/", DigitalOrderListAPIView.as_view(), name="admin-digital-orders"),
]
    





# urlpatterns = [
#     # Products
#     path('products/', ProductListAPIView.as_view(), name='api-products'),
#     path('products/create/', ProductCreateAPIView.as_view(), name='api-product-create'),
#     path('products/upload-image/', ProductImageUploadAPIView.as_view(), name='api-product-upload-image'),

#     # Detail views
#     path('products/<int:id>/', ProductDetailAPIView.as_view(), name='api-product-detail-id'),
#     path('products/<slug:slug>/', ProductDetailBySlugAPIView.as_view(), name='api-product-detail-slug'),

#     # OTP
#     path('email/send-otp/', send_otp, name='send-otp'),
#     path('email/verify/', verify_otp, name='verify-otp'),

#     # Orders (Dashboard)
#     path("orders/all/", views.get_all_orders, name="get_all_orders"),
#     path("orders/deliver/<int:order_id>/", views.mark_order_delivered),

#     # Orders + Payment (Customer)
#     path('orders/', CreateOrderAPIView.as_view(), name='api-create-order'),
#     path('payments/confirm/', ConfirmPaymentAPIView.as_view(), name='api-confirm-payment'),
# ]
