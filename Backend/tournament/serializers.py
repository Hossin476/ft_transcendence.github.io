
from rest_framework import serializers
from .models import Tournament
from notifications.serializers import playerSerializers
from pingpong.serializers import GameOnlineSerializer
class TournamentSerializer(serializers.ModelSerializer):
    
    players = playerSerializers(many=True)
    matches = GameOnlineSerializer(many=True)
    creator = playerSerializers()
    class Meta:
        model = Tournament
        fields = ['id','name','creator','players','matches','is_end','is_start']