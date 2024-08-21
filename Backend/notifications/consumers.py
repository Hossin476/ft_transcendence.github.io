from channels.generic.websocket import AsyncWebsocketConsumer
from .models import GameNotification, FriendshipNotification
import json
from channels.db import database_sync_to_async
from users.models import CustomUser,Friendship
from tictactoe.models import OnlineGameModel
from pingpong.models import GameOnline


@database_sync_to_async
def create_game_db(sender, receiver, game):
    receiver_obj = CustomUser.objects.get(username=receiver)
    GameNotification.objects.create( sender=sender, receiver=receiver_obj, game=game)
    return receiver_obj.pk


@database_sync_to_async
def create_friend_db(sender, receiver_id):
    receiver = CustomUser.objects.get(username=receiver_id)
    friendship = Friendship.objects.create(from_user=sender, to_user=receiver)
    obj = FriendshipNotification.objects.create(sender=sender, receiver=receiver, friendship=friendship)
    return obj
    


@database_sync_to_async
def create_game_object(sender, receiver_id, game):
    receiver = CustomUser.objects.get(id=receiver_id)
    game_obj = None
    if game == 'P':
        game_obj = GameOnline.objects.create(sender, receiver)
    elif game == 'T':
        game_obj = OnlineGameModel.objects.create(sender, receiver)
    return game_obj


@database_sync_to_async
def delete_game_request(id):
    game_request = GameNotification.objects.get(id=id)
    game_request.delete()


class NotificationConsumer(AsyncWebsocketConsumer):
    connected_users = []

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.group_name = None

    async def connect(self):
        self.user = self.scope['user']
        self.group_name = f"notification_{self.user.id}"
        print( self.group_name)
        if self.user is None or 'error' in self.scope:
            await self.close()
            return

        NotificationConsumer.connected_users.append(self.user)
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        NotificationConsumer.connected_users.remove(self.user)
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            types = data['type']
            if types == 'game_request':
                game_type = data['game']
                receiver_id = await create_game_db(self.user, data['receiver'], game_type)
                print(f'notification_{receiver_id}')
                await self.channel_layer.group_send(f'notification_{receiver_id}', {
                    'type': 'game_request',
                    'from': self.user.username,
                    'to': data['receiver']
                })
            elif types == 'friend_request':
                obj = await create_friend_db(self.user, data['receiver'])
                print(obj)
                self.channel_layer.group_send(f'notification_{obj.receiver.id}',{
                    'type': 'friend.request',
                    'Friendship_id': obj.friendship
                })

            elif types == 'accept_game':
                game_object = await create_game_object(self.user, data['receiver'], game_type)
                await self.channel_layer.group_send(f'notification_{game_object.palyer1.id}', {
                'type': 'game.accept',
                'from': game_object.palyer1.username,
                'to': game_object.palyer2.username,
                'game': game_object.id,
                })
                await self.channel_layer.group_send(f'notification_{game_object.palyer2.id}', {
                'type': 'game.accept',
                'from': game_object.palyer1.username,
                'to': game_object.palyer2.username,
                'game': game_object.id,
                })

            elif types == 'reject_game':
                await delete_game_request(data['id'])
        except Exception as e:
            print(f"Error in receive: {e}")
        
    async def game_request(self, event):
        print("event is :", event)
        await self.send(text_data=json.dumps({
            'game': event.get('game'),
            'from': event.get('from'),
            'to': event.get('to')
        }))
    
    async def game_accept(self, event):
        await self.send(text_data=json.dumps(event))
    

    async def friend_request(self, event):
        await self.send(text_data=json.dumps(event))
        
