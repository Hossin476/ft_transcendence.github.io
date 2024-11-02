from django.urls import path
from django.urls.conf import include
from . import views
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('user_info/', views.get_user_info),
    path('all_matches/', views.get_all_matches),
    path('chart_data/', views.get_monthly_data),
    path('intra/login/', views.intra_login),
    path('oauth2/intra/', views.intra_redirect),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-email/', EmailVerificationView.as_view(), name='verify-email'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='granted'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('password-reset/', UserPasswordResetView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmationView.as_view(), name='password-reset-confirm'),
    path('set-new-password/', SetNewPasswordView.as_view(), name='set-new-password'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]

