from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


from . import models
# Register your models here.

@admin.register(models.Message)
class MessageAdmin(admin.ModelAdmin):
     list_display = ('id','__str__')

