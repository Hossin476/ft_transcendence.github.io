from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameOnline, GameOffline
from .serializers import GameOnlineSerializer, GameOfflineSerializer

@api_view(['GET'])
def players(request, game_id):
    obj = get_object_or_404(GameOnline, id=game_id)
    serializer = GameOnlineSerializer(obj)
    return Response(serializer.data)

@api_view(['GET'])
def match_offline(request, game_id):
    obj = get_object_or_404(GameOffline, id=game_id)
    serializer = GameOfflineSerializer(obj)
    return Response(serializer.data)

    
