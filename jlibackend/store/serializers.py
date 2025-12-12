from rest_framework import serializers
from .models import Category, Product, ProductImage, Order, OrderItem, Payment, EmailOTP, ProductVariant, Review
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile

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

    def update(self, instance, validated_data):
        # Update User fields
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.username = validated_data.get("username", instance.username)
        instance.save()

        # Update profile fields
        profile, _ = UserProfile.objects.get_or_create(user=instance)
        profile_data = validated_data.get("profile", {})

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
    class Meta:
        model = Review
        fields = ['id', 'user_name', 'text', 'rating', 'date']

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

class ProductSerializer(serializers.ModelSerializer):
    # All images for the product
    images = ProductImageSerializer(many=True, read_only=True)

    # Main gallery images (exclude variant images if needed)
    main_images = serializers.SerializerMethodField()

    # Variant details
    variants = ProductVariantSerializer(many=True, read_only=True)

    # Reviews
    reviews = ReviewSerializer(many=True, read_only=True)

    # Category name
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "title", "slug", "description", "price", "old_price",
            "flash_sale_price", "is_flash_sale",
            "is_new", "is_featured", "badge_text", "tags",
            "average_rating", "reviews_count", "sold",
            "colors", "images", "main_images", "variants",
            "demo_video", "category", "category_name", "reviews", "created_at"
        ]

    def get_main_images(self, obj):
        return ProductImageSerializer(obj.images.filter(color__isnull=True), many=True).data

    def get_variant_images(self, obj):
        return ProductImageSerializer(obj.images.filter(color__isnull=False), many=True).data
    
    
class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'unit_price']

class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id',
            'status',
            'total',
            'created_at',
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'email', 'total', 'status',
            'shipping_fullname','is_qualifying', 'shipping_phone',
            'shipping_street', 'shipping_city',
            'shipping_state', 'shipping_country',
            'items'
        ]
        read_only_fields = ['status', 'id']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item in items_data:
            OrderItem.objects.create(order=order, **item)

        return order



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