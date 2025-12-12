# from django.contrib import admin
# from .models import Category, EmailOTP, Product, ProductImage, Order, OrderItem, Payment, Shipment, UserProfile
# from .models import UserProfile


# class ProductImageInline(admin.TabularInline):
#     model = ProductImage
#     extra = 0


# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     inlines = [ProductImageInline]
#     prepopulated_fields = {'slug': ('title',)}


# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     list_display = ('id', 'email', 'total', 'status', 'created_at')
#     list_filter = ('status', 'created_at', 'shipping_country')
#     readonly_fields = ('created_at', 'updated_at')
#     search_fields = ('email', 'id', 'fullname')

# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     prepopulated_fields = {"slug": ("name",)}
#     list_display = ("name", "slug")

# class UserProfileAdmin(admin.ModelAdmin):
#     list_display = ("user", "phone", "address")  # these must exist on the model
#     search_fields = ("user__username", "user__email", "phone", "address")


# admin.site.register(Payment)
# admin.site.register(Shipment)
# admin.site.register(EmailOTP)
# admin.site.register(UserProfile, UserProfileAdmin)











from django.contrib import admin
from .models import (
    Category,
    EmailOTP,
    Product,
    ProductImage,
    Order,
    OrderItem,
    Payment,
    Shipment,
    UserProfile
)

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'total', 'status', 'created_at')
    list_filter = ('status', 'created_at', 'shipping_country')
    readonly_fields = ('created_at', 'updated_at')
    search_fields = ('email', 'id', 'shipping_fullname')  # use correct field name

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = ("name", "slug")

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "phone", "get_address")
    search_fields = ("user__username", "user__email", "phone", "street", "city", "state", "country")

    def get_address(self, obj):
        # Combine the address fields into one string
        parts = [obj.street, obj.city, obj.state, obj.country]
        # Only include non-empty parts
        return ", ".join([part for part in parts if part])
    
    get_address.short_description = "Address"

# Register remaining models normally
admin.site.register(Payment)
admin.site.register(Shipment)
admin.site.register(EmailOTP)
