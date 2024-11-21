from django.urls import path
from . import views

urlpatterns = [
    path('online/',views.onlineFriends),
    path("", views.NotificationView.as_view()),
    path('onlinegame/',views.onlineGame),
    path('tourinvites/<int:tour_id>', views.TournamentInvites),
    path('leaderboard/', views.get_Leaderboard),
    path('pingpong_unfinished_match/', views.matchesNotFinishPingPong),
    path('tictactoe_unfinished_match/', views.matchesNotFinishTictactoe),
    path('friends/', views.get_full_friendships),
    path('check_friendship/<int:user_id>/', views.check_friendship),
    path('check_blocked/<int:user_id>/', views.check_blocked),
]
