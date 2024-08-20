from django.urls import re_path
from .consumers import TicTacToeConsumer
from notifications.consumers import NotificationConsumer
from .local_game.consumers import TicTacToeLocalConsumer


websocket_urlpatterns = [
    re_path(r'ws/game/room/(?P<room_name>\w+)/$', TicTacToeConsumer.as_asgi()),
    re_path(r'ws/game/local/room/(?P<room_name>\w+)/$', TicTacToeLocalConsumer.as_asgi()),
    re_path(r'ws/notifications/$', NotificationConsumer.as_asgi())
]