from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, F
from rest_framework.decorators import api_view
from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated
import json

# Create your views here.
from users.models import Friendship
from . import models
from . import serializers

class allUsers(generics.ListCreateAPIView):
    queryset = Friendship.objects.all()
    serializer_class = serializers.FriendShipSerializer
    def get_queryset(self):
        user = self.request.user
        if Friendship.objects.filter(Q(from_user=user) | Q(to_user=user)).exists():
            return Friendship.objects.filter(Q(from_user=user) | Q(to_user=user))
        return Friendship.objects.none()

    def create(self,request):
        user  = request.user
        conversations =  models.FriendShip.objects.filter(
            Q(user1 = user.id)| Q(user2 = user.id)
        )
        if not conversations.exists():
            return Response([], status.HTTP_200_OK)
        else:
            users = []
            serialized_friends = serializers.FriendShipSerializer(conversations, many=True)
            for friends in serialized_friends.data:
                if friends["user1"]["id"] == user.id:
                    friends['user'] = friends["user2"]
                if friends["user2"]["id"] == user.id:
                    friends['user'] = friends["user1"]
                del friends["user1"]
                del friends["user2"]
            return Response(serialized_friends.data, status=status.HTTP_200_OK)


class conversations(generics.ListCreateAPIView):
    queryset = Friendship.objects.all()
    serializer_class = serializers.FriendShipSerializer
    def get_queryset(self):
        user = self.request.user
        if Friendship.objects.filter(Q(from_user=user) | Q(to_user=user)).exists():
            return Friendship.objects.filter(Q(from_user=user) | Q(to_user=user))
        return Friendship.objects.none()

    def create(self,request):
        user  = request.user
        conversations = Friendship.objects.select_related("from_user","to_user").filter(
            Q(from_user=user.id) | Q(to_user=user.id)
        ).distinct()
        if not conversations.exists():
                return Response([], status.HTTP_200_OK)
        else:
            users = []
            serialize_convo = serializers.FriendShipSerializer(conversations,many=True)
            for users in serialize_convo.data:
                if users["from_user"]["id"] == user.id:
                    users["user"] = users["to_user"]
                if users["to_user"]["id"] == user.id:
                    users["user"] = users["from_user"]
                del users["from_user"]
                del users["to_user"]
                print(serialize_convo.data)
            return Response(serialize_convo.data, status.HTTP_200_OK)
       

class messages(generics.ListCreateAPIView):
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer
    def get_queryset(self):
        user = self.request.user
        if models.Message.objects.filter(sendId=user).exists():
            return models.Message.objects.filter(sendId=user)
        return models.Message.objects.none()

    def create(self,request):
        user = request.user
        data = json.loads(request.body)
        if Friendship.objects.filter(pk=data["friendship"]).exists():
            messages = models.Message.objects.filter(friendshipid=data["friendship"])
            messages.filter(~Q(sendId=user.id),seen=False).update(seen=True)
            serialize_message = serializers.MessageSerializer(messages,many=True)
            return Response(serialize_message.data,status=status.HTTP_200_OK)  
        else:
            return Response([], status=status.HTTP_404_NOT_FOUND)
