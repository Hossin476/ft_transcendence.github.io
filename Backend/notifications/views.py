from django.shortcuts import render
from rest_framework.views import APIView
from notifications.models import  FriendshipNotification
from .serializers import FriendshipNotificationSerializer
from rest_framework.response import Response 

# Create your views here.

class NotifitationView(APIView):

    def get(self, request):
        self.user = request.user
        notification_fr = FriendshipNotification.objects.filter(receiver= self.user)
        notification_fr_serializer = FriendshipNotificationSerializer(notification_fr, many=True)
        return Response(notification_fr_serializer.data)




    # def put(self, request):




# 