from django.urls import path
from .views import Game, Room, get_is_ingame


urlpatterns = [
    path('game/', Game),
    path('game/room/', Room),
    path('is_ingame/', get_is_ingame)
]