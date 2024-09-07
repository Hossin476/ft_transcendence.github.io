from django.urls import path
from .views import get_user_data, get_winner_data


urlpatterns = [
    path('user_data/<game_id>/', get_user_data),
    path('winner_data/<game_id>/', get_winner_data)
]