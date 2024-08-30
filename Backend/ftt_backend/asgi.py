"""
ASGI config for ftt_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from tictactoe.middleware import JWTAuthMiddleware
from django.core.asgi import get_asgi_application
from .routing import websocket_urlpatterns

import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ftt_backend.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': JWTAuthMiddleware(
            URLRouter(websocket_urlpatterns)
    ),
})