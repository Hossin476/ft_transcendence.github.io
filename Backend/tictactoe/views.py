from django.shortcuts import render
from django.http import JsonResponse
from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from tictactoe.models import OnlineGameModel
from .serializers import CustomUserSerializer


@api_view(['GET'])
def get_user_data(req, game_id):
    """
    Retrieve the user data for the players involved in a specific game.

    Args:
        req: The HTTP request object.
        game_id (int): The ID of the game from which to retrieve player data.

    Returns:
        Response: A JSON response containing the serialized data of player1 and player2,
        or an error message if the game does not exist.
    """
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
    """
    Retrieve the winner and loser data for a specific game.

    Args:
        request: The HTTP request object.
        game_id (int): The ID of the game from which to retrieve winner and loser data.

    Returns:
        Response: A JSON response containing the serialized data of the winner and the loser,
        or an error message if the game or winner does not exist.
    """
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
