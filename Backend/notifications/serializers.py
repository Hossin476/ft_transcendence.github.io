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
            'last_time',
            'rank',
            'xp',
            'wins',
            'loses',
            'draws',
        ]

class TourInvitesSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'profile_image',
            'rank'
        ]


class GameNotificationSerializers(serializers.ModelSerializer):
    sender = playerSerializers()
    isgame = serializers.BooleanField(default=True)
    game_type = serializers.SerializerMethodField()
    class Meta:
        model = GameNotification
        fields = [
            'sender',
            'created_at',
            'game_type',
            'isgame',
        ]
    def get_game_type(self, obj):
        return obj.get_game_display()

class FriendshipNotificationSerializer(serializers.ModelSerializer):
    sender = playerSerializers()
    isgame = serializers.BooleanField(default=False)
    class Meta:
        model = FriendshipNotification
        fields = [
            'sender',
            'friendship',
            'isgame',
            'created_at',
        ]


