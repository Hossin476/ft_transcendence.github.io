from django.urls import path
from . import views

urlpatterns = [
    path('online/',views.onlineFriends),
    path("", views.NotifitationView.as_view()),
    path('onlinegame/',views.onlineGame),
    path('tourinvites/<int:tour_id>', views.TournamentInvites),
]
