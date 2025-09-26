from rest_framework import viewsets
from .models import SiteImage, NavbarItem, FooterSection
from .serializers import SiteImageSerializer, NavbarItemSerializer, FooterSectionSerializer

class SiteImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteImage.objects.all()
    serializer_class = SiteImageSerializer

class NavbarItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NavbarItem.objects.filter(parent__isnull=True).order_by('order')
    serializer_class = NavbarItemSerializer

class FooterSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FooterSection.objects.all()
    serializer_class = FooterSectionSerializer

from rest_framework import generics
from .models import NavCategory
from .serializers import NavCategorySerializer

class NavbarView(generics.ListAPIView):
    queryset = NavCategory.objects.prefetch_related("subcategories").all()
    serializer_class = NavCategorySerializer


from rest_framework import generics
from .models import Category
from .serializers import CategoryDetailSerializer

class CategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer

from rest_framework import viewsets
from .models import PromoBanner, Pet, ProductImage
from .serializers import PromoBannerSerializer, PetSerializer, ProductImageSerializer

class PromoBannerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PromoBanner.objects.all()
    serializer_class = PromoBannerSerializer

class PetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class ProductImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer


# core/views.py
from rest_framework import viewsets
from .models import Banner1, PromoImage
from .serializers import Banner1Serializer, PromoImageSerializer

class Banner1ViewSet(viewsets.ModelViewSet):
    queryset = Banner1.objects.all()
    serializer_class = Banner1Serializer

class PromoImageViewSet(viewsets.ModelViewSet):
    queryset = PromoImage.objects.all()
    serializer_class = PromoImageSerializer


from rest_framework import viewsets
from .models import Banner2
from .serializers import Banner2Serializer

class Banner2ViewSet(viewsets.ModelViewSet):
    queryset = Banner2.objects.all()
    serializer_class = Banner2Serializer



from rest_framework import generics
from .models import Order
from .serializers import OrderSerializer


class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
