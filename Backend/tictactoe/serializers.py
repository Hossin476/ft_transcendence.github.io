from .models import OnlineGameModel
from rest_framework import serializers
from users.serializers import  AppUserSerializer, MatchUserSerializer
from users.models import CustomUser


class  OnlineGameModelSerializer(serializers.ModelSerializer):
    player1 = AppUserSerializer()
    player2 = AppUserSerializer()
    game_type = serializers.CharField(max_length=20, default="tictactoe")
    class Meta:
        model = OnlineGameModel
        fields = ['id', 'player1', 'player2', 'game_type']


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
            model = CustomUser
            fields = ['id', 'username', 'profile_image', 'xp', 'rank']

class MatchGameOnlineModelSerializer(serializers.ModelSerializer):
    winner = MatchUserSerializer()
    player1 = MatchUserSerializer()
    player2 = MatchUserSerializer()
    created = serializers.DateTimeField(source='game_end')
    game_type = serializers.CharField(max_length=20, default="tictactoe")
    duration = serializers.SerializerMethodField()
    score1 = serializers.IntegerField(source='score_x')
    score2 = serializers.IntegerField(source='score_o')
    class Meta:
        model = OnlineGameModel
        fields = ['id', 'player1', 'player2', 'game_type', 'winner','score1','score2', 'created', 'duration']
    
    def get_duration(self, obj):
        delta_time  = obj.game_end - obj.game_start
        minutes =  ((delta_time.seconds ) / 60) 
        seconds  = minutes - float(int(minutes))
        seconds *= 60
        return (f'{int(minutes)}:{int(seconds)}' )