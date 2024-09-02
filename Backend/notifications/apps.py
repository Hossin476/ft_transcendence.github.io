from django.apps import AppConfig
from django.core.cache import cache

class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notifications'

    def ready(self):
        cache.clear()
