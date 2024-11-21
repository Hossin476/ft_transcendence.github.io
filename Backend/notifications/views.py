from rest_framework.views import APIView
from django.db.models import Q
from notifications.models import FriendshipNotification, GameNotification
from .serializers import FriendshipNotificationSerializer, GameNotificationSerializer, playerSerializers, TourInvitesSerializers, FriendshipSerializer
from users.models import CustomUser, Friendship,Block
from rest_framework.response import Response
from rest_framework.decorators import api_view
from itertools import chain
from operator import attrgetter
from django.core.cache import cache
from tournament.models import Tournament, InviteTournament
from django.http import JsonResponse
from pingpong.models import GameOnline
from tictactoe.models import OnlineGameModel
from rest_framework import status

# Create your views here.


class NotificationView(APIView):
    def get(self, request):
        try:
            self.user = request.user
            notification_fr = FriendshipNotification.objects.filter(
                receiver=self.user).order_by('-created_at')
            notification_game = GameNotification.objects.filter(
                receiver=self.user).order_by('-created_at')
            accepted_friendships = Friendship.objects.filter(
                Q(from_user=self.user) , request='A')
            accepted_friendship_notifications = [
                {
                    **FriendshipSerializer(f).data,
                    'receiver_username': f.to_user.username
                }
                for f in accepted_friendships
            ]
            notification_query = sorted(chain(
                notification_fr, notification_game), key=attrgetter('created_at'), reverse=True)
            result = []
            for obj in notification_query:
                if isinstance(obj, FriendshipNotification):
                    data = FriendshipNotificationSerializer(obj).data
                    data['type'] = 'friend'
                    result.append(data)
                elif isinstance(obj, GameNotification):
                    data = GameNotificationSerializer(obj).data
                    data['type'] = 'game'
                    result.append(data)
            for notification in accepted_friendship_notifications:
                notification['type'] = 'friend_response'
                notification['response'] = f"{notification['receiver_username']} has accepted your friend request"
                result.append(notification)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f"An Error Occured! {str(e)}", status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def onlineGame(request):
    friends = Friendship.objects.select_related('from_user', 'to_user')\
        .filter(Q(from_user=request.user) | Q(to_user=request.user), request='A')
    users_list = []
    for obj in friends:
        if request.user != obj.from_user and obj.from_user.is_online:
            users_list.append(obj.from_user)
        elif request.user != obj.to_user and obj.to_user.is_online:
            users_list.append(obj.to_user)
    users_list = list(set(users_list))
    data = {'users': []}
    data['users'] = playerSerializers(users_list, many=True).data
    return Response(data)


@api_view(['GET'])
def onlineFriends(request):
    friends = Friendship.objects.select_related('from_user', 'to_user')\
        .filter(Q(from_user=request.user) | Q(to_user=request.user), request='A')
    users_list = []
    for obj in friends:
        if request.user != obj.from_user:
            users_list.append(obj.from_user)
        elif request.user != obj.to_user:
            users_list.append(obj.to_user)
    users_list = list(set(users_list))
    data = {'users': []}
    data['users'] = playerSerializers(users_list, many=True).data
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
        return JsonResponse({'error': 'Missing game parameter'}, status=status.HTTP_400_BAD_REQUEST)
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
            return JsonResponse({'error': 'Invalid game parameter'}, status=status.HTTP_400_BAD_REQUEST) 
        leaderboard_list = sorted(leaderboard_list, key=lambda x: (x['wins'], x['win_rate']), reverse=True)
        for rank, user in enumerate(leaderboard_list, start=1):
            user['rank'] = rank
        return JsonResponse(leaderboard_list, safe=False, status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def matchesNotFinishPingPong(request):
    try:
        matchs = GameOnline.objects.filter(Q(player1=request.user) | Q(player2=request.user),is_start=True, is_game_end=False)
        returnData = {"isMatch": False}
        if len(matchs) != 0:
            returnData['isMatch'] = True
            returnData['id'] = matchs[0].id
        return Response(returnData)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def matchesNotFinishTictactoe(request):
    try:
        matchs = OnlineGameModel.objects.filter(Q(player1=request.user) | Q(player2=request.user), is_end=False)
        returnData = {"isMatch": False}
        if matchs is not None and len(matchs) != 0:
            returnData['isMatch'] = True
            returnData['id'] = matchs[0].id
        return Response(returnData)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_full_friendships(request):
    friend_type = request.GET.get('type', None)
    if friend_type is None:
        return JsonResponse({'error': 'Missing type parameter'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = request.user
        if friend_type == 'requests':
            requests = Friendship.objects.filter(Q(to_user=user) & Q(request='P'))
            requests_data = [
                {
                    'type': 'requests',
                    'from_user': req.from_user.username,
                    'rank': req.from_user.rank,
                    'profile_image': str(req.from_user.profile_image.url) if req.from_user.profile_image else None,
                }
                for req in requests]
            return JsonResponse(requests_data, safe=False, status=status.HTTP_200_OK)
        elif friend_type == 'blocked':
            blocked_users = Block.objects.filter(blocker=user)
            blocked_data = [
                {
                    'type': 'blocked',
                    'blocked_user': blk.blocked.username,
                    'rank': blk.blocked.rank,
                    'profile_image': str(blk.blocked.profile_image.url) if blk.blocked.profile_image else None,
                }
                for blk in blocked_users]
            return JsonResponse(blocked_data, safe=False, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'Invalid type parameter'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"error: {str(e)}")
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def check_friendship(request, user_id):
    print(request.user.id)
    try:
        user = request.user.id
        friend = CustomUser.objects.get(id=user_id)
        friendship = Friendship.objects.filter(
            Q(from_user=user, to_user=friend) | Q(from_user=friend, to_user=user)).first()
        if friendship:
                return JsonResponse({
                "friendship_exists": True,
                "status": friendship.request,
                "from_user": friendship.from_user.username,
                "to_user": friendship.to_user.username,
            }, status=status.HTTP_200_OK)
        return JsonResponse({
            "friendship_exists": False,
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def check_blocked(request, user_id):
    try:
        user = request.user
        friend = CustomUser.objects.get(id=user_id)
        blocked = Block.objects.filter(blocker=user, blocked=friend).first()
        if blocked:
            return JsonResponse({
                "block": True,
                "blocker": blocked.blocker.username,
                "blocked": blocked.blocked.username,
            }, status=status.HTTP_200_OK)
        return JsonResponse({
            "block": False,
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)