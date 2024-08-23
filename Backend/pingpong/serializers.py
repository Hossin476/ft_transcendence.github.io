from rest_framework import serializers
from .models import GameOnline
from users.serializers import  AppUserSerializer
class  GameOnlineSerializer(serializers.ModelSerializer):
    player1 = AppUserSerializer()
    player2 = AppUserSerializer()
    game_type = serializers.CharField(max_length=20, default="pinopong")
    class Meta:
        model = GameOnline
        fields = ['id', 'player1', 'player2', 'game_type']