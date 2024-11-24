



import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ftt_backend.settings')
django.setup()  # Initialize Django before importing other components

# Import Django/Channels components after django.setup()
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from tictactoe.middleware import JWTAuthMiddleware
from django.core.asgi import get_asgi_application
from .routing import websocket_urlpatterns

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': JWTAuthMiddleware(
            URLRouter(websocket_urlpatterns)
    ),
})