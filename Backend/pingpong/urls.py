from django.urls import path
from . import views

urlpatterns = [
    path('game/pingpong/offline/<int:game_id>/', views.match_offline),
    path('game/pingpong/<int:game_id>/', views.players),
    path('game/pingpong/offline/craete', views.createLocalGame),
]
