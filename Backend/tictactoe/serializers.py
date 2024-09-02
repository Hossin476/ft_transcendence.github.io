from .models import OnlineGameModel
from rest_framework import serializers
from users.serializers import  AppUserSerializer
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