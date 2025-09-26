from django.db import models

class SiteImage(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='site_images/')
    alt = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name

class NavbarItem(models.Model):
    title = models.CharField(max_length=200)
    url = models.CharField(max_length=500, blank=True)
    order = models.IntegerField(default=0)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)
    icon = models.ImageField(upload_to='navbar_icons/', null=True, blank=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class FooterSection(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(help_text='HTML allowed')

    def __str__(self):
        return self.title

from django.db import models

class NavCategory(models.Model):  # Instead of 'NavItem' (to avoid conflict)
    name = models.CharField(max_length=100)
    has_dropdown = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class NavSubCategory(models.Model):
    parent = models.ForeignKey(NavCategory, related_name="subcategories", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=200, blank=True, null=True)  # URL path

    def __str__(self):
        return f"{self.parent.name} → {self.name}"



from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Banner(models.Model):
    category = models.ForeignKey(Category, related_name="banners", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="banners/")
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.category.name} - {self.title}"


class Product(models.Model):
    category = models.ForeignKey(Category, related_name="products", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="products/")
    weight = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    rating = models.FloatField(default=0.0)
    reviews = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    

from django.db import models

# 1. Banner Model (renamed to PromoBanner)
class PromoBanner(models.Model):
    image = models.ImageField(upload_to="banners/")
    alt_text = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.alt_text or f"Banner {self.id}"

# 2. Shop by Pet
class Pet(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="pets/")

    def __str__(self):
        return self.name

# 3. Products (only image will be used)
class ProductImage(models.Model):
    image = models.ImageField(upload_to="products/")
    alt_text = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.alt_text or f"Product {self.id}"

# core/models.py
from django.db import models

class Banner1(models.Model):
    title = models.CharField(max_length=100, blank=True)  # optional
    image = models.ImageField(upload_to="banners/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"Banner {self.id}"


class PromoImage(models.Model):
    name = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to="promos/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name or f"Promo {self.id}"


from django.db import models

class Banner2(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="banners/")

    def __str__(self):
        return self.title


from django.db import models


class Customer(models.Model):
    email = models.EmailField()
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"


class Order(models.Model):
    PAYMENT_CHOICES = [
        ("online", "Online Payment"),
        ("cod", "Cash on Delivery"),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer.email}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product_id = models.IntegerField()  # can later link to actual Product model
    name = models.CharField(max_length=255)
    size = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} x {self.quantity}"
