from django.urls import path
from .views import TournamentView,TournamentListView,TournamentInvitesView
urlpatterns = [
    path('<int:tourId>',TournamentView.as_view()),
    path('create',TournamentView.as_view()),
    path('tourlist/<int:userId>',TournamentListView.as_view()),
    path('invites/',TournamentInvitesView.as_view())
]