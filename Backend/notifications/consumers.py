from channels.generic.websocket import AsyncWebsocketConsumer
from .models import GameNotification, FriendshipNotification
import json
from channels.db import database_sync_to_async
from users.models import CustomUser,Friendship
from tictactoe.models import OnlineGameModel
from pingpong.models import GameOnline


@database_sync_to_async
def create_game_db(sender, receiver_id, game):

    receiver = CustomUser.objects.get(id=receiver_id)

    GameNotification.objects.create(
        sender=sender, receiver=receiver, game=game)


@database_sync_to_async
def create_friend_db(sender, receiver_id):
    receiver = CustomUser.objects.get(id=receiver_id)
    friendship = Friendship.objects.create(from_user=sender, to_user=receiver)
    FriendshipNotification.objects.create(
        sender=sender, receiver=receiver, friendship=friendship)


@database_sync_to_async
def create_game_object(sender, receiver_id, game):
    receiver = CustomUser.objects.get(id=receiver_id)
    if game == 'P':
        game_obj = GameOnline.objects.create(sender, receiver)
    elif game == 'T':
        game_obj = OnlineGameModel.objects.create(sender, receiver)
    else:
        print("invalid game type!")
    return game_obj


@database_sync_to_async
def delete_game_request(receiver, sender_id, game):
    sender = CustomUser.objects.get(id=sender_id)
    game_request = GameNotification.objects.get(
        sender=sender, receiver=receiver, game=game)
    game_request.delete()


class NotificationConsumer(AsyncWebsocketConsumer):
    connected_users = []

    def __init__(self, *args, **kwargs):
        self.user = None

    async def connect(self):
        self.user = self.scope['user']
        if self.user is None or 'error' in self.scope:
            await self.close()
            return

        connected_users.append(self.user)
        self.channel_layer.group_add(self.user.username, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        connected_users.remove(self.user)
        await self.channel_layer.group_discard(self.user.username, self.channel_name)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            types = data['type']
            if types == 'game_request':
                game_type = data['game']
                create_game_db(self.user, data['receiver'], game_type)
            elif types == 'friend_request':
                create_friend_db(self.user, data['receiver'])
            elif types == 'accept_game':
                game_object = create_game_object(
                    self.user, data['receiver'], game_type)
            elif types == 'reject_game':
                delete_game_request(self.user, data['receiver'], game_type)

            await self.group_send(self.user.username, {
                'type': 'send.request'
            })
        except Exception as e:
            print(f"Error in receive: {e}")

    async def send_request(self, event):
        await self.send(text_data=json.dumps({

        }))

    async def accept_game_request(self, event):
        await self.send(text_data=json.dumps({

        }))
