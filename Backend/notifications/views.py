from rest_framework.views import APIView
from django.db.models import Q
from notifications.models import  FriendshipNotification, GameNotification
from .serializers import FriendshipNotificationSerializer, GameNotificationSerializers,playerSerializers
from users.models import CustomUser , Friendship
from rest_framework.response import Response 
from rest_framework.decorators  import  api_view
from itertools import chain
from operator import attrgetter

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
        .filter(Q(request='A'), Q(from_user__is_online=True) | Q(to_user__is_online=True))
    print(friends)
    users_list = []
    for obj in friends:
        if request.user != obj.from_user:
            users_list.append(obj.from_user)
        elif request.user != obj.to_user:
            users_list.append(obj.from_user)
    instance = playerSerializers(users_list, many=True)
    return Response(instance.data)
    
    
    