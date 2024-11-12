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
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('verify-email/', EmailVerificationView.as_view(), name='verify-email'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('password-reset/', UserPasswordResetView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmationView.as_view(), name='password-reset-confirm'),
    path('set-new-password/', SetNewPasswordView.as_view(), name='set-new-password'),
    path('setup-2fa/', views.Setup2FAView.as_view(), name='setup-2fa'),
    path('verify-2fa/', views.Verify2FAView.as_view(), name='verify-2fa'),


    path('profile/<int:user_id>/', views.get_profile),
    path('profile/match/<int:user_id>/', views.get_profile_match),
    path('profile/friends/<int:user_id>/', views.get_profile_friends),

]

