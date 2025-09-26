from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, CustomTokenObtainPairView,DebugLoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),  # 👈 updated
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('debug-login/', DebugLoginView.as_view()),

]
