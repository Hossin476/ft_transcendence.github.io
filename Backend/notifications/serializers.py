from rest_framework import serializers
from .models import *
from users.models import Friendship ,CustomUser


class playerSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'profile_image',
        ]

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Friendship
        fields = ['id']

class GameNotificationSerializers(serializers.ModelSerializer):
    sender = playerSerializers()
    receiver = playerSerializers()
    isgame = serializers.BooleanField(default=True)
    class Meta:
        model = GameNotification
        fields = [
            'sender',
            'receiver',
            'created_at'
            'game',
            'isgame',
        ]

class FriendshipNotificationSerializer(serializers.ModelSerializer):
    sender = playerSerializers()
    receiver = playerSerializers()
    isgame = serializers.BooleanField(default=False)
    class Meta:
        model = FriendshipNotification
        fields = [
            'sender',
            'receiver',
            'friendship',
            'isgame',
            'created_at'
        ]