from django.urls import re_path
from notifications.consumers import NotificationConsumer
from pingpong.consumers import GameConsumer
from tictactoe.consumers import TicTacToeConsumer
from chat.consumers import ChatConsumer
websocket_urlpatterns = [
    # re_path(r"ws/game/(?P<game_id>\w+)/$", GameConsumer.as_asgi()),
    # re_path(r'ws/game/(?P<room_name>\w+)/$', TicTacToeConsumer.as_asgi()),
    re_path(r'ws/notifications/$', NotificationConsumer.as_asgi()),
    re_path(r"ws/chat/$",ChatConsumer.as_asgi())
    # re_path(r"ws/game/s/(?P<game_id>\w+)/$", LocalGameConsumer.as_asgi()),

]