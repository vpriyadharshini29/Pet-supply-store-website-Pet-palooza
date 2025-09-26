from django.contrib import admin
from .models import SiteImage, NavbarItem, FooterSection

@admin.register(SiteImage)
class SiteImageAdmin(admin.ModelAdmin):
    list_display = ('name','image')

@admin.register(NavbarItem)
class NavbarItemAdmin(admin.ModelAdmin):
    list_display = ('title','url','order','parent')
    list_editable = ('order',)

@admin.register(FooterSection)
class FooterSectionAdmin(admin.ModelAdmin):
    list_display = ('title',)
from django.contrib import admin
from .models import NavCategory, NavSubCategory

class NavSubCategoryInline(admin.TabularInline):  # Inline editor
    model = NavSubCategory
    extra = 1  # one empty row for adding new subcategories

@admin.register(NavCategory)
class NavCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "has_dropdown")
    search_fields = ("name",)
    inlines = [NavSubCategoryInline]

@admin.register(NavSubCategory)
class NavSubCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "parent", "link")
    search_fields = ("name", "parent__name")
    list_filter = ("parent",)



from django.contrib import admin
from .models import Category, Product, Banner

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "rating", "reviews")
    list_filter = ("category",)
    search_fields = ("name",)

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ("title", "category")
    list_filter = ("category",)



from django.contrib import admin
from .models import PromoBanner, Pet, ProductImage


@admin.register(PromoBanner)
class PromoBannerAdmin(admin.ModelAdmin):
    list_display = ("id", "alt_text", "image")
    search_fields = ("alt_text",)


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "image")
    search_fields = ("name",)


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "alt_text", "image")
    search_fields = ("alt_text",)


# core/admin.py
from django.contrib import admin
from .models import Banner1, PromoImage

@admin.register(Banner1)
class Banner1Admin(admin.ModelAdmin):
    list_display = ("id", "title", "image", "uploaded_at")
    ordering = ("-uploaded_at",)

@admin.register(PromoImage)
class PromoImageAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "image", "uploaded_at")
    ordering = ("-uploaded_at",)


from django.contrib import admin
from .models import Banner2

@admin.register(Banner2)
class Banner2Admin(admin.ModelAdmin):
    list_display = ("id", "title", "image")



from django.contrib import admin
from .models import Order, OrderItem, Customer


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "customer", "total", "payment_method", "created_at"]
    inlines = [OrderItemInline]


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "email", "phone"]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["order", "name", "quantity", "price"]
