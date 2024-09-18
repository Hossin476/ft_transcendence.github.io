from django.shortcuts import render
from django.http import JsonResponse
from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from tictactoe.models import OnlineGameModel
from .serializers import CustomUserSerializer
from .local_game.models import LocalGameModel


@api_view(['GET'])
def get_user_data(req, game_id):
    try:
        game = OnlineGameModel.objects.get(id=game_id)
    except OnlineGameModel.DoesNotExist:
        return Response({'error': 'Game not found'}, status=404)

    player1 = game.player1
    player2 = game.player2
    player1_data = CustomUserSerializer(player1).data
    player2_data = CustomUserSerializer(player2).data
    return Response({'player1': player1_data, 'player2': player2_data})


@api_view(['GET'])
def get_winner_data(request, game_id):
    try:
        game = OnlineGameModel.objects.get(id=game_id)
        if game:
            winner = game.winner
            if winner is None:
                return Response({'error': 'Winner not found'}, status=status.HTTP_404_NOT_FOUND)
            winner_serializer = CustomUserSerializer(winner)
            loser = game.player1 if winner.id == game.player2.id else game.player2
            loser_serializer = CustomUserSerializer(loser)
            return Response({
                "winner": winner_serializer.data,
                "loser": loser_serializer.data
            }, status=status.HTTP_200_OK)
    except OnlineGameModel.DoesNotExist:
        return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def offline_user_data(req, game_id):
    try:
        game = LocalGameModel.objects.get(id=game_id)
    except LocalGameModel.DoesNotExist:
        return Response({'error': 'Game not found'}, status=404)

    player1 = game.player1
    player2 = game.player2

    return Response({'player1': player1, 'player2': player2})

@api_view(['GET'])
def offline_winner_data(request, game_id):
    try:
        game = LocalGameModel.objects.get(id=game_id)
        return Response({
            "winner": game.final_winner
            }, status=status.HTTP_200_OK)
    except LocalGameModel.DoesNotExist:
        return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_local_game(request):
    try:
        player1 = request.data.get('player1')
        player2 = request.data.get('player2')
        creator = request.user
        game = LocalGameModel.objects.create(creator=creator, player1=player1, player2=player2)

        return Response({'game_id': game.id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)