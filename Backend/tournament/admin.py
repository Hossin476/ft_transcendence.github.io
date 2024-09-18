from django.contrib import admin

# Register your models here.
from .models import Tournament, TournamentLocal, PlayerLocal, InviteTournament

admin.site.register(Tournament)
admin.site.register(TournamentLocal)
admin.site.register(PlayerLocal)
admin.site.register(InviteTournament)
