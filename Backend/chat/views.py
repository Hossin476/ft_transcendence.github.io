from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, F
from rest_framework.decorators import api_view
import json
from rest_framework.decorators import api_view

# Create your views here.
from users.models import Friendship
from . import models
from . import serializers

@api_view(["POST"])
def conversations(request):
    user  = request.user
    # print(user.id)
    conversations =Friendship.objects.select_related("from_user","to_user").filter(
        Q(from_user=user.id) | Q(to_user=user.id)
    ).filter(friendship__isnull=False).distinct()
    if not conversations.exists():
            return Response([],status.HTTP_200_OK)
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
        # print("haha error here", serialize_convo.data)
        return Response(serialize_convo.data,status.HTTP_200_OK)
    



@api_view(["POST"])
def allUsers(request):
    user  = request.user

    conversations =  models.FriendShip.objects.filter(
        Q(user1 = user.id)| Q(user2 = user.id)
    )

    if not conversations.exists():
        return Response([],status.HTTP_200_OK)
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
        print(serialized_friends.data)
        return Response(serialized_friends.data,status=status.HTTP_200_OK)

@api_view(["POST"])
def messages(request):
    if request.method == "POST":
        user = request.user
        data = json.loads(request.body)
        convos = Friendship.objects.filter(pk=data["friendship"])
        if convos.exists():
            messages = models.Message.objects.filter(friendshipid=data["friendship"])
            messages.filter(~Q(sendId=user.id),seen=False).update(seen=True)
            serialize_message = serializers.MessageSerializer(messages,many=True)
            # print(serialize_message.data)
            return Response(serialize_message.data,status=status.HTTP_200_OK)  
        else:
            return Response([],status=status.HTTP_200_OK)
        
