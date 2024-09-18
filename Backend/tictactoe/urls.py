from django.urls import path
from .views import get_user_data, get_winner_data, offline_winner_data, offline_user_data, create_local_game


urlpatterns = [
    path('user_data/<game_id>/', get_user_data),
    path('winner_data/<game_id>/', get_winner_data),
    path('offline_winner_data/<game_id>/', offline_winner_data),
    path('offline_user_data/<game_id>/', offline_user_data),
    path('game/tictactoe/offline/create_local_game', create_local_game),
]