from django.urls import path
from . import views

urlpatterns = [
    path('messages',views.messages.as_view()),
    path('conversation',views.conversations.as_view()),
    path('users',views.allUsers.as_view()),
]
