from rest_framework.views import APIView
from django.db.models import Q
from notifications.models import  FriendshipNotification, GameNotification
from .serializers import FriendshipNotificationSerializer, GameNotificationSerializers,playerSerializers
from users.models import CustomUser , Friendship
from rest_framework.response import Response 
from rest_framework.decorators  import  api_view
from itertools import chain
from operator import attrgetter
from django.core.cache import cache

# Create your views here.
class NotifitationView(APIView):
    def get(self, request):
        self.user = request.user
        notification_fr = FriendshipNotification.objects.filter(receiver= self.user).order_by('-created_at')
        notification_game = GameNotification.objects.filter(receiver= self.user).order_by('-created_at')
        notification_query = sorted(chain(notification_fr, notification_game), key=attrgetter('created_at'), reverse=True)
        result = []
        for obj in notification_query:
            if isinstance(obj, FriendshipNotification):
                result.append(FriendshipNotificationSerializer(obj).data)
            elif isinstance(obj, GameNotification):
                result.append(GameNotificationSerializers(obj).data)
        return Response(result)



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
    if cache.has_key('users_pingping'):
        connected_users = cache.get('connected_users')
    if request.user in connected_users:
        connected_users.remove(request.user)
    online_users = []
    for obj in users_list:
        if obj in connected_users:
            online_users.append(obj)
    users_pingpong = []
    users_tictactoe = []
    if cache.has_key('users_pingping'):
        users_pingpong = cache.get('users_pingping')
    if cache.has_key('users_tictactoe'):
        users_tictactoe = cache.get('users_tictactoe')
    data = {'inlobby':[], 'ingame':[]}
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
