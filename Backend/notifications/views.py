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
    print("Online Users : ", data)
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