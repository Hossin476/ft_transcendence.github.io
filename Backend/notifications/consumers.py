from channels.generic.websocket import AsyncWebsocketConsumer
from .models import GameNotification, FriendshipNotification
import json
from channels.db import database_sync_to_async
from users.models import CustomUser
from users.models import Friendship
from tictactoe.models import OnlineGameModel



@database_sync_to_async
def create_game_db(sender, receiver_id, game):
    
    receiver = CustomUser.objects.get(id=receiver_id)
    
    GameNotification.objects.create(sender=sender, receiver=receiver, game=game)

@database_sync_to_async
def create_friend_db(sender, receiver_id):
    
    receiver = CustomUser.objects.get(id=receiver_id)
    friendship = Friendship.objects.create(from_user=sender, to_user=receiver)
    FriendshipNotification.objects.create(sender=sender, receiver=receiver, friendship=friendship)
    
@database_sync_to_async
def create_game_object(sender, receiver_id, game):
    if game == 'P':
        receiver = CustomUser.objects.get(id=receiver_id)
        # OnlineGameModel.objects.create(player1=sender, player2=)
    # TODO: creating the game objects, either tictactoe or pingpong, depending on the game type
    








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
        self.channel_layer.group_add(self.user.username ,self.channel_name)
        await self.accept()



    async def disconnect(self, close_code):
        connected_users.remove(self.user)
        await self.channel_layer.group_discard(self.user.username, self.channel_name)
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        
        types = data['type']
        if types == 'game_request':
            game_type = data['game']
            create_game_db(self.user, data['receiver'], game_type)
        elif types == 'friend_request':
            create_friend_db(self.user, data['receiver'])
        elif types == 'accept_game':
            
            

        await self.group_send(self.user.username, text_data= json.dumps({
            
        }))