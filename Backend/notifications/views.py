from rest_framework.views import APIView
from django.db.models import Q
from notifications.models import FriendshipNotification, GameNotification
from .serializers import FriendshipNotificationSerializer, GameNotificationSerializers, playerSerializers, TourInvitesSerializers
from users.models import CustomUser, Friendship
from rest_framework.response import Response
from rest_framework.decorators import api_view
from itertools import chain
from operator import attrgetter
from django.core.cache import cache
from tournament.models import Tournament, InviteTournament
from django.http import JsonResponse
from pingpong.models import GameOnline
from tictactoe.models import OnlineGameModel

# Create your views here.

class NotifitationView(APIView):
    def get(self, request):
        self.user = request.user
        notification_fr = FriendshipNotification.objects.filter(
            receiver=self.user).order_by('-created_at')
        notification_game = GameNotification.objects.filter(
            receiver=self.user).order_by('-created_at')
        notification_query = sorted(chain(
            notification_fr, notification_game), key=attrgetter('created_at'), reverse=True)
        result = []
        for obj in notification_query:
            if isinstance(obj, FriendshipNotification):
                result.append(FriendshipNotificationSerializer(obj).data)
            elif isinstance(obj, GameNotification):
                result.append(GameNotificationSerializers(obj).data)
        return Response(result)


@api_view(['GET'])
def onlineGame(request):
    friends = Friendship.objects.select_related('from_user', 'to_user')\
        .filter(request='A')
    users_list = []
    for obj in friends:
        if request.user != obj.from_user:
            users_list.append(obj.from_user)
        elif request.user != obj.to_user:
            users_list.append(obj.to_user)
    users_list = list(set(users_list))
    connected_users = []
    if cache.has_key('connected_users'):
        connected_users = cache.get('connected_users')
    if request.user in connected_users:
        connected_users.remove(request.user)
    online_users = []
    for obj in users_list:
        if obj in connected_users:
            online_users.append(obj)
    users_pingpong = []
    users_tictactoe = []
    if cache.has_key('users_pingpong'):
        users_pingpong = cache.get('users_pingpong')
    if cache.has_key('users_tictactoe'):
        users_tictactoe = cache.get('users_tictactoe')
    data = {'inlobby': [], 'ingame': []}
    for obj in online_users:
        if obj in users_pingpong:
            sr_obj = playerSerializers(obj).data
            sr_obj['game_type'] = 'pingpong',
            data['ingame'].append(sr_obj)
            online_users.remove(obj)
        elif obj in users_tictactoe:
            sr_obj = playerSerializers(obj).data
            sr_obj['game_type'] = 'tictacteo',
            data['ingame'].append(sr_obj)
            online_users.remove(obj)
    instance = playerSerializers(online_users, many=True)
    data['inlobby'] = instance.data
    return Response(data)


@api_view(['GET'])
def onlineFriends(request):
    friends = Friendship.objects.select_related('from_user', 'to_user')\
        .filter(request='A')
    users_list = []
    for obj in friends:
        if request.user != obj.from_user:
            users_list.append(obj.from_user)
        elif request.user != obj.to_user:
            users_list.append(obj.to_user)
    users_list = list(set(users_list))
    connected_users = []
    if cache.has_key('connected_users'):
        connected_users = cache.get('connected_users')
    if request.user in connected_users:
        connected_users.remove(request.user)

    remaining_users = users_list.copy()
    online_users = []
    for obj in users_list:
        if obj in connected_users:
            online_users.append(obj)
            remaining_users.remove(obj)

    users_list = remaining_users
    users_pingpong = []
    users_tictactoe = []
    if cache.has_key('users_pingpong'):
        users_pingpong = cache.get('users_pingpong')
    if cache.has_key('users_tictactoe'):
        users_tictactoe = cache.get('users_tictactoe')
    data = {'online': [], 'offline': []}
    online_users_data = []
    for obj in online_users:
        if obj in users_pingpong:
            sr_obj = playerSerializers(obj).data
            sr_obj['game_type'] = 'pingpong'
            sr_obj['ingame'] = True
            online_users_data.append(sr_obj)
        elif obj in users_tictactoe:
            sr_obj = playerSerializers(obj).data
            sr_obj['game_type'] = 'tictacteo'
            sr_obj['ingame'] = True
            online_users_data.append(sr_obj)
        else:
            sr_obj = playerSerializers(obj).data
            sr_obj['ingame'] = False
            online_users_data.append(sr_obj)
    data['online'] = online_users_data
    data['offline'] = playerSerializers(users_list, many=True).data
    print(data)
    return Response(data)


def get_friends(user):
    friends = Friendship.objects.select_related(
        'from_user', 'to_user').filter(request='A')
    return list(set(
        friend.to_user if friend.from_user == user else friend.from_user
        for friend in friends
        if friend.from_user == user or friend.to_user == user
    ))


@api_view(['GET'])
def TournamentInvites(request, tour_id):
    friends_data = None
    try:
        friends = get_friends(request.user)
        new_friends = []
        tournament = Tournament.objects.get(id=tour_id)
        invites = InviteTournament.objects.select_related('user').filter(tournament=tournament)
        invited_users = [invite.user for invite in invites]
        for friend in friends:
            if friend not in tournament.players.all() and friend not in invited_users:
                new_friends.append(friend)
        friends_data = TourInvitesSerializers(new_friends, many=True).data
    except Exception as e:
        print("Error : ", e)
    return Response(friends_data)


@api_view(['GET'])
def get_Leaderboard(request):
    game = request.GET.get('game', None)
    if game is None:
        return JsonResponse({'error': 'Missing game parameter'}, status=400)
    try:
        users = CustomUser.objects.all()
        if game == 'Tic Tac Toe':
            leaderboard_list = [{
                'username': user.username,
                'wins': user.wins_t,
                'loses': user.loses_t,
                'profile_image': str(user.profile_image.url) if user.profile_image else None,
                'win_rate': (user.wins_t * 100) // (user.wins_t + user.loses_t) if (user.wins_t + user.loses_t) != 0 else 0           
                } for user in users]
        elif game == 'Ping Pong':
            leaderboard_list = [{
                'username': user.username,
                'wins': user.wins_p,
                'loses': user.loses_p,
                'profile_image': str(user.profile_image.url) if user.profile_image else None,
                'win_rate': (user.wins_p * 100) // (user.wins_p + user.loses_p) if (user.wins_p + user.loses_p) != 0 else 0
            } for user in users]
        else:
            return JsonResponse({'error': 'Invalid game parameter'}, status=400) 
        leaderboard_list = sorted(leaderboard_list, key=lambda x: (x['wins'], x['win_rate']), reverse=True)
        for rank, user in enumerate(leaderboard_list, start=1):
            user['rank'] = rank
        return JsonResponse(leaderboard_list, safe=False)
    
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
