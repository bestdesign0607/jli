from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class Product(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
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


class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255)
    text = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']  # newest first

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
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
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

    def __str__(self):
        return self.user.username