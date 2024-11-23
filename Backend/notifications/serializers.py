from rest_framework import serializers
from .models import *
from users.models import Friendship, CustomUser
from rest_framework import serializers
from .models import Friendship


class playerSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'profile_image',
            'cover_image',
            'last_time',
            'rank',
            'xp',
            'wins_p',
            'loses_p',
            'wins_t',
            'loses_t',
            'is_online',
            'is_ingame',
            'game_type',
            # 'is_intra_user',
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


class GameNotificationSerializer(serializers.ModelSerializer):
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




class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = ['id', 'request', 'active', 'block_user', 'from_user', 'to_user']