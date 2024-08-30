from django.urls import path
from . import views

urlpatterns = [
    path("", views.NotifitationView.as_view())
]
