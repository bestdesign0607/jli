from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User


User = get_user_model()

class Product(models.Model):
    PRODUCT_TYPE_CHOICES = (
        ("physical", "Physical"),
        ("digital", "Digital"),
    )

    DIGITAL_CATEGORY_CHOICES = (
        ("ebook", "Ebook"),
        ("ecourse", "Ecourse"),
        ("cac", "CAC"),
        ("pos", "POS"),
        ("ngo", "NGO"),
        ("business name", "Business Name"),
    )

    product_type = models.CharField(
        max_length=20,
        choices=PRODUCT_TYPE_CHOICES,
        default="physical"
    )

    digital_category = models.CharField(
        max_length=20,
        choices=DIGITAL_CATEGORY_CHOICES,
        null=True,
        blank=True
    )
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock = models.PositiveIntegerField(default=0)
    is_new = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    badge_text = models.CharField(max_length=50, blank=True, null=True)
    tags = models.JSONField(default=list, blank=True)
    flash_sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_flash_sale = models.BooleanField(default=False)
    is_qualifying = models.BooleanField(default=False)

    # LINK TO CATEGORY
    category = models.ForeignKey('Category', related_name='products', on_delete=models.SET_NULL, null=True, blank=True)

    # ⭐ New fields for React Card
    reviews_count = models.PositiveIntegerField(default=0)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    sold = models.PositiveIntegerField(default=0)
    demo_video = models.FileField(upload_to='demo_videos/', null=True, blank=True)  # NEW FIELD

    created_at = models.DateTimeField(auto_now_add=True)
    colors = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title







class DigitalOrder(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("rejected", "Rejected"),
        ("processing", "Processing"),
        ("shipped", "Shipped"),
        ("delivered", "Delivered"),
        ('paid', 'Paid'),
        ('unpaid', 'Unpaid'),
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        limit_choices_to={"product_type": "digital"}
    )

    # Top-level fields
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    username = models.CharField(max_length=150, blank=True)

    # ================== Business Name Fields ==================
    surname = models.CharField(max_length=100, blank=True)
    firstname = models.CharField(max_length=100, blank=True)
    othername = models.CharField(max_length=100, blank=True)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, blank=True)
    phone_business = models.CharField(max_length=50, blank=True)
    functional_email = models.EmailField(blank=True)

    # Residential address
    home_state = models.CharField(max_length=50, blank=True)
    home_lga = models.CharField(max_length=50, blank=True)
    home_city = models.CharField(max_length=50, blank=True)
    home_house = models.CharField(max_length=100, blank=True)
    home_street = models.CharField(max_length=100, blank=True)
    home_address_description = models.TextField(blank=True)

    # Business address
    business_state = models.CharField(max_length=50, blank=True)
    business_lga = models.CharField(max_length=50, blank=True)
    business_city = models.CharField(max_length=50, blank=True)
    business_house = models.CharField(max_length=100, blank=True)
    business_street = models.CharField(max_length=100, blank=True)
    business_address_description = models.TextField(blank=True)

    nature_of_business = models.CharField(max_length=100, blank=True)
    business_name1 = models.CharField(max_length=100, blank=True)
    business_name2 = models.CharField(max_length=100, blank=True)

    # ================== NGO Fields ==================
    chairman_name = models.CharField(max_length=100, blank=True)
    chairman_nin = models.CharField(max_length=50, blank=True)
    chairman_phone = models.CharField(max_length=50, blank=True)
    chairman_email = models.EmailField(blank=True)
    chairman_address = models.TextField(blank=True)
    chairman_dob = models.DateField(null=True, blank=True)

    secretary_name = models.CharField(max_length=100, blank=True)
    secretary_nin = models.CharField(max_length=50, blank=True)
    secretary_phone = models.CharField(max_length=50, blank=True)
    secretary_email = models.EmailField(blank=True)
    secretary_address = models.TextField(blank=True)
    secretary_dob = models.DateField(null=True, blank=True)

    trustee1_name = models.CharField(max_length=100, blank=True)
    trustee1_nin = models.CharField(max_length=50, blank=True)
    trustee1_phone = models.CharField(max_length=50, blank=True)
    trustee1_email = models.EmailField(blank=True)
    trustee1_address = models.TextField(blank=True)
    trustee1_dob = models.DateField(null=True, blank=True)

    trustee2_name = models.CharField(max_length=100, blank=True)
    trustee2_nin = models.CharField(max_length=50, blank=True)
    trustee2_phone = models.CharField(max_length=50, blank=True)
    trustee2_email = models.EmailField(blank=True)
    trustee2_address = models.TextField(blank=True)
    trustee2_dob = models.DateField(null=True, blank=True)

    trustees_tenure = models.CharField(max_length=100, blank=True)
    ngo_address = models.TextField(blank=True)
    ngo_phone = models.CharField(max_length=50, blank=True)
    ngo_email = models.EmailField(blank=True)
    proposed_ngo_name1 = models.CharField(max_length=100, blank=True)
    proposed_ngo_name2 = models.CharField(max_length=100, blank=True)
    proposed_ngo_name3 = models.CharField(max_length=100, blank=True)

    # ================== Moniepoint POS Fields ==================
    bvn = models.CharField(max_length=50, blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=20, blank=True)
    marital_status = models.CharField(max_length=50, blank=True)
    religion = models.CharField(max_length=50, blank=True)
    nationality = models.CharField(max_length=50, blank=True)
    state_of_origin = models.CharField(max_length=50, blank=True)
    lga_of_origin = models.CharField(max_length=50, blank=True)
    employment_status = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    home_address_pos = models.TextField(blank=True)
    country = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=50, blank=True)
    lga = models.CharField(max_length=50, blank=True)
    next_of_kin_name = models.CharField(max_length=100, blank=True)
    next_of_kin_phone = models.CharField(max_length=50, blank=True)
    next_of_kin_relationship = models.CharField(max_length=50, blank=True)
    next_of_kin_dob = models.DateField(null=True, blank=True)
    next_of_kin_email = models.EmailField(blank=True)
    next_of_kin_address = models.TextField(blank=True)
    next_of_kin_country = models.CharField(max_length=50, blank=True)
    next_of_kin_city = models.CharField(max_length=50, blank=True)
    next_of_kin_lga = models.CharField(max_length=50, blank=True)
    business_name_pos = models.CharField(max_length=100, blank=True)
    nature_of_business_pos = models.CharField(max_length=100, blank=True)

    # ================== CAC Ltd Fields ==================
    company_state = models.CharField(max_length=50, blank=True)
    company_lga = models.CharField(max_length=50, blank=True)
    company_city = models.CharField(max_length=50, blank=True)
    company_house = models.CharField(max_length=100, blank=True)
    company_street = models.CharField(max_length=100, blank=True)
    company_email = models.EmailField(blank=True)
    object1 = models.CharField(max_length=200, blank=True)
    object2 = models.CharField(max_length=200, blank=True)
    object3 = models.CharField(max_length=200, blank=True)
    object4 = models.CharField(max_length=200, blank=True)
    witness_surname = models.CharField(max_length=100, blank=True)
    witness_firstname = models.CharField(max_length=100, blank=True)
    witness_othername = models.CharField(max_length=100, blank=True)
    witness_dob = models.DateField(null=True, blank=True)
    witness_gender = models.CharField(max_length=20, blank=True)
    witness_phone = models.CharField(max_length=50, blank=True)
    witness_state = models.CharField(max_length=50, blank=True)
    witness_lga = models.CharField(max_length=50, blank=True)
    witness_city = models.CharField(max_length=50, blank=True)
    witness_house = models.CharField(max_length=100, blank=True)
    witness_street = models.CharField(max_length=100, blank=True)

    # ================== FILE FIELDS ==================
    # Business Name
    id_card = models.FileField(upload_to="digital_orders/business_name/", blank=True, null=True)
    passport = models.FileField(upload_to="digital_orders/business_name/", blank=True, null=True)
    signature = models.FileField(upload_to="digital_orders/business_name/", blank=True, null=True)

    # NGO
    chairman_signature = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    chairman_photo = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    chairman_nin_slip = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    secretary_signature = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    secretary_photo = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    secretary_nin_slip = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    trustee1_signature = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    trustee1_photo = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    trustee1_nin_slip = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    trustee2_signature = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    trustee2_photo = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)
    trustee2_nin_slip = models.FileField(upload_to="digital_orders/ngo/", blank=True, null=True)

    # Moniepoint POS
    passport_photo = models.FileField(upload_to="digital_orders/pos/", blank=True, null=True)
    utility_bill = models.FileField(upload_to="digital_orders/pos/", blank=True, null=True)
    identification_file = models.FileField(upload_to="digital_orders/pos/", blank=True, null=True)
    signature_file = models.FileField(upload_to="digital_orders/pos/", blank=True, null=True)

    # CAC Ltd
    signature_director = models.FileField(upload_to="digital_orders/cac/", blank=True, null=True)
    signature_witness = models.FileField(upload_to="digital_orders/cac/", blank=True, null=True)
    nin = models.FileField(upload_to="digital_orders/cac/", blank=True, null=True)

    # Payment proof
    payment_proof = models.ImageField(upload_to="payment_proofs/digital/", blank=True, null=True)

    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.product.title} - {self.status}"







# class Review(models.Model):
#     product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
#     user_name = models.CharField(max_length=255)
#     text = models.TextField()
#     rating = models.DecimalField(max_digits=2, decimal_places=1)
#     date = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ['-date']  # newest first

#     def __str__(self):
#         return f"{self.user_name} - {self.rating}"

class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE, null=True, blank=True)
    user_name = models.CharField(max_length=255)
    text = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.user_name} - {self.rating}"

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to="category_images/", null=True, blank=True)  # ⭐ ADD THIS

    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    COLOR_OPTIONS = [
        ("black", "Black"),
        ("golden", "Golden"),
        ("silver", "Silver"),
    ]

    product = models.ForeignKey(Product, related_name="variants", on_delete=models.CASCADE)
    color = models.CharField(max_length=50, choices=COLOR_OPTIONS)
    strap_type = models.CharField(max_length=100, default="Rubber")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.product.title} - {self.color}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')
    color = models.CharField(max_length=50, blank=True, null=True) 
    alt = models.CharField(max_length=255, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

# class Order(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('paid', 'Paid'),
#         ('shipped', 'Shipped'),
#         ('delivered', 'Delivered'),
#         ('cancelled', 'Cancelled'),
#     ]
#     user = models.ForeignKey(User, related_name='orders', on_delete=models.SET_NULL, null=True, blank=True)
#     email = models.EmailField()
#     total = models.DecimalField(max_digits=10, decimal_places=2)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     # ⭐ NEW ⭐
#     shipping_fullname = models.CharField(max_length=255, null=True, blank=True, default='Enter Name')
#     shipping_phone = models.CharField(max_length=50, null=True, blank=True, default='Enter Phone Number')
#     shipping_street = models.CharField(max_length=255, null=True, blank=True, default='Enter Street Address')
#     shipping_city = models.CharField(max_length=255, null=True, blank=True, default='Enter City')
#     shipping_state = models.CharField(max_length=255, null=True, blank=True, default='Enter State')
#     shipping_country = models.CharField(max_length=255, null=True, blank=True, default='Enter Country')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)


# class Order(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('paid', 'Paid'),
#         ('shipped', 'Shipped'),
#         ('delivered', 'Delivered'),
#         ('cancelled', 'Cancelled'),
#     ]

#     user = models.ForeignKey(User, related_name='orders',
#                              on_delete=models.SET_NULL, null=True, blank=True)

#     email = models.EmailField()
#     total = models.DecimalField(max_digits=10, decimal_places=2)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

#     # Remove default placeholders ❗❗
#     shipping_fullname = models.CharField(max_length=255, null=True, blank=True)
#     shipping_phone = models.CharField(max_length=50, null=True, blank=True)
#     shipping_street = models.CharField(max_length=255, null=True, blank=True)
#     shipping_city = models.CharField(max_length=255, null=True, blank=True)
#     shipping_state = models.CharField(max_length=255, null=True, blank=True)
#     shipping_country = models.CharField(max_length=255, null=True, blank=True)

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('shipped', 'Shipped'),
        ('processing', 'Processing'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('paid', 'Paid'),
        ('unpaid', 'Unpaid'),
    ]

    user = models.ForeignKey(
        User,
        related_name='orders',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    email = models.EmailField()
    total = models.DecimalField(max_digits=10, decimal_places=2)

    # ✅ NETWORK CORE
    profit = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_qualifying = models.BooleanField(default=False)
    network_processed = models.BooleanField(default=False)
    referrer_code = models.CharField(max_length=32, null=True, blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    # SHIPPING
    shipping_fullname = models.CharField(max_length=255, null=True, blank=True)
    shipping_phone = models.CharField(max_length=50, null=True, blank=True)
    shipping_street = models.CharField(max_length=255, null=True, blank=True)
    shipping_city = models.CharField(max_length=255, null=True, blank=True)
    shipping_state = models.CharField(max_length=255, null=True, blank=True)
    shipping_country = models.CharField(max_length=255, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class EmailOTP(models.Model):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)  # <-- ADD THIS

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=10)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.PROTECT)  # string reference avoids circular import
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    provider = models.CharField(max_length=50)  # e.g., stripe, bank_transfer
    provider_id = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    confirmed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Shipment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    tracking_code = models.CharField(max_length=255, blank=True, null=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=50, blank=True)
    street = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    is_ambassador = models.BooleanField(default=False)  # ← add this

    def __str__(self):
        return self.user.username