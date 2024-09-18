from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Tournament, TournamentLocal
from .serializers import TournamentSerializer, TournamentInviteSerializer, TrounamentLocalSerializer
from users.models import CustomUser
from .models import InviteTournament
import json
# Create your views here.

class TournamentView(APIView):
    def get(self, request, tourId):
        tournament = get_object_or_404(Tournament, id=tourId)
        serialized_tournament = TournamentSerializer(tournament).data
        return Response(serialized_tournament, status.HTTP_200_OK)

    def post(self, request):
        data = json.loads(request.body)
        user = request.user
        tour = Tournament.objects.create(
            creator = user,
            name = data["name"]
        )
        tour.players.add(user)
        serialized_tour =  TournamentSerializer(tour)
        return Response(serialized_tour.data)

class TournamentLocalView(APIView):
    def get(self, request, tourId):
        tournament = get_object_or_404(TournamentLocal, id=tourId)
        serialized_tournament = TrounamentLocalSerializer(tournament).data
        return Response(serialized_tournament, status.HTTP_200_OK)

    def post(self, request):
        data = json.loads(request.body)
        user = request.user
        tour = TournamentLocal.objects.create(
            creator = user,
            name = data["name"]
        )
        serialized_tour =  TrounamentLocalSerializer(tour)
        return Response(serialized_tour.data)



class TournamentListView(APIView):
    def get(self, request, userId):
        print("hello word")
        user = get_object_or_404(CustomUser, id=userId)
        tours =  user.tournament_set.all()
        serilized_tourlist = TournamentSerializer(tours, many=True).data
        print("tourlist", serilized_tourlist)
        return Response(serilized_tourlist, status.HTTP_200_OK)


class TournamentInvitesView(APIView):
    def get(self,request):
        user    = request.user
        invites = InviteTournament.objects.filter(user=user)
        serialized_invites = TournamentInviteSerializer(invites,many=True).data
        return Response(serialized_invites, status.HTTP_200_OK)