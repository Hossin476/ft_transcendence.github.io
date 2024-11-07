
from rest_framework import serializers
from .models import Tournament, InviteTournament, TournamentLocal
from notifications.serializers import playerSerializers
from pingpong.serializers import GameOnlineSerializer, GameOfflineSerializer
class TournamentSerializer(serializers.ModelSerializer):
    
    players     = playerSerializers(many=True)
    matches     = GameOnlineSerializer(many=True)
    creator     = playerSerializers()
    class Meta:
        model   = Tournament
        fields  = ['id','name','creator','players','matches','is_end','is_start', 'is_full']


class TournamentSubSerializer(serializers.ModelSerializer):
    
    creator     = playerSerializers()
    class Meta:
        model   = Tournament
        fields  = ['id','name','creator']

class TournamentInviteSerializer(serializers.ModelSerializer):
    
    user        = playerSerializers()
    tournament  = TournamentSubSerializer()
    class Meta:
        model   = InviteTournament
        fields  = ['id','user','tournament','created_at','state']

class TrounamentLocalSerializer(serializers.ModelSerializer):
    creator     = playerSerializers()
    matches     = GameOfflineSerializer(many=True) 
    class Meta:
        model   = TournamentLocal
        fields  = ['id', 'matches', 'name', 'is_start', 'is_end', 'creator'] 

