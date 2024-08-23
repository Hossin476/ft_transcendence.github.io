from .models import OnlineGameModel
from rest_framework import serializers
from users.serializers import  AppUserSerializer


class  OnlineGameModelSerializer(serializers.ModelSerializer):
    player1 = AppUserSerializer()
    player2 = AppUserSerializer()
    game_type = serializers.CharField(max_length=20, default="tictactoe")
    class Meta:
        model = OnlineGameModel
        fields = ['id', 'player1', 'player2', 'game_type']



    

    # async def send_game_update(self):
    #     game_data = {
    #         'player1': self.room.players['X'],
    #         'player2': self.room.players['O'],
    #         'winner': self.game.winner,
    #         'score_x': self.game.x_score,
    #         'score_o': self.game.o_score,
    #         # 'game_start': self.game.start_time,
    #         # 'game_end': self.game.end_time,
    #         'board_state': self.game.board,
    #         'countdown_value': self.game.countdown_value
    #     }
    #     serializer = OnlineGameModelSerializer(data=game_data)
    #     if serializer.is_valid():
    #         print("-----check validation-----")
    #         serialized_data = serializer.data
    #         await self.channel_layer.group_send(self.room_group_name, {
    #             'type': 'game.update',
    #             'state': serialized_data['board_state'],
    #             'winner_line': self.game.winner_line,
    #             'winner': serialized_data['winner'],
    #             'score_x': serialized_data['score_x'],
    #             'score_o': serialized_data['score_o'],
    #             'countdown': serialized_data['countdown_value']
    #         })