from rest_framework import serializers
from .models import GameOnline, GameOffline
from notifications.serializers import playerSerializers
class  GameOnlineSerializer(serializers.ModelSerializer):
    player1     = playerSerializers()
    player2     = playerSerializers()
    winner      = playerSerializers()
    game_type   = serializers.CharField(max_length=20, default="pinopong")
    class Meta:
        model   = GameOnline
        fields  = ['id', 'player1', 'player2', 'game_type', 'winner','is_game_end','is_start']


class   GameOfflineSerializer(serializers.ModelSerializer):
    game_type   = serializers.CharField(max_length=20, default="pinopong")
    class Meta:
        model = GameOffline
        fields = ['id', 'player1', 'player2', 'game_type', 'winner','is_game_end',"score1","score2" ]

class MatchGameOnlineSerializer(serializers.ModelSerializer):
    winner = MatchUserSerializer()
    player1 = MatchUserSerializer()
    player2 = MatchUserSerializer()
    created = serializers.DateTimeField(source='last_update')
    game_type   = serializers.CharField(max_length=20, default="pingpong")
    duration = serializers.SerializerMethodField()
    class Meta:
        model = GameOnline
        fields = ['id', 'player1', 'player2', 'game_type', 'winner','created','score1','score2', 'duration']
    
    def get_duration(self, obj):
        delta_time  = obj.last_update - obj.startTime
        hours = delta_time.days
        minutes =  ((delta_time.seconds ) / 60) 
        
        seconds  = minutes - float(int(minutes))
        seconds *= 60
        return (f'{int(minutes)}:{int(seconds)}' )