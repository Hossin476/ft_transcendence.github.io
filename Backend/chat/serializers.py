from rest_framework import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . import models

from users.models import CustomUser,Friendship

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username']


class FriendShipSerializer(serializers.ModelSerializer):
    last_msg = serializers.SerializerMethodField()
    count = serializers.SerializerMethodField()
    from_user = UserSerializer()
    to_user = UserSerializer()
    class Meta:
        model = Friendship
        fields = ["id","from_user","to_user","active","last_msg", "count"]
    def get_last_msg(self,ob):
        last_msg = ob.friendship.order_by("-created_at").first()
        if(last_msg):
            return MessageSerializer(last_msg).data
    def get_count(self,ob):
        count = ob.friendship.filter(seen=False).count()
        return count
        

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Message
        fields = ['id','sendId','content',"friendshipid","created_at", "seen"]