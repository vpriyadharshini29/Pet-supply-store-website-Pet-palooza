from django.urls import path, include
from rest_framework import routers
from .views import SiteImageViewSet,OrderCreateView, Banner2ViewSet,NavbarItemViewSet,Banner1ViewSet,PromoImageViewSet, FooterSectionViewSet,NavbarView,CategoryDetailView,PromoBannerViewSet,PetViewSet,ProductImageViewSet

router = routers.DefaultRouter()
router.register('site-images', SiteImageViewSet, basename='siteimage')
router.register('navbar-items', NavbarItemViewSet, basename='navbaritem')
router.register('footer-sections', FooterSectionViewSet, basename='footersection')
router.register("banners", PromoBannerViewSet, basename="banners")
router.register("pets", PetViewSet, basename="pets")
router.register("products", ProductImageViewSet, basename="products")
router.register("banners1", Banner1ViewSet)
router.register("promos", PromoImageViewSet)
router.register("banners2", Banner2ViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path("navbar/", NavbarView.as_view(), name="navbar"),
    path("category/<int:pk>/", CategoryDetailView.as_view(), name="category-detail"),
    path("orders/", OrderCreateView.as_view(), name="order-create"),

]
