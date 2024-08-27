from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameOnline
from .serializers import GameOnlineSerializer

@api_view(['GET'])
def players(request, game_id):
    print("hamza youn nksndlkasd")
    obj = get_object_or_404(GameOnline, id=game_id)
    serializer = GameOnlineSerializer(obj)
    return Response(serializer.data)