import random
from rest_framework import generics, status, views
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.core.mail import send_mail
from django.db.models import F
from decimal import Decimal
from django.db import transaction
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes  
from .models import Product, Order, Payment, ProductImage
from .serializers import ProductSerializer, OrderSerializer, EmailOTPSerializer, ReviewSerializer
import json
from django.utils import timezone
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import EmailOTP
from datetime import timedelta
from .models import OrderItem
from rest_framework import generics
from django.db.models import Q
from .models import Category
from .serializers import CategorySerializer
from rest_framework.permissions import IsAuthenticated
from .serializers import OrderListSerializer
import json
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product, ProductImage, ProductVariant
from .serializers import ProductSerializer
from .serializers import UserProfileSerializer
from network.hooks import handle_network_after_payment

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer, LoginSerializer
from django.contrib.auth import get_user_model

# CREATE product
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product, ProductImage, ProductVariant
from .serializers import ProductSerializer, ProductVariantSerializer
from network.models import Purchase as NetworkPurchase
from network.tasks import distribute_for_purchase_task

User = get_user_model()


# ===== SIGNUP VIEW =====
class SignupAPIView(generics.GenericAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Signup successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)


# ===== LOGIN VIEW =====
class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)



class GoogleAuthAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get("token")

        if not token:
            return Response({"error": "Token required"}, status=400)

        try:
            CLIENT_ID = "561851111900-b276m3iru93rn44v02qmos6alqauh8o1.apps.googleusercontent.com"  # <-- PUT REAL ID

            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                CLIENT_ID
            )

            email = idinfo.get("email")
            name = idinfo.get("name")
            picture = idinfo.get("picture")

        except Exception as e:
            print("Google token error:", e)
            return Response({"error": "Invalid Google token"}, status=400)

        # Create or get user
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "username": email.split("@")[0],
                "first_name": name
            }
        )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Google login successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "email": user.email,
                "name": name,
                "picture": picture
            }
        })

class UploadVariantImageAPIView(views.APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        product_id = request.data.get("product")
        color = request.data.get("color", None)
        image = request.FILES.get("image")

        if not product_id or not image:
            return Response({"error": "product and image are required"}, status=400)

        ProductImage.objects.create(
            product_id=product_id,
            image=image,
            color=color,
        )

        return Response({"message": "image uploaded"}, status=201)


class UserOrdersAPIView(generics.ListAPIView):
    serializer_class = OrderListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(email=self.request.user.email).order_by("-created_at")

# ========== PRODUCTS ==========

# class ProductListAPIView(generics.ListAPIView):
#     serializer_class = ProductSerializer

#     def get_queryset(self):
#         qs = Product.objects.prefetch_related('images').all()
#         category = self.request.GET.get('category')
#         exclude = self.request.GET.get('exclude')
#         if category:
#             qs = qs.filter(category__id=category)
#         if exclude:
#             qs = qs.exclude(id=exclude)
#         return qs
class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.prefetch_related('images').all()
        category = self.request.GET.get('category')
        exclude = self.request.GET.get('exclude')
        search = self.request.GET.get('search')  # <-- handle search

        if category:
            qs = qs.filter(category__id=category)
        if exclude:
            qs = qs.exclude(id=exclude)
        if search:
            qs = qs.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )
        return qs

class RelatedProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('id')
        product = get_object_or_404(Product, id=product_id)
        return Product.objects.filter(category=product.category).exclude(id=product.id)[:8]


class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.prefetch_related('images').all()
    serializer_class = ProductSerializer
    lookup_field = 'id'  # ✅ must be a string, not a tuple

    def get_object(self):
        print("kwargs:", self.kwargs)
        return super().get_object()

class ProductDetailBySlugAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.prefetch_related('images').all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'  # for slug-based lookup


# class ProductCreateAPIView(generics.CreateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, *args, **kwargs):
#         # --- 1️⃣ Main product fields ---
#         product_data = {
#             "title": request.data.get("title"),
#             "slug": request.data.get("slug"),
#             "description": request.data.get("description"),
#             "price": request.data.get("price"),
#             "old_price": request.data.get("old_price"),
#             "flash_sale_price": request.data.get("flash_sale_price"),
#             "is_new": request.data.get("is_new") in ["true", True, "True"],
#             "is_flash_sale": request.data.get("is_flash_sale") in ["true", True, "True"],
#             "is_featured": request.data.get("is_featured") in ["true", True, "True"],
#             "badge_text": request.data.get("badge_text"),
#             "category": request.data.get("category"),
#         }

#         # Optional fields: colors & tags
#         try:
#             product_data["colors"] = json.loads(request.data.get("colors", "[]"))
#         except:
#             return Response({"error": "Invalid colors JSON"}, status=400)

#         try:
#             product_data["tags"] = json.loads(request.data.get("tags", "[]"))
#         except:
#             return Response({"error": "Invalid tags JSON"}, status=400)

#         serializer = ProductSerializer(data=product_data)
#         serializer.is_valid(raise_exception=True)
#         product = serializer.save()

#         # --- 2️⃣ Handle images ---
#         images = request.FILES.getlist("images")
#         for img in images:
#             ProductImage.objects.create(product=product, image=img)

#         # --- 3️⃣ Handle demo video ---
#         demo_video = request.FILES.get("demo_video")
#         if demo_video:
#             product.demo_video = demo_video
#             product.save()

#         # --- 4️⃣ Handle variants ---
#         variants_raw = request.data.get("variants")
#         if variants_raw:
#             try:
#                 variants = json.loads(variants_raw)
#             except:
#                 return Response({"error": "Invalid variants JSON"}, status=400)

#             for i, variant_data in enumerate(variants):
#                 variant_image = request.FILES.get(f"variant_image_{i}")
#                 ProductVariant.objects.create(
#                     product=product,
#                     color=variant_data.get("color"),
#                     size=variant_data.get("size"),
#                     price=variant_data.get("price"),
#                     stock=variant_data.get("stock"),
#                     image=variant_image
#                 )

#         return Response(ProductSerializer(product).data, status=201)


class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # 1️⃣ Main product fields
        product_data = {
            "title": request.data.get("title"),
            "slug": request.data.get("slug"),
            "description": request.data.get("description"),
            "price": request.data.get("price"),
            "old_price": request.data.get("old_price"),
            "flash_sale_price": request.data.get("flash_sale_price"),
            "is_new": request.data.get("is_new") in ["true", True, "True"],
            "is_flash_sale": request.data.get("is_flash_sale") in ["true", True, "True"],
            "is_featured": request.data.get("is_featured") in ["true", True, "True"],
            "badge_text": request.data.get("badge_text"),
            "category": request.data.get("category"),
        }

        # Optional fields: colors & tags
        try:
            product_data["colors"] = json.loads(request.data.get("colors", "[]"))
        except:
            return Response({"error": "Invalid colors JSON"}, status=400)

        try:
            product_data["tags"] = json.loads(request.data.get("tags", "[]"))
        except:
            return Response({"error": "Invalid tags JSON"}, status=400)

        # Save product
        serializer = ProductSerializer(data=product_data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()

        # 2️⃣ Handle main gallery images
        images = request.FILES.getlist("images")
        colors = request.data.getlist("image_colors")  # optional colors for images
        for i, img in enumerate(images):
            color = colors[i] if colors and i < len(colors) else None
            ProductImage.objects.create(product=product, image=img, color=color)

        # 3️⃣ Handle demo video
        demo_video = request.FILES.get("demo_video")
        if demo_video:
            product.demo_video = demo_video
            product.save()

        # 4️⃣ Handle variants
        variants_raw = request.data.get("variants")
        if variants_raw:
            try:
                variants = json.loads(variants_raw)
            except:
                return Response({"error": "Invalid variants JSON"}, status=400)

            for i, variant_data in enumerate(variants):
                variant_image = request.FILES.get(f"variant_image_{i}")
                variant = ProductVariant.objects.create(
                    product=product,
                    color=variant_data.get("color"),
                    size=variant_data.get("size"),
                    price=variant_data.get("price"),
                    stock=variant_data.get("stock"),
                    image=variant_image
                )

                # Also create ProductImage for variant thumbnail if image exists
                if variant_image:
                    ProductImage.objects.create(
                        product=product,
                        image=variant_image,
                        color=variant.color
                    )

        return Response(ProductSerializer(product).data, status=201)





# UPLOAD DEMO VIDEO
class ProductDemoVideoUploadAPIView(views.APIView):
    def post(self, request):
        product_id = request.data.get("product")
        demo_video = request.FILES.get("demo_video")

        if not product_id or not demo_video:
            return Response({"error": "Product ID and demo_video file required"}, status=400)

        product = get_object_or_404(Product, id=product_id)

        product.demo_video = demo_video
        product.save()

        return Response({"message": "Demo video uploaded", "product_id": product.id}, status=201)



# /store/products/best-selling/
class BestSellingProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(sold__gte=1).order_by('-sold')[:20]


# /store/products/top-rated/
class TopRatedProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(
            average_rating__gte=4,
            reviews_count__gte=1
        ).order_by('-average_rating')


# /store/products/new/
class NewProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.order_by('-created_at')[:20]

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SearchProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        text = self.request.GET.get("q", "")
        return Product.objects.filter(
            Q(title__icontains=text) |
            Q(description__icontains=text)
        )


# upload image
class ProductImageUploadAPIView(views.APIView):
    def post(self, request):
        product_id = request.data.get('product')
        image = request.data.get('image')

        product = get_object_or_404(Product, id=product_id)

        img = ProductImage.objects.create(
            product=product,
            image=image
        )

        return Response({"id": img.id}, status=201)


@csrf_exempt
def upload_product_image(request):
    if request.method == "POST":
        product_id = request.POST.get("product")
        color = request.POST.get("color", None)
        image = request.FILES.get("image")

        if not product_id or not image:
            return JsonResponse({"error": "Product ID and image are required"}, status=400)

        ProductImage.objects.create(
            product_id=product_id,
            image=image,
            color=color
        )

        return JsonResponse({"message": "Image uploaded successfully"}, status=201)

    return JsonResponse({"error": "Invalid request method"}, status=405)


class CreateOrderAPIView(views.APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        # require verified email
        email = request.data.get('email')
        if not email:
            return Response({"error": "email required"}, status=400)

        otp_ok = EmailOTP.objects.filter(email=email, verified=True).exists()
        if not otp_ok:
            return Response({"error": "email not verified"}, status=400)

        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response({'order_id': order.id}, status=status.HTTP_201_CREATED)


class ProtectedAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.is_active:  # user deleted or deactivated
            return Response({"detail": "User not active. Please sign up again."},
                            status=status.HTTP_403_FORBIDDEN)
        
        # normal response
        return Response({"message": "You have access"})


# ===== Payment confirmation (manual/webhook) =====
# class ConfirmPaymentAPIView(views.APIView):
#     permission_classes = [AllowAny]
#     def post(self, request):
#         order_id = request.data.get('order_id')
#         payment_id = request.data.get('payment_id')
#         provider = request.data.get('provider', 'paystack')

#         order = get_object_or_404(Order, id=order_id)

#         payment, created = Payment.objects.get_or_create(order=order, defaults={
#             'provider': provider,
#             'amount': order.total,
#             'provider_id': payment_id,
#             'confirmed': True
#         })

#         # if created was False, update
#         payment.provider_id = payment_id
#         payment.confirmed = True
#         payment.amount = order.total
#         payment.save()

#         order.status = 'paid'
#         order.save()

#         # Update sold count for each product
#         for item in order.items.all():
#             product = item.product
#             product.sold += item.quantity
#             product.save()

#         # send receipt email
#         subject = "Payment received — Order %s" % order.id
#         message = f"Hi,\n\nYour payment for order #{order.id} has been received. Total: {order.total}.\n\nThank you."
#         send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [order.email], fail_silently=False)

#         return Response({"status": "ok"}, status=200)


# class ConfirmPaymentAPIView(views.APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         order_id = request.data.get('order_id')
#         payment_id = request.data.get('payment_id')
#         provider = request.data.get('provider', 'paystack')

#         if not order_id or not payment_id:
#             return Response({"error": "order_id and payment_id are required"}, status=400)

#         order = get_object_or_404(Order, id=order_id)

#         with transaction.atomic():

#             # 1️⃣ Create or update payment
#             payment, created = Payment.objects.get_or_create(
#                 order=order,
#                 defaults={
#                     'provider': provider,
#                     'amount': order.total,
#                     'provider_id': payment_id,
#                     'confirmed': True
#                 }
#             )

#             if not created:
#                 payment.provider_id = payment_id
#                 payment.confirmed = True
#                 payment.amount = order.total
#                 payment.save()

#             # 2️⃣ Mark order as paid
#             order.status = 'paid'
#             order.save()

#             # 3️⃣ MUST BE INSIDE THE BLOCK — update sold & refresh
#             for item in order.items.select_related('product').all():
#                 print("Updating sold for:", item.product.title, "Qty:", item.quantity)

#                 item.product.sold = F('sold') + item.quantity
#                 item.product.save(update_fields=['sold'])
#                 item.product.refresh_from_db()

#         # 4️⃣ Send receipt email
#         subject = f"Payment received — Order #{order.id}"
#         message = (
#             f"Hi,\n\nYour payment for order #{order.id} has been received.\n"
#             f"Total: {order.total}.\n\nThank you for shopping with us."
#         )
#         send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [order.email], fail_silently=False)

#         return Response({"status": "ok", "message": "Payment confirmed and sold count updated"}, status=200)

# class ConfirmPaymentAPIView(views.APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         order_id = request.data.get('order_id')
#         payment_id = request.data.get('payment_id')
#         provider = request.data.get('provider', 'paystack')
#         referrer_code = request.data.get('referrer_code')  # pass from frontend if available
#         device_fp = request.data.get('device_fingerprint')  # optional

#         if not order_id or not payment_id:
#             return Response({"error": "order_id and payment_id are required"}, status=400)

#         order = get_object_or_404(Order, id=order_id)

#         with transaction.atomic():
#             # 1) create or update payment
#             payment, created = Payment.objects.get_or_create(
#                 order=order,
#                 defaults={
#                     'provider': provider,
#                     'amount': order.total,
#                     'provider_id': payment_id,
#                     'confirmed': True
#                 }
#             )
#             if not created:
#                 payment.provider = provider
#                 payment.provider_id = payment_id
#                 payment.amount = order.total
#                 payment.confirmed = True
#                 payment.save()

#             # 2) mark order as paid
#             order.status = 'paid'
#             order.save(update_fields=['status'])

#             # 3) update sold counts using F() (atomic) then refresh
#             for item in order.items.select_related('product').all():
#                 prod = item.product
#                 prod.sold = F('sold') + item.quantity
#                 prod.save(update_fields=['sold'])
#                 prod.refresh_from_db()

#             # 4) create network.Purchase record for distribution (idempotency via payment_reference)
#             # compute company profit for this order: **YOU MUST PROVIDE** exact profit calculation logic.
#             # For example: profit = (order.total - cost_of_goods - fees). Here we assume frontend/backend set profit.
#             # For demo, assume you set profit = request.data.get('profit') (recommended).
#             profit = request.data.get('profit')
#             if profit is None:
#                 # fallback: simple rule (NOT SAFE FOR PRODUCTION) - set profit = order.total * 0.5
#                 profit = float(order.total) * 0.5

#             NetworkPurchase.objects.update_or_create(
#                 payment_reference=payment_id,
#                 defaults={
#                     'user': order.user if order.user else None,
#                     'order': order,
#                     'profit': profit,
#                     'device_fingerprint': device_fp
#                 }
#             )

#         # 5) send receipt email (outside transaction)
#         subject = f"Payment received — Order #{order.id}"
#         message = (
#             f"Hi,\n\nYour payment for order #{order.id} has been received.\n"
#             f"Total: {order.total}.\n\nThank you for shopping with us."
#         )
#         send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [order.email], fail_silently=False)

#         # 6) enqueue distribution to background worker (non-blocking)
#         distribute_for_purchase_task.delay(payment_id, referrer_code, device_fp)

#         return Response({"status": "ok", "message": "Payment confirmed and sold count updated"}, status=200)



class ConfirmPaymentAPIView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        payment_id = request.data.get("payment_id")
        provider = request.data.get("provider", "paystack")
        referrer_code = request.data.get("referrer_code")
        device_fp = request.data.get("device_fingerprint")

        email = request.data.get("email")
        total = request.data.get("total")
        items = request.data.get("items", [])
        shipping_fullname = request.data.get("shipping_fullname") or ""
        shipping_phone = request.data.get("shipping_phone") or ""
        shipping_street = request.data.get("shipping_street") or ""
        shipping_city = request.data.get("shipping_city") or ""
        shipping_state = request.data.get("shipping_state") or ""
        shipping_country = request.data.get("shipping_country") or ""

        if not payment_id or not email or total is None or not items:
            return Response(
                {"error": "Missing required fields for payment and order."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            total = Decimal(total)
        except Exception:
            return Response({"error": "Invalid total amount"}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            # 1️⃣ Create order
            order = Order.objects.create(
                user=request.user,
                email=email,
                total=total,
                status="paid",
                shipping_fullname=shipping_fullname,
                shipping_phone=shipping_phone,
                shipping_street=shipping_street,
                shipping_city=shipping_city,
                shipping_state=shipping_state,
                shipping_country=shipping_country,
            )

            # 2️⃣ Payment record
            Payment.objects.create(
                order=order,
                provider=provider,
                provider_id=payment_id,
                amount=total,
                confirmed=True,
            )

            # 3️⃣ Process products, profit, qualifying
            total_profit = Decimal("0.00")
            qualifies = False
            for item_data in items:
                product = get_object_or_404(Product, id=item_data["product"])
                quantity = item_data["quantity"]

                profit_per_unit = (Decimal(product.old_price or 0) - Decimal(product.price or 0))
                if profit_per_unit > 0:
                    total_profit += profit_per_unit * quantity
                if profit_per_unit >= Decimal("10.00"):
                    qualifies = True

                product.sold = F("sold") + quantity
                product.save(update_fields=["sold"])
            # ✅ SAVE qualification status
            order.is_qualifying = qualifies
            order.save(update_fields=["is_qualifying"])

            # 4️⃣ Network purchase
            NetworkPurchase.objects.create(
                user=request.user,
                order=order,
                payment_reference=payment_id,
                profit=total_profit,
                device_fingerprint=device_fp,
                distribution_processed=False,
            )

        # 5️⃣ Async distribution
        # distribute_for_purchase_task.delay(payment_id, referrer_code, device_fp)
        distribute_for_purchase_task(payment_id, referrer_code, device_fp)

        return Response(
            {
                "status": "ok",
                "order_id": order.id,
                "qualifies": qualifies,
                "profit": float(total_profit),
            },
            status=status.HTTP_201_CREATED
        )

class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]



class OrdersAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """List orders, optionally filter by status"""
        status_param = request.GET.get('status', None)
        qs = Order.objects.all().order_by('-created_at')
        if status_param:
            qs = qs.filter(status=status_param)

        serializer = OrderListSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Create order with verified email"""
        email = request.data.get('email')
        if not email:
            return Response({"error": "email required"}, status=400)

        if not EmailOTP.objects.filter(email=email, verified=True).exists():
            return Response({"error": "email not verified"}, status=400)

        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response({'order_id': order.id}, status=201)


@csrf_exempt
def send_otp(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            if not email:
                return JsonResponse({"error": "Email is required"}, status=400)

            code = f"{random.randint(0, 999999):06d}"

            # Create or update OTP
            EmailOTP.objects.update_or_create(
                email=email,
                defaults={
                    "otp": code,
                    "verified": False,
                    "created_at": timezone.now()
                }
            )

            # Send OTP email
            send_mail(
                subject="Your Verification OTP",
                message=f"Your OTP is {code}. It is valid for 10 minutes.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
            )

            return JsonResponse({"message": "OTP sent successfully"})

        except Exception as e:
            import traceback
            print("\n============= OTP ERROR START =============")
            traceback.print_exc()
            print("============== OTP ERROR END ==============\n")
            return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def verify_otp(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            otp = data.get("otp")

            if not email or not otp:
                return JsonResponse({"error": "Email and OTP are required"}, status=400)

            try:
                otp_entry = EmailOTP.objects.get(email=email)
            except EmailOTP.DoesNotExist:
                return JsonResponse({"verified": False, "error": "OTP not found"}, status=404)

            if otp_entry.is_expired():
                return JsonResponse({"verified": False, "error": "OTP expired"}, status=400)

            if otp_entry.otp != otp:
                return JsonResponse({"verified": False, "error": "Invalid OTP"}, status=400)

            # Mark as verified
            otp_entry.verified = True
            otp_entry.save()

            return JsonResponse({"verified": True})

        except Exception as e:
            import traceback
            print("\n============= OTP VERIFY ERROR START =============")
            traceback.print_exc()
            print("============== OTP VERIFY ERROR END ==============\n")
            return JsonResponse({"error": str(e)}, status=500)
        



def get_all_orders(request):
    try:
        orders = Order.objects.all().order_by("-created_at")
        data = []

        for order in orders:
            items = OrderItem.objects.filter(order=order)

            data.append({
                "id": order.id,
                "email": order.email,
                "status": order.status,
                "total": float(order.total),

                # Shipping Info
                "shipping": {
                    "fullname": order.shipping_fullname,
                    "phone": order.shipping_phone,
                    "street": order.shipping_street,
                    "city": order.shipping_city,
                    "state": order.shipping_state,
                    "country": order.shipping_country,
                },

                "items": [
                    {
                        "product": item.product.title,
                        "quantity": item.quantity,
                        "unit_price": float(item.unit_price),
                    }
                    for item in items
                ],

                "created_at": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            })

        return JsonResponse({"orders": data}, safe=False)

    except Exception as e:
        import traceback
        print("\n=========== ERROR GETTING ORDERS ===========")
        traceback.print_exc()
        print("============================================\n")
        return JsonResponse({"error": str(e)}, status=500)



def mark_order_delivered(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
        order.status = "delivered"
        order.save()

        # Send email
        send_mail(
            subject="Your Order Has Been Delivered",
            message=(
                f"Hello,\n\n"
                f"Your order #{order.id} has been delivered successfully!\n"
                f"Thank you for shopping with us.\n\n"
                f"Best regards,\nYour Store Team"
            ),
            from_email="noreply@yourstore.com",
            recipient_list=[order.email],
            fail_silently=False,
        )

        return JsonResponse({"success": True, "message": "Order marked delivered and email sent"})

    except Order.DoesNotExist:
        return JsonResponse({"error": "Order not found"}, status=404)

    except Exception as e:
        import traceback
        print("\n=========== ERROR DELIVERING ORDER ===========")
        traceback.print_exc()
        print("==============================================\n")
        return JsonResponse({"error": str(e)}, status=500)


@api_view(["GET"])
@permission_classes([AllowAny])
def product_reviews(request, id):
    """Return all reviews for a product"""
    product = get_object_or_404(Product, id=id)
    reviews = product.reviews.all().order_by("-date")
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)