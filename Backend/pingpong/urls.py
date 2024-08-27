from django.urls import path
from . import views

urlpatterns = [
    path('game/pingpong/<int:game_id>/', views.players)
]
