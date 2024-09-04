from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Tournament
from .serializers import TournamentSerializer
# Create your views here.


class TournamentView(APIView):
    def get(self,request,tourId):
        tournament = get_object_or_404(Tournament,id=tourId)
        serialized_tournament = TournamentSerializer(tournament).data
        return Response(serialized_tournament,status.HTTP_200_OK)
