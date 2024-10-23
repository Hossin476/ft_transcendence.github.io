from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from notifications.serializers import playerSerializers
from tictactoe.models import OnlineGameModel
from pingpong.models import GameOnline
from pingpong.serializers import MatchGameOnlineSerializer
from tictactoe.serializers import MatchGameOnlineModelSerializer
from datetime import datetime, timedelta
from calendar import monthrange
from django.utils import timezone
from django.db.models import Q, Count
from itertools import chain
from django.http import JsonResponse
import os
import requests
class AppUserViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()
    serilizer_class = AppUserSerializer

@api_view(['GET'])
def get_user_info(request):
    
    user = CustomUser.objects.get(id=request.user.id)
    seriaized_user = playerSerializers(user)
    total_wins =  user.wins_p + user.wins_t
    total_loses = user.loses_p + user.loses_t
    total_games = total_wins + total_loses
    win_rate = ( (total_wins * 100) // total_games ) if total_games > 0 else 0
    user_list = seriaized_user.data
    user_list['total_wins'] = total_wins
    user_list['total_loses'] = total_loses
    user_list['total_games'] = total_games
    user_list['win_rate'] = win_rate
    return Response(user_list)

@api_view(['GET'])
def get_all_matches(request):
    user = request.user
    
    pong_matches = GameOnline.objects.filter(
        Q(player1=user) | Q(player2=user)).order_by('-last_update')
    tictactoe_matches = OnlineGameModel.objects.filter(
        Q(player1=user) | Q(player2=user)).order_by('-game_end')
    
    ping_serialzer = MatchGameOnlineSerializer(pong_matches, many=True).data
    tictactoe_serializer = MatchGameOnlineModelSerializer(tictactoe_matches, many=True).data
    
    all_matches = list(chain(ping_serialzer + tictactoe_serializer))
    return Response(all_matches)

@api_view(['GET'])
def get_monthly_data(request):

    user = request.user
    currant_date = timezone.now().date()
    start_date = datetime(currant_date.year, currant_date.month, 1)
    _, month_days = monthrange(currant_date.year, currant_date.month)
    end_date = start_date + timedelta(days=month_days)
    
    total_ping_matches = GameOnline.objects.filter(
        Q(player1 =user ) | Q(player2 = user)
        ,startTime__range=[start_date, end_date])
    
    tota_tic_matches = OnlineGameModel.objects.filter(
        Q(player1 =user ) | Q(player2 = user)
        ,game_start__range=[start_date, end_date])
    
    daily_ping_data = total_ping_matches.values('startTime__date').annotate(
        total_games = Count('id'),
        total_wins = Count('id', filter=Q(winner=user))
    )
    
    daily_tic_data = tota_tic_matches.values('game_start__date').annotate(
        total_games = Count('id'),
        total_wins = Count('id', filter=Q(winner=user))
    )
      
    chart_data = []
    
    for i in range(1, month_days+1):
        date = datetime(currant_date.year, currant_date.month, i).date()
        ping_data = next((items for items in daily_ping_data if items['startTime__date']==date),None)
        tic_date = next((items for items in daily_tic_data if items['game_start__date']==date),None)
        
        total_games = 0
        total_wins  = 0
        
        if(ping_data):
            total_games += ping_data['total_games']
            total_wins += ping_data['total_wins']
        if(tic_date):
            total_games += tic_date['total_games']
            total_wins += tic_date['total_wins']

        chart_data.append({
            "date": date.day,
            "total_games": total_games,
            "total_wins": total_wins
        })
    return Response(chart_data)

url_redirct= "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-e31a7ef548bc4cb598ec33035254d51a9df4790880f1ce4f859655334dc31143&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fusers%2Foauth2%2Fintra%2F&response_type=code"

def intra_login(request):
    pass
@api_view(['GET'])
def intra_redirect(request):
    client_id = os.environ.get('UID')
    client_secret = os.environ.get('INTRA_SECRET')
    code = request.GET.get('code')
    user = {'msg':"Hello", 'code':code}
    intra_redirect = os.environ.get('INTRA_URL')
    print("hello nigroooos",client_id, client_secret, code)
    data = {
        "client_id": client_id,
        "cliet_secret": client_secret,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": intra_redirect,
        "scope": "public"
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    response = requests.post("https://api.intra.42.fr/oauth/token", data=data, headers=headers)
    credentiales = response.json()
    print(credentiales)
    return Response(user)