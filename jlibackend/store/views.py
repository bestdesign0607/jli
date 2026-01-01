import random
from .utils import DIGITAL_PRODUCT_REQUIREMENTS
from network.services import attach_ambassador
from rest_framework import generics, status, views
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.core.mail import send_mail
from django.utils.dateparse import parse_date

from django.db.models import F
from rest_framework.permissions import IsAdminUser
from decimal import Decimal
from django.db import transaction
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes  
from .models import DigitalOrder, Product, Order, Payment, ProductImage, Review
from .serializers import DigitalOrderSerializer, ProductSerializer, OrderSerializer, EmailOTPSerializer, ReviewSerializer
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

from django.db import models  # <- add this line

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




@api_view(["POST"])
def update_order_status(request, order_type, order_id):
    """
    Update the status of an order (digital or physical)
    
    order_type: 'digital' or 'physical'
    body: {"status": "processing/shipped/delivered"}
    """
    # Select model based on order_type
    model = DigitalOrder if order_type == "digital" else Order
    order = get_object_or_404(model, id=order_id)

    # Get new status from request
    new_status = request.data.get("status")
    
    # Validate status
    if new_status not in [choice[0] for choice in order._meta.get_field("status").choices]:
        return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

    # Update and save
    order.status = new_status
    order.save()

    return Response({"message": f"Order status updated to {new_status}"}, status=status.HTTP_200_OK)




# ===== LOGIN VIEW =====
# class LoginAPIView(generics.GenericAPIView):
#     serializer_class = LoginSerializer
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']

#         # Generate JWT tokens
#         refresh = RefreshToken.for_user(user)

#         return Response({
#             "message": "Login successful",
#             "user": {
#                 "id": user.id,
#                 "username": user.username,
#                 "email": user.email,
#                 "first_name": user.first_name
#             },
#             "refresh": str(refresh),
#             "access": str(refresh.access_token)
#         }, status=status.HTTP_200_OK)

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
                "first_name": user.first_name,
                "is_staff": user.is_staff,          # ✅ ADD
                "is_superuser": user.is_superuser,  # ✅ ADD
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
            "product_type": request.data.get("product_type", "physical"),  # ✅ default to physical
        }

        # 2️⃣ Optional JSON fields
        for field in ["colors", "tags"]:
            try:
                product_data[field] = json.loads(request.data.get(field, "[]"))
            except json.JSONDecodeError:
                return Response({"error": f"Invalid JSON for {field}"}, status=400)

        # 3️⃣ Save main product
        serializer = ProductSerializer(data=product_data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()

        # 4️⃣ Handle main gallery images
        images = request.FILES.getlist("images")
        colors = request.data.getlist("image_colors")  # optional colors
        for i, img in enumerate(images):
            color = colors[i] if colors and i < len(colors) else None
            ProductImage.objects.create(product=product, image=img, color=color)

        # 5️⃣ Handle demo video
        demo_video = request.FILES.get("demo_video")
        if demo_video:
            product.demo_video = demo_video
            product.save(update_fields=["demo_video"])

        # 6️⃣ Handle variants
        variants_raw = request.data.get("variants")
        if variants_raw:
            try:
                variants = json.loads(variants_raw)
            except json.JSONDecodeError:
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

                # Optional: also create ProductImage for variant
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



class ProductReviewListCreateView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, id):
        reviews = Review.objects.filter(product_id=id).order_by("-date")
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, id):
        product = get_object_or_404(Product, id=id)

        review = Review.objects.create(
            product=product,
            user=request.user,
            user_name=request.user.username,
            text=request.data.get("text"),
            rating=request.data.get("rating"),
        )
        return Response(ReviewSerializer(review).data, status=201)


class UserOrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class UserReviewListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reviews = Review.objects.filter(user=request.user)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


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


#
class ConfirmPaymentAPIView(views.APIView):
    """
    Endpoint to confirm payment, create order, and trigger ambassador distribution.
    """
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
            return Response(
                {"error": "Invalid total amount"}, status=status.HTTP_400_BAD_REQUEST
            )

        # ======================================================
        # 🔹 DIGITAL-ONLY ORDER DETECTION (NON-INTRUSIVE)
        # ======================================================
        product_ids = [item["product"] for item in items]
        has_physical = Product.objects.filter(
            id__in=product_ids,
            product_type="physical"
        ).exists()

        # ======================================================
        # 🔹 DIGITAL FLOW (EARLY EXIT — DOES NOT TOUCH OLD LOGIC)
        # ======================================================
        if not has_physical:
            with transaction.atomic():
                order = Order.objects.create(
                    user=request.user,
                    email=email,
                    total=total,
                    status="paid"
                )

                Payment.objects.create(
                    order=order,
                    provider=provider,
                    provider_id=payment_id,
                    amount=total,
                    confirmed=True,
                )

                for item_data in items:
                    product = get_object_or_404(Product, id=item_data["product"])
                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        quantity=1,
                        unit_price=product.price
                    )

            return Response(
                {
                    "status": "ok",
                    "order_id": order.id,
                    "digital": True,
                    "next_step": "UPLOAD_PAYMENT_PROOF"
                },
                status=status.HTTP_201_CREATED
            )

        # ======================================================
        # 🔹 PHYSICAL FLOW (UNCHANGED CODE BELOW)
        # ======================================================
        with transaction.atomic():
            # 1️⃣ Create Order
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

            # 2️⃣ Create Payment record
            Payment.objects.create(
                order=order,
                provider=provider,
                provider_id=payment_id,
                amount=total,
                confirmed=True,
            )

            # 3️⃣ Process products: calculate profit and qualifying flag
            total_profit = Decimal("0.00")
            qualifies = False
            for item_data in items:
                product = get_object_or_404(Product, id=item_data["product"])
                quantity = int(item_data["quantity"])

                profit_per_unit = (Decimal(product.old_price or 0) - Decimal(product.price or 0))
                if profit_per_unit > 0:
                    total_profit += profit_per_unit * quantity
                if profit_per_unit >= Decimal("10.00"):
                    qualifies = True

                # Update sold count
                product.sold = product.sold + quantity
                product.save(update_fields=["sold"])

                # Create OrderItem
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    unit_price=product.price
                )

            # Save qualifying flag and profit
            order.is_qualifying = qualifies
            order.profit = total_profit
            order.save(update_fields=["is_qualifying", "profit"])

            # 4️⃣ Attach ambassador and create network purchase if qualifies
            if qualifies:
                profile = attach_ambassador(
                    request.user,
                    referrer_profile=None,
                    device_fingerprint=device_fp
                )

                NetworkPurchase.objects.create(
                    user=request.user,
                    payment_reference=payment_id,
                    order_id=order.id,
                    profit=total_profit,
                    is_qualifying=qualifies,
                    device_fingerprint=device_fp,
                    distribution_processed=False
                )

                distribute_for_purchase_task.delay(
                    payment_reference=payment_id,
                    referrer_code=referrer_code,
                    device_fingerprint=device_fp
                )

        return Response(
            {
                "status": "ok",
                "order_id": order.id,
                "qualifies": qualifies,
                "profit": float(total_profit),
                "is_ambassador": True if qualifies else False,
                "referral_code": profile.referral_code if qualifies else None
            },
            status=status.HTTP_201_CREATED
        )



# class CreateDigitalOrderAPIView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         product_id = request.data.get("product")
#         full_name = request.data.get("full_name")
#         phone = request.data.get("phone", "")
#         email = request.data.get("email", "")
#         username = request.data.get("username", "")
#         requirements = request.data.get("requirements", "")

#         # Uploaded files
#         id_card = request.FILES.get("id_card")
#         signature_director = request.FILES.get("signature_director")
#         signature_witness = request.FILES.get("signature_witness")
#         nin = request.FILES.get("nin")
#         payment_proof = request.FILES.get("payment_proof")  # optional now

#         # Validate required fields
#         if not product_id or not full_name:
#             return Response(
#                 {"error": "Missing required fields: product or full_name"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         product = get_object_or_404(
#             Product,
#             id=product_id,
#             product_type="digital"
#         )

#         digital_order = DigitalOrder.objects.create(
#             product=product,
#             full_name=full_name,
#             phone=phone,
#             email=email,
#             username=username,
#             requirements=requirements,
#             id_card=id_card,
#             signature_director=signature_director,
#             signature_witness=signature_witness,
#             nin=nin,
#             payment_proof=payment_proof,
#         )

#         message = "Digital order created successfully."
#         if payment_proof:
#             message = "Payment proof submitted. Awaiting confirmation."

#         return Response(
#             {
#                 "status": "ok",
#                 "digital_order_id": digital_order.id,
#                 "message": message
#             },
#             status=status.HTTP_201_CREATED
#         )


# class CreateDigitalOrderAPIView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         product_id = request.data.get("product")
#         full_name = request.data.get("full_name")
#         product = get_object_or_404(Product, id=product_id, product_type="digital")
#         product_type = product.slug  # or product_type field if you have specific slug

#         requirements = request.data.get("requirements", {})

#         # Validate fields dynamically
#         required_fields = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})
#         missing_fields = []

#         for field in required_fields.get("text_fields", []):
#             if not requirements.get(field):
#                 missing_fields.append(field)

#         for field in required_fields.get("file_fields", []):
#             if not request.FILES.get(field):
#                 missing_fields.append(field)

#         if missing_fields:
#             return Response(
#                 {"error": f"Missing required fields: {', '.join(missing_fields)}"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # Create order
#         digital_order = DigitalOrder.objects.create(
#             product=product,
#             full_name=full_name,
#             phone=request.data.get("phone", ""),
#             email=request.data.get("email", ""),
#             username=request.data.get("username", ""),
#             requirements=requirements,
#             id_card=request.FILES.get("id_card"),
#             signature_director=request.FILES.get("signature_director"),
#             signature_witness=request.FILES.get("signature_witness"),
#             nin=request.FILES.get("nin"),
#             payment_proof=request.FILES.get("payment_proof"),
#         )

#         message = "Digital order created successfully."
#         if request.FILES.get("payment_proof"):
#             message = "Payment proof submitted. Awaiting confirmation."

#         return Response(
#             {"status": "ok", "digital_order_id": digital_order.id, "message": message},
#             status=status.HTTP_201_CREATED
#         )

# class CreateDigitalOrderAPIView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         product_id = request.data.get("product")
#         full_name = request.data.get("full_name")
#         product = get_object_or_404(Product, id=product_id, product_type="digital")
#         product_type = product.slug.lower()

#         requirements = request.data.get("requirements", {})

#         # Validate fields dynamically
#         required_fields = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})
#         missing_fields = []

#         for field in required_fields.get("text_fields", []):
#             if not requirements.get(field):
#                 missing_fields.append(field)

#         for field in required_fields.get("file_fields", []):
#             if not request.FILES.get(field):
#                 missing_fields.append(field)

#         if missing_fields:
#             return Response(
#                 {"error": f"Missing required fields: {', '.join(missing_fields)}"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # Create order with all file fields dynamically
#         digital_order_data = {
#             "product": product,
#             "full_name": full_name,
#             "phone": request.data.get("phone", ""),
#             "email": request.data.get("email", ""),
#             "username": request.data.get("username", ""),
#             "requirements": requirements,
#         }
#         # Add file fields dynamically
#         for f in required_fields.get("file_fields", []):
#             digital_order_data[f] = request.FILES.get(f)

#         digital_order = DigitalOrder.objects.create(**digital_order_data)

#         message = "Digital order created successfully."
#         if request.FILES.get("payment_proof"):
#             message = "Payment proof submitted. Awaiting confirmation."

#         return Response(
#             {"status": "ok", "digital_order_id": digital_order.id, "message": message},
#             status=status.HTTP_201_CREATED
#         )


# class CreateDigitalOrderAPIView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         product_id = request.data.get("product")
#         product = get_object_or_404(Product, id=product_id, product_type="digital")
#         product_type = product.slug.replace("-", "_").lower()

#         requirements = request.data.get("requirements", {})
#         if isinstance(requirements, str):
#             try:
#                 requirements = json.loads(requirements)
#             except json.JSONDecodeError:
#                 requirements = {}

#         # Get expected fields
#         product_schema = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})
#         text_fields = product_schema.get("text_fields", [])
#         file_fields = product_schema.get("file_fields", [])

#         # Validate text fields
#         missing_text_fields = [f for f in text_fields if not requirements.get(f)]
#         # Validate file fields
#         model_file_fields = ["id_card", "signature_director", "signature_witness", "nin", "payment_proof"]
#         missing_file_fields = [f for f in file_fields if f in model_file_fields and f not in request.FILES]

#         if missing_text_fields or missing_file_fields:
#             return Response({
#                 "error": "Missing required fields",
#                 "text_fields": missing_text_fields,
#                 "file_fields": missing_file_fields
#             }, status=status.HTTP_400_BAD_REQUEST)

#         # Create the order without files first
#         digital_order = DigitalOrder.objects.create(
#             product=product,
#             full_name=request.data.get("full_name", ""),
#             phone=request.data.get("phone", ""),
#             email=request.data.get("email", ""),
#             username=request.data.get("username", ""),
#             requirements=requirements
#         )

#         # Assign files only for fields that exist on the model
#         for field in model_file_fields:
#             if field in request.FILES:
#                 setattr(digital_order, field, request.FILES[field])

#         digital_order.save()

#         return Response({
#             "status": "ok",
#             "digital_order_id": digital_order.id,
#             "message": "Digital order created successfully."
#         }, status=status.HTTP_201_CREATED)






# class CreateDigitalOrderAPIView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         product_id = request.data.get("product")
#         product = get_object_or_404(Product, id=product_id, product_type="digital")
#         product_type = product.slug.replace("-", "_").lower()

#         # Parse submitted text data
#         requirements = request.data.get("requirements", {})
#         if isinstance(requirements, str):
#             try:
#                 requirements = json.loads(requirements)
#             except json.JSONDecodeError:
#                 requirements = {}

#         # Get expected fields
#         product_schema = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})
#         text_fields = product_schema.get("text_fields", [])
#         file_fields = product_schema.get("file_fields", [])

#         # Validate required text fields
#         missing_text_fields = [f for f in text_fields if not requirements.get(f)]
#         # Validate required file fields
#         model_file_fields = [f.name for f in DigitalOrder._meta.fields if isinstance(f, models.FileField)]
#         missing_file_fields = [f for f in file_fields if f in model_file_fields and f not in request.FILES]

#         if missing_text_fields or missing_file_fields:
#             return Response({
#                 "error": "Missing required fields",
#                 "text_fields": missing_text_fields,
#                 "file_fields": missing_file_fields
#             }, status=status.HTTP_400_BAD_REQUEST)

#         # Prepare data for DigitalOrder creation
#         order_data = {
#             "product": product,
#             "full_name": request.data.get("full_name", ""),
#             "phone": request.data.get("phone", ""),
#             "email": request.data.get("email", ""),
#             "username": request.data.get("username", ""),
#         }

#         # Add all text fields from requirements to order_data
#         for field in text_fields:
#             if field in requirements:
#                 order_data[field] = requirements[field]

#         # Create the order instance
#         digital_order = DigitalOrder.objects.create(**order_data)

#         # Assign uploaded files
#         for field in model_file_fields:
#             if field in request.FILES:
#                 setattr(digital_order, field, request.FILES[field])

#         digital_order.save()

#         return Response({
#             "status": "ok",
#             "digital_order_id": digital_order.id,
#             "message": "Digital order created successfully."
#         }, status=status.HTTP_201_CREATED)





class CreateDigitalOrderAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        product_id = request.data.get("product")
        product = get_object_or_404(Product, id=product_id, product_type="digital")

        # Collect all editable model fields (excluding auto fields)
        model_fields = [
            f.name for f in DigitalOrder._meta.get_fields()
            if f.editable and f.name not in ("id", "product", "created_at", "confirmed_at")
        ]

        order_data = {}
        for field in model_fields:
            value = request.data.get(field, None)  # default to None

            # Convert empty strings for DateFields to None
            model_field = DigitalOrder._meta.get_field(field)
            if isinstance(model_field, models.DateField):
                if value in ("", None):
                    order_data[field] = None
                else:
                    # Ensure proper YYYY-MM-DD format
                    parsed_date = parse_date(value)
                    order_data[field] = parsed_date
            else:
                # Keep empty string for text fields
                order_data[field] = value if value is not None else ""

        order_data["product"] = product

        # Create the order
        digital_order = DigitalOrder.objects.create(**order_data)

        # Assign uploaded files
        file_fields = [f.name for f in DigitalOrder._meta.get_fields() if isinstance(f, models.FileField)]
        for field in file_fields:
            if field in request.FILES:
                setattr(digital_order, field, request.FILES[field])

        digital_order.save()

        return Response({
            "status": "ok",
            "digital_order_id": digital_order.id,
            "message": "Digital order created successfully."
        }, status=status.HTTP_201_CREATED)





# class CreateDigitalOrderAPIView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         product_id = request.data.get("product")
#         full_name = request.data.get("full_name")
#         product = get_object_or_404(Product, id=product_id, product_type="digital")
#         product_type = product.slug.lower()

#         # Text fields
#         requirements = request.data.get("requirements", {})

#         # Validate required text fields
#         required_fields = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})
#         missing_fields = []
#         for field in required_fields.get("text_fields", []):
#             if not requirements.get(field):
#                 missing_fields.append(field)

#         # Validate required file fields
#         for field in required_fields.get("file_fields", []):
#             if not request.FILES.get(field):
#                 missing_fields.append(field)

#         if missing_fields:
#             return Response(
#                 {"error": f"Missing required fields: {', '.join(missing_fields)}"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # Create DigitalOrder with text fields only
#         digital_order = DigitalOrder.objects.create(
#             product=product,
#             full_name=full_name,
#             phone=request.data.get("phone", ""),
#             email=request.data.get("email", ""),
#             username=request.data.get("username", ""),
#             requirements=requirements,
#             payment_proof=request.FILES.get("payment_proof")
#         )

#         # Save files in DigitalOrderFile
#         for field in required_fields.get("file_fields", []):
#             uploaded_file = request.FILES.get(field)
#             if uploaded_file:
#                 DigitalOrderFile.objects.create(
#                     order=digital_order,
#                     field_name=field,
#                     file=uploaded_file
#                 )

#         message = "Digital order created successfully."
#         if request.FILES.get("payment_proof"):
#             message = "Payment proof submitted. Awaiting confirmation."

#         return Response(
#             {"status": "ok", "digital_order_id": digital_order.id, "message": message},
#             status=status.HTTP_201_CREATED
#         )

class UploadPaymentProofAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        payment_proof = request.FILES.get("payment_proof")
        if not payment_proof:
            return Response(
                {"error": "No payment proof uploaded."},
                status=status.HTTP_400_BAD_REQUEST
            )

        digital_order = get_object_or_404(DigitalOrder, id=order_id, email=request.user.email)

        digital_order.payment_proof = payment_proof
        digital_order.save()

        return Response(
            {
                "status": "ok",
                "message": "Payment proof uploaded successfully. Awaiting confirmation."
            },
            status=status.HTTP_200_OK
        )
    

class ConfirmDigitalOrderAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, order_id):
        fulfillment_link = request.data.get("fulfillment_link")

        if not fulfillment_link:
            return Response(
                {"error": "Fulfillment link is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch the digital order
        digital_order = get_object_or_404(DigitalOrder, id=order_id)

        # Update fields
        digital_order.status = "confirmed"
        digital_order.fulfillment_link = fulfillment_link
        digital_order.confirmed_at = timezone.now()
        digital_order.save()

        # Optionally, send email notification
        if digital_order.email:
            subject = f"Your digital product '{digital_order.product.title}' is ready"
            message = (
                f"Hi {digital_order.full_name},\n\n"
                f"Your digital product has been confirmed. You can access it here:\n"
                f"{fulfillment_link}\n\n"
                f"Thank you for your purchase!"
            )
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [digital_order.email],
                fail_silently=False
            )

        return Response(
            {
                "status": "ok",
                "digital_order_id": digital_order.id,
                "message": "Digital order confirmed and fulfillment link sent"
            },
            status=status.HTTP_200_OK
        )

# class DigitalOrderListAPIView(APIView):
#     queryset = DigitalOrder.objects.all().order_by("-created_at")
#     serializer_class = DigitalOrderSerializer
#     permission_classes = [IsAdminUser]
class DigitalOrderListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        orders = DigitalOrder.objects.all()
        serializer = DigitalOrderSerializer(
            orders,
            many=True,
            context={"request": request}  # 🔥 THIS LINE FIXES EVERYTHING
        )
        return Response(serializer.data)
    
class OrderDetailAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

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
        



# def get_all_orders(request):
#     try:
#         orders = Order.objects.all().order_by("-created_at")
#         data = []

#         for order in orders:
#             items = OrderItem.objects.filter(order=order)

#             data.append({
#                 "id": order.id,
#                 "email": order.email,
#                 "status": order.status,
#                 "total": float(order.total),

#                 # Shipping Info
#                 "shipping": {
#                     "fullname": order.shipping_fullname,
#                     "phone": order.shipping_phone,
#                     "street": order.shipping_street,
#                     "city": order.shipping_city,
#                     "state": order.shipping_state,
#                     "country": order.shipping_country,
#                 },

#                 "items": [
#                     {
#                         "product": item.product.title,
#                         "quantity": item.quantity,
#                         "unit_price": float(item.unit_price),
#                     }
#                     for item in items
#                 ],

#                 "created_at": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
#             })

#         return JsonResponse({"orders": data}, safe=False)

#     except Exception as e:
#         import traceback
#         print("\n=========== ERROR GETTING ORDERS ===========")
#         traceback.print_exc()
#         print("============================================\n")
#         return JsonResponse({"error": str(e)}, status=500)



def get_all_orders(request):
    try:
        data = []

        # ===== Physical orders =====
        orders = Order.objects.all().order_by("-created_at")
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

                "is_digital": False,
                "created_at": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            })

        # ===== Digital orders =====
        digital_orders = DigitalOrder.objects.all().order_by("-created_at")
        for d_order in digital_orders:
            data.append({
                "id": d_order.id,
                "email": d_order.email,
                "status": d_order.status,
                "total": float(d_order.product.price),
                "is_digital": True,
                "shipping": None,
                "items": [{
                    "product": d_order.product.title,
                    "quantity": 1,
                    "unit_price": float(d_order.product.price),
                    "download_link": getattr(d_order, "fulfillment_link", None),
                    "images": [img.image.url for img in d_order.product.images.all()]
                }],
                "created_at": d_order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
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