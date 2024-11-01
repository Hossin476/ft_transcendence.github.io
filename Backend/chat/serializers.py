from rest_framework import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . import models

from users.models import CustomUser,Friendship

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username','is_online','profile_image']


class FriendShipSerializer(serializers.ModelSerializer):
    last_msg = serializers.SerializerMethodField()
    count = serializers.SerializerMethodField()
    blocker  = serializers.SerializerMethodField()
    from_user = UserSerializer()
    to_user = UserSerializer()
    class Meta:
        model = Friendship
        fields = ["id","from_user","to_user","active","last_msg","block_user","blocker", "count"]
    def get_last_msg(self,ob):
        last_msg = ob.friendship.order_by("-created_at").first()
        if(last_msg):
            return MessageSerializer(last_msg).data
    def get_count(self,ob):
        count = ob.friendship.filter(seen=False).count()
        return count
    def get_blocker(self,ob):
        print(ob.block_user)
        if ob.block_user == "F":
            return  UserSerializer(ob.from_user).data
        elif ob.block_user == "T":
            return UserSerializer(ob.to_user).data
        else:
            return None
        

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Message
        fields = ['id','sendId','content',"friendshipid","created_at", "seen"]