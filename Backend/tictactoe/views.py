from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.


def Room(request):
    return JsonResponse({"name": "room"})


def Game(request):
    return JsonResponse({"name": "game"})