from django.urls import path
from .views import Game, Room


urlpatterns = [
    path('game/', Game),
    path('game/room/', Room)
]