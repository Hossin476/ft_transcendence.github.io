from django.contrib import admin

# Register your models here.
from .models import GameOnline, GameOffline

admin.site.register(GameOnline)
admin.site.register(GameOffline)