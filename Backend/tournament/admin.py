from django.contrib import admin

# Register your models here.
from .models import Tournament, TournamentLocal, PlayerLocal

admin.site.register(Tournament)
admin.site.register(TournamentLocal)
admin.site.register(PlayerLocal)
