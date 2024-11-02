from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from .models import *
from rest_framework.permissions import AllowAny
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
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
import secrets
import string
import requests
import json
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .utils import send_otp_email
from .models import *
from .serializers import *
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator

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


def intra_login(request):
    pass


def generate_random_string(username,length):
    characters = string.ascii_letters + string.digits
    rendom_string = ''.join(secrets.choice(characters) for i in range(length))
    resulted_string = username + rendom_string
    return resulted_string


def get_image_path(username,link):
    
    get_pic = requests.get(link)
    
    if get_pic.status_code == 200:
        path = f"media/images/profile/{username}.jpg"
        with open(path, 'wb') as file:
            file.write(get_pic.content)
        return path
    return None

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def intra_redirect(request):

    client_id = os.environ.get('UID')
    client_secret = os.environ.get('INTRA_SECRET')
    print(request.body)
    body = request.data
    print(body)
    intra_redirect = os.environ.get('INTRA_URL')
    code = body['code']

    data = {
        "client_id": client_id,
        "client_secret": client_secret,
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
    base_url = " https://api.intra.42.fr/v2/me"
    response_user = requests.get("https://api.intra.42.fr/v2/me", headers={"Authorization": "Bearer " + credentiales['access_token']})
    user = response_user.json()
    
    if CustomUser.objects.filter(email=user['email']).exists():
        print("he checked here and want to return the token")
        user = CustomUser.objects.get(email=user['email'])
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access':str(refresh.access_token)
        })
    else:
        user_name = user['login']
        if CustomUser.objects.filter(username=user['login']).exists():
            username = generate_random_string(user_name, 5)
        profile_pic = get_image_path(user_name, user['image']['link'])
        user_instance = CustomUser.objects.create_user(
            username=user['login'],
            email=user['email'],
            password=generate_random_string(user_name, 15)
        )
        return Response({
            'refresh': str(refresh),
            'access':str(refresh.access_token)
        })


class UserRegistrationView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            send_otp_email(user['email'])
            return Response({
                    'data': user,
                    'message': f'hello, thank you for joining us , a verification code was sent to your email'
                }, status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmailVerificationView(GenericAPIView):
    
    permission_classes = [AllowAny]

    def post(self, request):
        otpcode = request.data.get('otp')
        try:
            user_code_object = OneTimePassword.objects.get(code=otpcode)
            user = user_code_object.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response(
                    {'message': 'Email Verified successfully !'},
                    status=status.HTTP_200_OK
                )
            return Response({
                'message': 'unvalid token or user already verified !'
            }, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist:
            return Response({
                'message': 'unvalid token or user already verified !'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
class UserLoginView(GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]


    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserProfileView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]


    def get(self, request):
        return Response({
            'YOU CAN SEE THIS . YOU HAVE YOUR TOKENS !'
        }, status=status.HTTP_200_OK)

class UserPasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = [AllowAny]


    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({
            'message': 'a link has been sent to your mail to reset your password'
        }, status=status.HTTP_200_OK)

class PasswordResetConfirmationView(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id =smart_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({
                    'message': 'token is not valid or expired !'
                }, status=status.HTTP_401_UNAUTHORIZED)
            return Response({
                'success': True,
                'message': 'credentials are valid',
                'uidb64': uidb64,
                'token': token
            }, status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError:
            return Response({
                'message': 'token is not valid or expired !'
            }, status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({
            'message': 'password reset successfully !'
        }, status=status.HTTP_200_OK)

class UserLogoutView(GenericAPIView):
    serializer_class = UserLogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'message': 'logout successfull !'
        }, status=status.HTTP_200_OK)
    
