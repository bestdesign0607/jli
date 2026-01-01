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
from django.utils.html import format_html
from django.utils.html import format_html, format_html_join


from .models import (
    Category,
    DigitalOrder,
    
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




@admin.register(DigitalOrder)
class DigitalOrderAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "product",
        "full_name",
        "email",
        "phone",
        "username",
        "status",
        "created_at",
        "confirmed_at",
    ]

    readonly_fields = ["display_files", "created_at", "confirmed_at"]

    # Dynamically include all text fields in fieldsets
    def get_fieldsets(self, request, obj=None):
        text_fields = []
        file_fields = ["id_card", "signature_director", "signature_witness", "nin", "payment_proof"]

        # Automatically collect all fields that are not file fields or system fields
        for field in self.model._meta.get_fields():
            if field.name not in file_fields + ["id", "product", "status", "created_at", "confirmed_at"]:
                text_fields.append(field.name)

        return (
            (None, {
                "fields": ("product", "status", *text_fields, "display_files", "created_at", "confirmed_at")
            }),
        )

    def display_files(self, obj):
        """Show file fields as clickable links or image previews."""
        file_fields = [
            ("id_card", "ID Card"),
            ("signature_director", "Director Signature"),
            ("signature_witness", "Witness Signature"),
            ("nin", "NIN"),
            ("payment_proof", "Payment Proof"),
        ]

        files = []
        for field_name, label in file_fields:
            file_obj = getattr(obj, field_name, None)
            if file_obj:
                if hasattr(file_obj, "url") and str(file_obj.url).lower().endswith((".jpg", ".jpeg", ".png", ".gif", ".webp")):
                    files.append((
                        file_obj.url,
                        format_html(
                            '{}<br><img src="{}" style="max-height:120px;max-width:200px;border:1px solid #ccc;margin-top:5px;" />',
                            label,
                            file_obj.url
                        )
                    ))
                else:
                    files.append((file_obj.url, format_html('<a href="{}" target="_blank">{}</a>', file_obj.url, label)))

        if not files:
            return "-"
        return format_html_join("<br>", "{}", ((f[1],) for f in files))

    display_files.short_description = "Uploaded Files"

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
