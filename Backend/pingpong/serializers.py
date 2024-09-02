from rest_framework import serializers
from .models import GameOnline
from notifications.serializers import playerSerializers
class  GameOnlineSerializer(serializers.ModelSerializer):
    player1 = playerSerializers()
    player2 = playerSerializers()
    winner = playerSerializers()
    game_type = serializers.CharField(max_length=20, default="pinopong")
    class Meta:
        model = GameOnline
        fields = ['id', 'player1', 'player2', 'game_type', 'winner']