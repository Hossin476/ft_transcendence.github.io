from django.shortcuts import render
from rest_framework.views import APIView
from notifications.models import  FriendshipNotification, GameNotification
from .serializers import FriendshipNotificationSerializer, GameNotificationSerializers
from rest_framework.response import Response 

# Create your views here.

class NotifitationView(APIView):

    def get(self, request):
        self.user = request.user
        notification_fr = FriendshipNotification.objects.filter(receiver= self.user).order_by('-created_at')
        notification_game = GameNotification.objects.filter(receiver= self.user).order_by('-created_at')
        notification_fr_serializer = FriendshipNotificationSerializer(notification_fr, many=True)
        notification_game_serializer = GameNotificationSerializers(notification_game, many=True)
        
        return Response(notification_fr_serializer.data)
    # def put(self, request):




# 