from channels.generic.websocket import AsyncWebsocketConsumer
from .models import GameNotification, FriendshipNotification
import json
from django.db.models import Q
from channels.db import database_sync_to_async
from users.models import CustomUser, Friendship
from tictactoe.models import OnlineGameModel
from pingpong.models import GameOnline
from .serializers import FriendshipNotificationSerializer, playerSerializers
from pingpong.serializers import GameOnlineSerializer
from tictactoe.serializers import OnlineGameModelSerializer
from django.core.cache import cache
from django.utils import timezone
from tournament.models import Tournament
from tournament.serializers import TournamentSerializer
import asyncio


@database_sync_to_async
def create_game_db(sender, receiver, game):
    receiver_obj = CustomUser.objects.get(username=receiver)
    GameNotification.objects.create(
        sender=sender, receiver=receiver_obj, game=game)
    return receiver_obj.pk


@database_sync_to_async
def create_friend_db(sender, receiver_id):
    receiver = CustomUser.objects.get(username=receiver_id)
    friendship = Friendship.objects.create(from_user=sender, to_user=receiver)
    obj = FriendshipNotification.objects.create(
        sender=sender, receiver=receiver, friendship=friendship)
    return obj


@database_sync_to_async
def create_game_object(sender, receiver_name, game):
    receiver = CustomUser.objects.get(username=receiver_name)
    game_obj = None
    if game == 'P':
        game_obj = GameOnline.objects.create(player1=sender, player2=receiver)
        game_obj = GameOnlineSerializer(game_obj).data
    elif game == 'T':
        game_obj = OnlineGameModel.objects.create(
            player1=sender, player2=receiver)
        game_obj = OnlineGameModelSerializer(game_obj).data
    return game_obj


@database_sync_to_async
def delete_game_request(id):
    game_request = GameNotification.objects.get(id=id)
    game_request.delete()

@database_sync_to_async
def get_tour_from_db(id):
    try:
        tournament = Tournament.objects.get(id=id)
    except Exception as e:
        print(e)
    return TournamentSerializer(tournament).data
class NotificationConsumer(AsyncWebsocketConsumer):
    connected_users = []

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.group_name = None

    async def connect(self):
        if 'error' in self.scope:
            await self.close()
            return
        self.user = self.scope['user']
        self.group_name = f"notification_{self.user.id}"
        if self.user is None or 'error' in self.scope:
            await self.close()
            return

        NotificationConsumer.connected_users.append(self.user)
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        cache.set("connected_users", NotificationConsumer.connected_users)
        table = await self.online_check(True)
        await self.send_each(table)
        await self.accept()

    async def disconnect(self, close_code):
        if 'error' in self.scope:
            return
        table = await self.online_check(False)
        await self.send_each(table)
        NotificationConsumer.connected_users.remove(self.user)
        cache.set("connected_users", NotificationConsumer.connected_users)
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
            data = json.loads(text_data)
            types = data['type']
            if types == 'game_request':
                await self.handle_game_request(data)
            elif types == 'friend_request':
                await self.handle_friend_request(data)
            elif types == 'accept_game':
                await self.handle_accept_game(data)
            elif types == 'reject_game':
                await self.handle_reject_game(data)
            elif types == 'tour_invite':
                await self.handle_tour_invite(data)

    async def game_request(self, event):
        await self.send(text_data=json.dumps(event))

    async def game_accept(self, event):
        await self.send(text_data=json.dumps(event))

    async def friend_request(self, event):
        await self.send(text_data=json.dumps(event))

    async def online_state(self, event):
        await self.send(text_data=json.dumps(event))

    async def tour_invite(self, event):
        await self.send(text_data=json.dumps(event))

    # handle notifications events
    
    # handle the tournament invitations
    async def handle_tour_invite(self, data):
        user = json.loads(data['receiver'])
        tour = await get_tour_from_db(data['tour_id'])
        receiver_id = user['id']
        await self.channel_layer.group_send(f'notification_{receiver_id}', {
            'type': 'tour_invite',
            'from': tour["creator"]["username"],
            'to': user['username'],
        })

    async def handle_game_request(self, data):
        game_type = data['game']
        receiver_id = await create_game_db(self.user, data['receiver'], game_type)
        await self.channel_layer.group_send(f'notification_{receiver_id}', {
            'type': 'game_request',
            'from': self.user.username,
            'from_img': str(self.user.profile_image.url) if self.user.profile_image else None,
            'to': data['receiver'],
            "game_type": game_type
        })

    async def handle_friend_request(self, data):
        obj = await create_friend_db(self.user, data['receiver'])
        await self.channel_layer.group_send(f'notification_{obj.receiver.id}', {
            'type': 'friend.request',
            'Friendship_id': FriendshipNotificationSerializer(obj).data
        })

    async def handle_accept_game(self, data):
        game_type = data['game']
        game_object = await create_game_object(self.user, data['receiver'], game_type)
        await self.channel_layer.group_send(f'notification_{game_object["player1"]["id"]}', {
            'type': 'game.accept',
            'from': game_object["player1"]["username"],
            'to': game_object["player2"]["username"],
            'game_id': game_object['id'],
            'game_type': data['game']
        })
        await self.channel_layer.group_send(f'notification_{game_object["player2"]["id"]}', {
            'type': 'game.accept',
            'from': game_object["player1"]["username"],
            'to': game_object["player2"]["username"],
            'game_id': game_object['id'],
            'game_type': data['game']
        })

    async def handle_reject_game(self, data):
        await delete_game_request(data['id'])

    @database_sync_to_async
    def online_check(self, state, ingame=False  , game_type=None):
            current_online_users = [*NotificationConsumer.connected_users]
            current_online_users.remove(self.user)
            friends = Friendship.objects.select_related('from_user', 'to_user')\
                .filter(Q(request='A'))
            users_list = []
            if state is False:
                self.user.last_time = timezone.now()
                self.user.save()
            for obj in friends:
                if self.user != obj.from_user:
                    users_list.append(obj.from_user)
                elif self.user != obj.to_user:
                    users_list.append(obj.to_user)
            connected_users = cache.get('connected_users')
            if connected_users is not None and self.user in connected_users:
                connected_users.remove(self.user)
            online_users = []
            for obj in users_list:
                if obj in connected_users:
                    online_users.append(obj)
            data_send = []
            for obj in users_list:
                if obj in online_users:
                    user_s = playerSerializers(self.user).data
                    if ingame == True:
                        user_s['game_type'] = game_type
                    data_send.append({"receiver": f'notification_{obj.id}', "obj": {
                        'type': "online.state",
                        'user': user_s,
                        'online': state,
                        'ingame': ingame,
                    }})
            return data_send
    
    async def online_state(self, event):
        await self.send(text_data=json.dumps(event))

    async def send_each(self, table):
        if table is None:
            return
        for obj in table:
            await self.channel_layer.group_send(obj['receiver'], obj['obj'])

    async def game_state(self, event):
        table = []
        table = await self.online_check(True, event['ingame'], event['game_type'])
        await self.send_each(table)

    async def event_tournament(self,event):
        players = event["data"]["players"]
        data = event["data"]
        for player in players:
            await self.channel_layer.group_send(f'notification_{player["id"]}',{
                "type":"tour_notification",
                "data": data["name"],
            })
    
    async def game_tourstart(self,event):
        matches = event["games"]

    async def tour_notification(self,event):
        await self.send(text_data = json.dumps(event))