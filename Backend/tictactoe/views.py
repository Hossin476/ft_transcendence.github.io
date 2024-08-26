from django.shortcuts import render
from django.http import JsonResponse
from django.core.cache import cache

# Create your views here.


def Room(request):
    return JsonResponse({"name": "room"})


def Game(request):
    return JsonResponse({"name": "game"})


def get_is_ingame(req):
    users_ingame = cache.get('users_tictactoe')
    if users_ingame:
        isingame = [{'username': user.username} for user in users_ingame]
    else:
        isingame = []
    return JsonResponse(isingame, safe=False)