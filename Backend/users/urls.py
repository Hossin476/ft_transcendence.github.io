from django.urls import path
from django.urls.conf import include
from rest_framework_nested import routers
from . import views

urlpatterns =[
    path('user_info/', views.get_user_info),
    path('all_matches/', views.get_all_matches),
    path('chart_data/', views.get_monthly_data),
]

