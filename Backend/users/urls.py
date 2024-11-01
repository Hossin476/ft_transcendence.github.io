from django.urls import path
from django.urls.conf import include
from . import views

urlpatterns =[
    path('user_info/', views.get_user_info),
    path('all_matches/', views.get_all_matches),
    path('chart_data/', views.get_monthly_data),
    path('intra/login/', views.intra_login),
    path('oauth2/intra/', views.intra_redirect),
]

