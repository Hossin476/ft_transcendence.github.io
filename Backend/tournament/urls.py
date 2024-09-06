from django.urls import path
from .views import TournamentView
urlpatterns = [
    path('<int:tourId>',TournamentView.as_view()),
    path('create',TournamentView.as_view())
]
