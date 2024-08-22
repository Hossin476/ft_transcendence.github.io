from rest_framework import serializers
from .models import FriendshipNotification
from users.models import Friendship


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Friendship
        fields = ['id']

class NotificationSerializers(serializers.ModelSerializer):
    class Meta:
        model = FriendshipNotification
        fields = [
            'sender',
            'receiver',
            'friendship'
        ]