from django.urls import re_path
from notifications.consumers import NotificationConsumer
from pingpong.consumers import GameConsumer , LocalGameConsumer
from tictactoe.consumers import TicTacToeConsumer
from tournament.consumer import TournamentConsumer

websocket_urlpatterns = [
    # re_path(r"ws/game/(?P<game_id>\w+)/$", GameConsumer.as_asgi()),
    re_path(r"ws/game/pingpoing/(?P<game_id>\w+)/$", GameConsumer.as_asgi()),
    re_path(r'ws/game/tictacteo/(?P<room_name>\w+)/$', TicTacToeConsumer.as_asgi()),
    re_path(r'ws/notifications/$', NotificationConsumer.as_asgi()),
    re_path(r'ws/tournament/(?P<tour_id>\w+)/$', TournamentConsumer.as_asgi())

]