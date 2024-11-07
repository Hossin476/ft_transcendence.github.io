from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameOnline, GameOffline
from .serializers import GameOnlineSerializer, GameOfflineSerializer
import json

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

    
@api_view(['POST'])
def createLocalGame(request):
    data = request.body
    data = json.loads(data)
    game  = GameOffline.objects.create(creater_game=request.user,\
                        player1=data['player1'], player2=data['player2'])
    return Response({'game_id': game.id})

    
