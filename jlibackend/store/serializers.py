import json
from rest_framework import serializers
from django.db.models import Avg, Count
from .models import DigitalOrder, Product, ProductImage, ProductVariant, Review
from .models import Category, Product, ProductImage, Order, OrderItem, Payment, EmailOTP, ProductVariant, Review
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .utils import DIGITAL_PRODUCT_REQUIREMENTS
from .models import UserProfile
from network.models import AmbassadorProfile, Purchase  # ✅ IMPORTANT


User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="first_name", required=False)
    username = serializers.CharField(required=False)
    email = serializers.EmailField(read_only=True)

    phone = serializers.CharField(source="profile.phone", allow_blank=True, required=False)
    street = serializers.CharField(source="profile.street", allow_blank=True, required=False)
    city = serializers.CharField(source="profile.city", allow_blank=True, required=False)
    state = serializers.CharField(source="profile.state", allow_blank=True, required=False)
    country = serializers.CharField(source="profile.country", allow_blank=True, required=False)
    is_ambassador = serializers.SerializerMethodField()  # ← Add this

    class Meta:
        model = User
        fields = ["id", "username", "full_name", "email", "phone", "street", "city", "state", "country", "is_ambassador"]
    def get_is_ambassador(self, obj):
        return hasattr(obj, 'ambassador') 

    # def update(self, instance, validated_data):
    #     # Update User fields
    #     instance.first_name = validated_data.get("first_name", instance.first_name)
    #     instance.username = validated_data.get("username", instance.username)
    #     instance.save()

    #     # Update profile fields
    #     profile, _ = UserProfile.objects.get_or_create(user=instance)
    #     profile_data = validated_data.get("profile", {})

    #     profile.phone = validated_data.get("phone", profile.phone)
    #     profile.street = validated_data.get("street", profile.street)
    #     profile.city = validated_data.get("city", profile.city)
    #     profile.state = validated_data.get("state", profile.state)
    #     profile.country = validated_data.get("country", profile.country)
    #     profile.save()
    def update(self, instance, validated_data):
    # Update User fields
        instance.first_name = validated_data.get("full_name", instance.first_name)
        instance.username = validated_data.get("username", instance.username)
        instance.save()

        # Update profile fields
        profile, _ = UserProfile.objects.get_or_create(user=instance)

        profile.phone = validated_data.get("phone", profile.phone)
        profile.street = validated_data.get("street", profile.street)
        profile.city = validated_data.get("city", profile.city)
        profile.state = validated_data.get("state", profile.state)
        profile.country = validated_data.get("country", profile.country)
        profile.save()

    


        return instance

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "color", "alt", "order"]



class ProductVariantSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = ProductVariant
        fields = ['id', 'color', 'size', 'price', 'stock', 'image']


class ReviewSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)

    class Meta:
        model = Review
        fields = ["id", "product_title", "user_name", "text", "rating", "date"]
        read_only_fields = ["id", "date", "product_title"]
        
# class ProductSerializer(serializers.ModelSerializer):
#     images = ProductImageSerializer(many=True, read_only=True)
#     reviews = ReviewSerializer(many=True, read_only=True)
#     variants = ProductVariantSerializer(many=True, read_only=True)
#     category_name = serializers.CharField(source="category.name", read_only=True)

#     class Meta:
#         model = Product
#         fields = [
#             "id", "title", "slug", "description", "price", "old_price",
#             "flash_sale_price", "is_flash_sale",
#             "is_new", "is_featured", "badge_text", "tags",
#             "average_rating", "reviews_count", "sold",
#             "colors", "images", "variants",
#             "demo_video", "category", "category_name",'reviews', "created_at"
#         ]

# class ProductSerializer(serializers.ModelSerializer):
#     # All images for the product
#     images = ProductImageSerializer(many=True, read_only=True)

#     # Main gallery images (exclude variant images if needed)
#     main_images = serializers.SerializerMethodField()

#     # Variant details
#     variants = ProductVariantSerializer(many=True, read_only=True)

#     # Reviews
#     reviews = ReviewSerializer(many=True, read_only=True)

#     # Category name
#     category_name = serializers.CharField(source="category.name", read_only=True)

#     class Meta:
#         model = Product
#         fields = [
#             "id", "title", "slug", "description", "price", "old_price",
#             "flash_sale_price", "is_flash_sale",
#             "is_new", "is_featured", "badge_text", "tags",
#             "average_rating", "reviews_count", "sold",
#             "colors", "images", "main_images", "variants",
#             "demo_video", "category", "category_name", "reviews", "created_at"
#         ]

#     def get_main_images(self, obj):
#         return ProductImageSerializer(obj.images.filter(color__isnull=True), many=True).data

#     def get_variant_images(self, obj):
#         return ProductImageSerializer(obj.images.filter(color__isnull=False), many=True).data
    
# class ProductSerializer(serializers.ModelSerializer):
#     # All images for the product
#     images = ProductImageSerializer(many=True, read_only=True)

#     # Main gallery images (exclude variant images if needed)
#     main_images = serializers.SerializerMethodField()

#     # Variant details
#     variants = ProductVariantSerializer(many=True, read_only=True)

#     # Reviews
#     reviews = ReviewSerializer(many=True, read_only=True)

#     # Computed fields
#     average_rating = serializers.SerializerMethodField()
#     reviews_count = serializers.SerializerMethodField()

#     # Category name
#     category_name = serializers.CharField(source="category.name", read_only=True)

#     product_type = serializers.CharField()

#     class Meta:
#         model = Product
#         fields = [
#             "id", "title", "slug", "description", "price", "old_price",
#             "flash_sale_price", "is_flash_sale",
#             "is_new", "is_featured", "badge_text", "tags",
#             "average_rating", "stock", "reviews_count", "sold",
#             "colors", "images", "main_images", "variants", "product_type",
#             "demo_video", "category", "category_name", "reviews", "created_at"
#         ]

#     def get_main_images(self, obj):
#         return ProductImageSerializer(obj.images.filter(color__isnull=True), many=True).data

#     def get_average_rating(self, obj):
#         avg = obj.reviews.aggregate(avg_rating=Avg('rating'))['avg_rating']
#         return round(avg or 0, 1)

#     def get_reviews_count(self, obj):
#         return obj.reviews.count()





class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    main_images = serializers.SerializerMethodField()
    variants = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()
    category_name = serializers.CharField(source="category.name", read_only=True)

    # NEW: Form structure for digital products
    form_structure = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id", "title", "slug", "description", "price", "old_price",
            "flash_sale_price", "is_flash_sale",
            "is_new", "is_featured", "badge_text", "tags",
            "average_rating", "stock", "reviews_count", "sold",
            "colors", "images", "main_images", "variants", "product_type",
            "demo_video", "category", "category_name", "reviews", "created_at",
            "digital_category", "form_structure"
        ]

    def get_main_images(self, obj):
        return ProductImageSerializer(obj.images.filter(color__isnull=True), many=True).data

    def get_average_rating(self, obj):
        avg = obj.reviews.aggregate(avg_rating=Avg('rating'))['avg_rating']
        return round(avg or 0, 1)

    def get_reviews_count(self, obj):
        return obj.reviews.count()

    def get_variants(self, obj):
        # Keep your previous ProductVariantSerializer if needed
        if hasattr(obj, "variants"):
            return ProductVariantSerializer(obj.variants.all(), many=True).data
        return []

    def get_form_structure(self, obj):
        """
        Return dynamic form structure for digital products based on digital_category.
        Falls back to empty dict for physical products.
        """
        if obj.product_type != "digital":
            return {}

        # Map product.digital_category to DIGITAL_PRODUCT_REQUIREMENTS keys
        category_map = {
            "business name": "business_name",
            "ngo": "ngo",
            "pos": "moniepoint_pos",
            "cac": "cac_ltd",
            "ebook": "ebook",
            "ecourse": "ecourse"
        }

        key = category_map.get((obj.digital_category or "").lower(), "cac_ltd")
        schema = DIGITAL_PRODUCT_REQUIREMENTS.get(key, {"text_fields": [], "file_fields": []})

        # Transform into sections for frontend convenience
        sections = []
        if schema.get("text_fields"):
            sections.append({"title": "Details", "fields": schema["text_fields"]})

        return {
            "sections": sections,
            "file_fields": schema.get("file_fields", [])
        }


    
# class OrderItemSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = OrderItem
#         fields = ['product', 'quantity', 'unit_price']

class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source="product.id", read_only=True)
    product_title = serializers.CharField(source="product.title", read_only=True)

    class Meta:
        model = OrderItem
        fields = ['product_id', 'product_title', 'quantity', 'unit_price']


class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id',
            'status',
            'total',
            'created_at',
        ]


# class OrderSerializer(serializers.ModelSerializer):
#     items = OrderItemSerializer(many=True, read_only=True)  # ✅ read_only
#     user_is_ambassador = serializers.SerializerMethodField() 

#     class Meta:
#         model = Order
#         fields = [
#             'id', 'email', 'total', 'status',
#             'shipping_fullname','is_qualifying', 'shipping_phone',
#             'shipping_street', 'shipping_city',
#             'shipping_state', 'shipping_country',
#             'items', 'user_is_ambassador',
#         ]
#         read_only_fields = ['status', 'id']

#     def create(self, validated_data):
#         items_data = validated_data.pop('items')
#         order = Order.objects.create(**validated_data)

#         for item in items_data:
#             OrderItem.objects.create(order=order, **item)

#         return order
#     def get_user_is_ambassador(self, obj):
#         profile = getattr(obj.user, 'profile', None)
#         return getattr(profile, "is_ambassador", False)

# class OrderSerializer(serializers.ModelSerializer):
#     items = OrderItemSerializer(many=True, read_only=True)
#     user_is_ambassador = serializers.SerializerMethodField()

#     class Meta:
#         model = Order
#         fields = [
#             'id', 'email', 'total', 'status',
#             'shipping_fullname', 'is_qualifying', 'shipping_phone',
#             'shipping_street', 'shipping_city',
#             'shipping_state', 'shipping_country',
#             'items', 'user_is_ambassador',
#         ]
#         read_only_fields = ['status', 'id']

#     def get_user_is_ambassador(self, obj):
#         if not obj.user:
#             return False
#         return AmbassadorProfile.objects.filter(user=obj.user).exists()

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    # 🔑 NEW FIELDS
    profit = serializers.SerializerMethodField()
    is_qualifying = serializers.SerializerMethodField()
    user_is_ambassador = serializers.SerializerMethodField()
    ambassador_eligible = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id',
            'email',
            'total',
            'status',

            # shipping
            'shipping_fullname',
            'shipping_phone',
            'shipping_street',
            'shipping_city',
            'shipping_state',
            'shipping_country',

            # order data
            'items',

            # 🔑 NETWORK FIELDS
            'profit',
            'is_qualifying',
            'user_is_ambassador',
            'ambassador_eligible',
        ]
        read_only_fields = ['status', 'id']

    def _get_purchase(self, obj):
        return Purchase.objects.filter(order=obj).first()

    def get_profit(self, obj):
        purchase = self._get_purchase(obj)
        return purchase.profit if purchase else 0

    def get_is_qualifying(self, obj):
        purchase = self._get_purchase(obj)
        return purchase.is_qualifying if purchase else False

    def get_user_is_ambassador(self, obj):
        if not obj.user:
            return False
        return AmbassadorProfile.objects.filter(user=obj.user).exists()

    def get_ambassador_eligible(self, obj):
        purchase = self._get_purchase(obj)
        if not purchase or not obj.user:
            return False

        # eligible if qualifying AND not already ambassador
        return (
            purchase.is_qualifying and
            not AmbassadorProfile.objects.filter(user=obj.user).exists()
        )

# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id",
#             "product",
#             "product_title",
#             "full_name",
#             "phone",
#             "email",
#             "username",
#             "requirements",
#             "payment_proof",
#             "fulfillment_link",
#             "status",
#             "created_at",
#             "confirmed_at",
#         ]
#         read_only_fields = [
#             "status",
#             "fulfillment_link",
#             "confirmed_at",
#             "created_at",
#         ]

# class DigitalOrderAdminUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DigitalOrder
#         fields = ["status", "fulfillment_link"]


# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)
#     parsed_requirements = serializers.SerializerMethodField()

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id",
#             "product",
#             "product_title",
#             "full_name",
#             "phone",
#             "email",
#             "username",
#             "requirements",
#             "parsed_requirements",  # New read-only field
#             "payment_proof",
#             "fulfillment_link",
#             "status",
#             "created_at",
#             "confirmed_at",
#         ]
#         read_only_fields = [
#             "status",
#             "fulfillment_link",
#             "confirmed_at",
#             "created_at",
#             "parsed_requirements",
#         ]

#     def get_parsed_requirements(self, obj):
#         try:
#             data = json.loads(obj.requirements)
#         except (json.JSONDecodeError, TypeError):
#             return obj.requirements or ""
#         return data  # Will display as a JSON object in DRF Admin/API view

# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)

#     # File fields
#     id_card = serializers.FileField(read_only=True)
#     signature_director = serializers.FileField(read_only=True)
#     signature_witness = serializers.FileField(read_only=True)
#     nin = serializers.FileField(read_only=True)

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id", "product", "product_title", "full_name", "email", "phone", "username",
#             "status", "fulfillment_link", "created_at", "confirmed_at",
#             "id_card", "signature_director", "signature_witness", "nin"
#         ]

#     def to_representation(self, instance):
#         """
#         Override to_representation to merge all requirements fields
#         (both text and file URLs) into the serialized output.
#         """
#         data = super().to_representation(instance)

#         try:
#             requirements = json.loads(instance.requirements)
#         except Exception:
#             requirements = {}

#         # Merge all fields from requirements JSON
#         for key, value in requirements.items():
#             data[key] = value

#         return data

# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)

#     id_card = serializers.FileField(read_only=True)
#     signature_director = serializers.FileField(read_only=True)
#     signature_witness = serializers.FileField(read_only=True)
#     nin = serializers.FileField(read_only=True)

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id", "product", "product_title",
#             "full_name", "email", "phone", "username",
#             "status", "fulfillment_link",
#             "created_at", "confirmed_at",
#             "id_card", "signature_director",
#             "signature_witness", "nin",
#         ]

#     def to_representation(self, instance):
#         request = self.context.get("request")
#         data = super().to_representation(instance)

#         # ✅ Convert model file fields to absolute URLs
#         for field in ["id_card", "signature_director", "signature_witness", "nin"]:
#             value = data.get(field)
#             if value and request:
#                 data[field] = request.build_absolute_uri(value)

#         # ✅ Merge requirements JSON (text + files)
#         try:
#             requirements = json.loads(instance.requirements or "{}")
#         except Exception:
#             requirements = {}

#         for key, value in requirements.items():
#             if isinstance(value, str) and value.startswith("/media/") and request:
#                 value = request.build_absolute_uri(value)
#             data[key] = value

#         return data

# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id",
#             "product",
#             "product_title",
#             "full_name",
#             "email",
#             "phone",
#             "username",
#             "requirements",
#             "status",
#             "fulfillment_link",
#             "created_at",
#             "confirmed_at",
#             "id_card",
#             "signature_director",
#             "signature_witness",
#             "nin",
#             "payment_proof",
#         ]

#     def to_representation(self, instance):
#         request = self.context.get("request")
#         data = super().to_representation(instance)

#         file_fields = [
#             "id_card",
#             "signature_director",
#             "signature_witness",
#             "nin",
#             "payment_proof",
#         ]

#         for field in file_fields:
#             file_obj = getattr(instance, field)
#             if file_obj:
#                 data[field] = request.build_absolute_uri(file_obj.url)
#             else:
#                 data[field] = None

#         return data


# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id",
#             "product",
#             "product_title",
#             "full_name",
#             "email",
#             "phone",
#             "username",
#             "requirements",
#             "status",
#             "fulfillment_link",
#             "created_at",
#             "confirmed_at",
#             "id_card",
#             "signature_director",
#             "signature_witness",
#             "nin",
#             "payment_proof",
#         ]

#     def to_representation(self, instance):
#         request = self.context.get("request")
#         data = super().to_representation(instance)

#         # Serialize file fields to full URLs
#         file_fields = [
#             "id_card",
#             "signature_director",
#             "signature_witness",
#             "nin",
#             "payment_proof",
#         ]
#         for field in file_fields:
#             file_obj = getattr(instance, field)
#             data[field] = request.build_absolute_uri(file_obj.url) if file_obj else None

#         # Parse requirements JSON
#         try:
#             requirements_data = instance.requirements
#             if isinstance(requirements_data, str):
#                 requirements_data = json.loads(requirements_data)
#             if not isinstance(requirements_data, dict):
#                 requirements_data = {}
#         except Exception:
#             requirements_data = {}

#         # Dynamically filter/expand fields based on product type
#         product_type = getattr(instance.product, "product_type", "").lower()

#         # Define required fields per product type
#         PRODUCT_FIELDS = {
#             "cac": [
#                 "surname", "firstname", "othername", "dob", "gender", "phone",
#                 "home_state", "home_lga", "home_city", "home_house", "home_street",
#                 "company_state", "company_lga", "company_city", "company_house", "company_street", "company_email",
#                 "business_name1", "business_name2", "personal_email",
#                 "object1", "object2", "object3", "object4",
#                 "witness_surname", "witness_firstname", "witness_othername", "witness_dob", "witness_gender", "witness_phone",
#                 "witness_state", "witness_lga", "witness_city", "witness_house", "witness_street"
#             ],
#             "ngo": [
#                 "chairman", "chairman_nin", "chairman_phone", "chairman_email", "chairman_address", "chairman_dob",
#                 "secretary", "secretary_nin", "secretary_phone", "secretary_email", "secretary_address", "secretary_dob",
#                 "trustee1", "trustee1_nin", "trustee1_phone", "trustee1_email", "trustee1_address", "trustee1_dob",
#                 "trustee2", "trustee2_nin", "trustee2_phone", "trustee2_email", "trustee2_address", "trustee2_dob",
#                 "trustees_tenure", "ngo_address", "ngo_phone", "ngo_email",
#                 "proposed_ngo_name1", "proposed_ngo_name2", "proposed_ngo_name3", "aim_objectives"
#             ],
#             "pos": [
#                 "bvn", "dob", "phone", "email", "passport_photo",
#                 "first_name", "last_name", "title", "gender", "marital_status", "religion", "nationality", "state_of_origin", "lga_of_origin",
#                 "employment_status", "address",
#                 "home_address", "country", "city", "state", "lga", "utility_bill",
#                 "id_file", "signature_file",
#                 "next_of_kin_name", "next_of_kin_phone", "next_of_kin_relationship", "next_of_kin_dob", "next_of_kin_email", "next_of_kin_address", "next_of_kin_country", "next_of_kin_city", "next_of_kin_lga",
#                 "business_name", "nature_of_business"
#             ],
#             "business_name": [
#                 "surname", "firstname", "othername", "dob", "gender", "phone",
#                 "home_state", "home_lga", "home_city", "home_house", "home_street",
#                 "business_name1", "business_name2", "personal_email"
#             ]
#         }

#         # Only include fields relevant to this product
#         relevant_fields = PRODUCT_FIELDS.get(product_type, [])
#         for field in relevant_fields:
#             data[field] = requirements_data.get(field)

#         return data

# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id",
#             "product",
#             "product_title",
#             "full_name",
#             "email",
#             "phone",
#             "username",
#             "requirements",
#             "status",
#             "fulfillment_link",
#             "created_at",
#             "confirmed_at",
#             "id_card",
#             "signature_director",
#             "signature_witness",
#             "nin",
#             "payment_proof",
#         ]

#     def to_representation(self, instance):
#         request = self.context.get("request")
#         data = super().to_representation(instance)

#         # Serialize all file fields to full URLs
#         file_fields = ["id_card","signature_director","signature_witness","nin","payment_proof","passport_photo","id_file","signature_file","utility_bill"]
#         for field in file_fields:
#             file_obj = getattr(instance, field, None)
#             data[field] = request.build_absolute_uri(file_obj.url) if file_obj else None

#         # Parse requirements JSON
#         requirements_data = instance.requirements
#         if isinstance(requirements_data, str):
#             try:
#                 requirements_data = json.loads(requirements_data)
#             except:
#                 requirements_data = {}

#         # Get the correct product type slug
#         product_type = getattr(instance.product, "slug", "").lower()

#         # Dynamically include all text fields from utils
#         product_schema = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})
#         for field in product_schema.get("text_fields", []):
#             data[field] = requirements_data.get(field)

#         return data




# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id",
#             "product",
#             "product_title",
#             "full_name",
#             "email",
#             "phone",
#             "username",
#             "requirements",
#             "status",
#             # "fulfillment_link",
#             "created_at",
#             "confirmed_at",

#             # FILE FIELDS (ONLY WHAT EXISTS)
#             "id_card",
#             "signature_director",
#             "signature_witness",
#             "nin",
#             "payment_proof",
#         ]

#     def to_representation(self, instance):
#         request = self.context.get("request")
#         data = super().to_representation(instance)

#         # ✅ Safely convert file fields to absolute URLs
#         file_fields = [
#             "id_card",
#             "signature_director",
#             "signature_witness",
#             "nin",
#             "payment_proof",
#         ]

#         for field in file_fields:
#             file_obj = getattr(instance, field, None)
#             if file_obj and hasattr(file_obj, "url") and request:
#                 data[field] = request.build_absolute_uri(file_obj.url)
#             else:
#                 data[field] = None

#         # ✅ Parse requirements JSON
#         requirements_data = instance.requirements
#         if isinstance(requirements_data, str):
#             try:
#                 requirements_data = json.loads(requirements_data)
#             except json.JSONDecodeError:
#                 requirements_data = {}

#         # ✅ Normalize product slug → utils key
#         product_slug = getattr(instance.product, "slug", "")
#         product_type = product_slug.replace("-", "_").lower()

#         product_schema = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})

#         # ✅ Inject dynamic text fields
#         for field in product_schema.get("text_fields", []):
#             data[field] = requirements_data.get(field)

#         return data








# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id",
#             "product",
#             "product_title",
#             "full_name",
#             "email",
#             "phone",
#             "username",
#             "requirements",
#             "status",
#             "created_at",
#             "confirmed_at",
#             "id_card",
#             "signature_director",
#             "signature_witness",
#             "nin",
#             "payment_proof",
#         ]

#     def to_representation(self, instance):
#         request = self.context.get("request")
#         data = super().to_representation(instance)

#         # ✅ Parse requirements JSON
#         requirements_data = instance.requirements
#         if isinstance(requirements_data, str):
#             try:
#                 requirements_data = json.loads(requirements_data)
#             except json.JSONDecodeError:
#                 requirements_data = {}

#         # ✅ Determine product type dynamically
#         product_slug = getattr(instance.product, "slug", "")
#         product_type = product_slug.replace("-", "_").lower()
#         product_schema = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})

#         # ✅ Convert all file fields dynamically to absolute URLs
#         file_fields = product_schema.get("file_fields", [])
#         for field in file_fields:
#             file_obj = getattr(instance, field, None)
#             if file_obj and hasattr(file_obj, "url") and request:
#                 data[field] = request.build_absolute_uri(file_obj.url)
#             else:
#                 data[field] = None

#         # ✅ Inject dynamic text fields from requirements JSON
#         for field in product_schema.get("text_fields", []):
#             data[field] = requirements_data.get(field)

#         return data




# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id",
#             "product",
#             "product_title",
#             "full_name",
#             "email",
#             "phone",
#             "username",
#             "requirements",
#             "status",
#             "created_at",
#             "confirmed_at",
#             "id_card",
#             "signature_director",
#             "signature_witness",
#             "nin",
#             "payment_proof",
#         ]

#     # def to_representation(self, instance):
#     #     request = self.context.get("request")
#     #     data = super().to_representation(instance)

#     #     # ✅ Parse requirements JSON safely
#     #     requirements_data = instance.requirements
#     #     if isinstance(requirements_data, str):
#     #         try:
#     #             requirements_data = json.loads(requirements_data)
#     #         except json.JSONDecodeError:
#     #             requirements_data = {}

#     #     # ✅ Determine product type dynamically
#     #     product_slug = getattr(instance.product, "slug", "")
#     #     product_type = product_slug.replace("-", "_").lower()
#     #     product_schema = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})

#     #     # ✅ Convert all file fields dynamically to absolute URLs
#     #     file_fields = product_schema.get("file_fields", [])
#     #     for field in file_fields:
#     #         file_obj = getattr(instance, field, None)
#     #         if file_obj and hasattr(file_obj, "url") and request:
#     #             data[field] = request.build_absolute_uri(file_obj.url)
#     #         else:
#     #             data[field] = None

#     #     # ✅ Inject dynamic text fields from requirements JSON
#     #     for field in product_schema.get("text_fields", []):
#     #         data[field] = requirements_data.get(field, "")  # default to empty string

#     #     return data
#     def to_representation(self, instance):
#         request = self.context.get("request")
#         data = super().to_representation(instance)

#         # Parse requirements safely
#         requirements_data = instance.requirements or {}
#         if isinstance(requirements_data, str):
#             try:
#                 requirements_data = json.loads(requirements_data)
#             except json.JSONDecodeError:
#                 requirements_data = {}

#         # 🔥 ALWAYS expose all requirement fields
#         for key, value in requirements_data.items():
#             if key not in data:
#                 data[key] = value

#         # Determine product schema (optional, for files only)
#         product_slug = getattr(instance.product, "slug", "")
#         product_type = product_slug.replace("-", "_").lower()
#         product_schema = DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})

#         # Handle file fields dynamically
#         for field in product_schema.get("file_fields", []):
#             file_obj = getattr(instance, field, None)
#             if file_obj and hasattr(file_obj, "url") and request:
#                 data[field] = request.build_absolute_uri(file_obj.url)
#             else:
#                 data[field] = None

#         return data



# class DigitalOrderSerializer(serializers.ModelSerializer):
#     product_title = serializers.CharField(source="product.title", read_only=True)
#     product_type = serializers.SerializerMethodField()
#     schema = serializers.SerializerMethodField()

#     class Meta:
#         model = DigitalOrder
#         fields = [
#             "id",
#             "product",
#             "product_title",
#             "product_type",
#             "schema",
#             "full_name",
#             "email",
#             "phone",
#             "username",
#             "requirements",
#             "status",
#             "created_at",
#             "confirmed_at",
#             "payment_proof",
#         ]

#     def get_product_type(self, obj):
#         return obj.product.slug.replace("-", "_").lower()

#     def get_schema(self, obj):
#         product_type = self.get_product_type(obj)
#         return DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})

#     def to_representation(self, instance):
#         request = self.context.get("request")
#         data = super().to_representation(instance)

#         # Parse requirements JSON
#         requirements_data = instance.requirements or {}
#         if isinstance(requirements_data, str):
#             try:
#                 requirements_data = json.loads(requirements_data)
#             except json.JSONDecodeError:
#                 requirements_data = {}

#         # Merge ALL submitted data
#         data["data"] = requirements_data

#         # Resolve file URLs dynamically
#         schema = data.get("schema", {})
#         for field in schema.get("file_fields", []):
#             file_obj = getattr(instance, field, None)
#             data["data"][field] = (
#                 request.build_absolute_uri(file_obj.url)
#                 if file_obj and request else None
#             )

#         return data


DIGITAL_CATEGORY_MAP = {
    "business name": "business_name",
    "pos": "moniepoint_pos",
    "ngo": "ngo",
    "cac": "cac_ltd",
}

# Map logical form fields to actual model fields
FIELD_MAP = {
    "bvn": "bvn",
    "dob": "dob",
    "phone": "phone_business",
    "email": "functional_email",
    "first_name": "firstname",
    "last_name": "surname",
    "title": "title",
    "gender": "gender",
    "marital_status": "marital_status",
    "religion": "religion",
    "nationality": "nationality",
    "state_of_origin": "state_of_origin",
    "lga_of_origin": "lga_of_origin",
    "employment_status": "employment_status",
    "address": "home_address_pos",
    "home_address": "home_address_pos",
    "country": "country",
    "city": "city",
    "state": "state",
    "lga": "lga",
    "next_of_kin_name": "next_of_kin_name",
    "next_of_kin_phone": "next_of_kin_phone",
    "next_of_kin_relationship": "next_of_kin_relationship",
    "next_of_kin_dob": "next_of_kin_dob",
    "next_of_kin_email": "next_of_kin_email",
    "next_of_kin_address": "next_of_kin_address",
    "next_of_kin_country": "next_of_kin_country",
    "next_of_kin_city": "next_of_kin_city",
    "next_of_kin_lga": "next_of_kin_lga",
    "business_name": "business_name_pos",
    "nature_of_business": "nature_of_business_pos",
}

class DigitalOrderSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source="product.title", read_only=True)
    product_type = serializers.SerializerMethodField()
    schema = serializers.SerializerMethodField()
    data = serializers.SerializerMethodField()

    class Meta:
        model = DigitalOrder
        fields = [
            "id",
            "product",
            "product_title",
            "product_type",
            "schema",
            "data",
            "full_name",
            "email",
            "phone",
            "username",
            "status",
            "created_at",
            "confirmed_at",
            "payment_proof",
        ]

    def get_product_type(self, obj):
        category = obj.product.digital_category
        return DIGITAL_CATEGORY_MAP.get(category)

    def get_schema(self, obj):
        product_type = self.get_product_type(obj)
        return DIGITAL_PRODUCT_REQUIREMENTS.get(product_type, {})

    def get_data(self, obj):
        """
        Safely build a dictionary of all submitted information for a digital order,
        using model fields directly. Handles text, date, and file fields.
        """
        request = self.context.get("request")
        schema = self.get_schema(obj)
        data = {}

        # ---------------- Text Fields ----------------
        for field in schema.get("text_fields", []):
            value = getattr(obj, field, None)
            if value is None or value == "":
                data[field] = "-"
            elif hasattr(value, "strftime"):  # date fields
                data[field] = value.strftime("%Y-%m-%d")
            else:
                data[field] = str(value)

        # ---------------- File Fields ----------------
        for field in schema.get("file_fields", []):
            file_obj = getattr(obj, field, None)
            if file_obj and getattr(file_obj, "name", None):
                try:
                    data[field] = request.build_absolute_uri(file_obj.url) if request else file_obj.url
                except ValueError:  # no file associated
                    data[field] = None
            else:
                data[field] = None

        # ---------------- Top-level fields ----------------
        top_fields = ["full_name", "email", "phone", "username", "payment_proof"]
        for field in top_fields:
            if field not in data:
                value = getattr(obj, field, None)
                if value is None or value == "":
                    data[field] = "-"
                elif hasattr(value, "url"):
                    try:
                        data[field] = request.build_absolute_uri(value.url) if request else value.url
                    except ValueError:
                        data[field] = None
                elif hasattr(value, "strftime"):
                    data[field] = value.strftime("%Y-%m-%d")
                else:
                    data[field] = str(value)

        return data






class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'provider', 'provider_id', 'amount', 'confirmed', 'created_at']

class EmailOTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailOTP
        fields = ['email', 'otp', 'verified', 'created_at']
        read_only_fields = ['verified', 'created_at']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductDemoVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'demo_video']





class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', '')
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data['username'],
            password=data['password']
        )

        if not user:
            raise serializers.ValidationError("Invalid username or password")

        data['user'] = user
        return data



class GoogleAuthSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, data):
        try:
            idinfo = id_token.verify_oauth2_token(
                data['token'],
                requests.Request(),
                "<YOUR_GOOGLE_CLIENT_ID>"
            )
        except Exception:
            raise serializers.ValidationError("Invalid Google token")

        email = idinfo['email']
        name = idinfo.get('name', '')
        
        user, created = User.objects.get_or_create(
            email=email,
            defaults={'username': email.split("@")[0], 'first_name': name}
        )

        data['user'] = user
        return data