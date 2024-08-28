from django.urls import re_path
from notifications.consumers import NotificationConsumer
from pingpong.consumers import GameConsumer , LocalGameConsumer
from tictactoe.consumers import TicTacToeConsumer

websocket_urlpatterns = [
    # re_path(r"ws/game/(?P<game_id>\w+)/$", GameConsumer.as_asgi()),
    re_path(r"ws/game/pingpong/(?P<game_id>\w+)/$", GameConsumer.as_asgi()),
    re_path(r'ws/game/tictactoe/(?P<game_id>\w+)/$', TicTacToeConsumer.as_asgi()),
    re_path(r'ws/notifications/$', NotificationConsumer.as_asgi()),

]