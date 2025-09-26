from rest_framework import serializers
from .models import SiteImage, NavbarItem, FooterSection
class SiteImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteImage
        fields = ['id','name','image','alt']

class NavbarItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = NavbarItem
        fields = ['id','title','url','order','parent','icon','children']

    def get_children(self, obj):
        qs = obj.children.all().order_by('order')
        return NavbarItemSerializer(qs, many=True, context=self.context).data

class FooterSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterSection
        fields = ['id','title','content']

from .models import NavCategory, NavSubCategory

class NavSubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NavSubCategory
        fields = ["id", "name", "link"]

class NavCategorySerializer(serializers.ModelSerializer):
    subcategories = NavSubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = NavCategory
        fields = ["id", "name", "has_dropdown", "subcategories"]




from rest_framework import serializers
from .models import Category, Product, Banner

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = "__all__"

class CategoryDetailSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    banners = BannerSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "products", "banners"]

from rest_framework import serializers
from .models import PromoBanner, Pet, ProductImage

class PromoBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoBanner
        fields = ["id", "image", "alt_text"]

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ["id", "name", "image"]

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text"]


# core/serializers.py
from rest_framework import serializers
from .models import Banner1, PromoImage

class Banner1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Banner1
        fields = ["id", "title", "image"]

class PromoImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoImage
        fields = ["id", "name", "image"]


from rest_framework import serializers
from .models import Banner2

class Banner2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Banner2
        fields = ["id", "title", "image"]



from rest_framework import serializers
from .models import Order, OrderItem, Customer


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product_id", "name", "size", "price", "quantity"]


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "id", "email", "first_name", "last_name",
            "address", "city", "state", "pincode", "phone"
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, write_only=True)
    customer = CustomerSerializer()

    class Meta:
        model = Order
        fields = [
            "id", "customer", "subtotal", "shipping",
            "discount", "total", "payment_method",
            "created_at", "items"
        ]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        customer_data = validated_data.pop("customer")
        items_data = validated_data.pop("items")

        # either get existing customer or create new
        customer, _ = Customer.objects.get_or_create(
            email=customer_data["email"],
            defaults=customer_data
        )

        # update customer details if needed
        for attr, value in customer_data.items():
            setattr(customer, attr, value)
        customer.save()

        # create order
        order = Order.objects.create(customer=customer, **validated_data)

        # add order items
        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product_id=item.get("id", 0),
                name=item["name"],
                size=item.get("size"),
                price=item["price"],
                quantity=item["quantity"],
            )

        return order
