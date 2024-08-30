from django.urls import path
from . import views


urlpatterns = [
    path('conversation',views.conversations),
    path('messages',views.messages),
    path('users',views.allUsers),
]
