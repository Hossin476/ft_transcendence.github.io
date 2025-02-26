from channels.generic.websocket import AsyncWebsocketConsumer
from .models import GameNotification, FriendshipNotification
import json
from django.db.models import Q
from channels.db import database_sync_to_async
from users.models import CustomUser, Friendship, Block
from tictactoe.models import OnlineGameModel
from pingpong.models import GameOnline
from .serializers import FriendshipNotificationSerializer, playerSerializers
from users.serializers import BlockSerializer
from pingpong.serializers import GameOnlineSerializer
from tictactoe.serializers import OnlineGameModelSerializer
from django.core.cache import cache
from django.utils import timezone
from tournament.models import Tournament, InviteTournament
from tournament.serializers import TournamentSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import asyncio

channel_layer = get_channel_layer()



@database_sync_to_async
def change_online_state(user, state):
    try:
        user = CustomUser.objects.get(id=user.id)
        user.is_online = state
        user.save()
    except Exception as e:
        print(str(e))


@database_sync_to_async
def create_game_db(sender, receiver, game):
    try:
        receiver_obj = CustomUser.objects.get(username=receiver)
        if(GameNotification.objects.filter(sender=sender, receiver=receiver_obj, game=game).count() != 0):
            raise ValueError("You have already sent a request to this user.")
        invite = GameNotification.objects.create(
            sender=sender, receiver=receiver_obj, game=game)
        async_to_sync(channel_layer.group_send)(f'notification_{sender.id}', {
            'type': 'inform.message',
            'message': f"Game Request Was successfully sent to {receiver_obj.username}"
        })
        return {"receiver"  :receiver_obj.pk, 'invite_id'   :invite.id}
    except Exception as e:
        async_to_sync(channel_layer.group_send)(f'notification_{sender.id}', {
            'type': 'error.handle',
            'error': str(e)
        })
    return None


@database_sync_to_async
def create_friend_db(sender, receiver_id):
    try:
        if sender.username == receiver_id:
            raise ValueError("A user cannot send a friend request to himself.")
        receiver = CustomUser.objects.get(username=receiver_id)
        block = Block.objects.filter(
            Q(blocker=sender, blocked=receiver) | Q(blocker=receiver, blocked=sender)
        ).exists()
        if block:
            raise ValueError("A user cannot send a friend request to a blocked user.")
        existing_friendship = Friendship.objects.filter(
            (Q(from_user=sender, to_user=receiver) | Q(from_user=receiver, to_user=sender)) &
            Q(request__in=['P', 'A'])
        ).first()
        if existing_friendship:
            existing_notification = FriendshipNotification.objects.get(friendship=existing_friendship)
            return existing_notification, receiver.id
        friendship = Friendship.objects.create(from_user=sender, to_user=receiver, request='P')
        obj = FriendshipNotification.objects.create(
            sender=sender, receiver=receiver, friendship=friendship
        )
        return obj, receiver.id
    except Exception as e:
        async_to_sync(channel_layer.group_send)(f'notification_{sender.id}', {
            'type': 'error.handle',
            'error': str(e)
        })



@database_sync_to_async
def accept_friend_request(sender, receiver_id):
    try:
        if sender.username == receiver_id:
            raise ValueError("A user cannot send a friend accept to himself.")
        receiver = CustomUser.objects.get(username=receiver_id)
        friendship = Friendship.objects.get(from_user=receiver, to_user=sender)
        friendship.request = 'A'
        friendship.save()
    except Exception as e:
        async_to_sync(channel_layer.group_send)(f'notification_{sender.id}', {
            'type': 'error.handle',
            'error': str(e)
        })


@database_sync_to_async
def reject_friend_request(sender, receiver_id):
    try:
        if sender.username == receiver_id:
            raise ValueError("A user cannot send a friend reject to himself.")
        receiver = CustomUser.objects.get(username=receiver_id)
        friendship = Friendship.objects.get(from_user=receiver, to_user=sender)
        friendship.delete()
    except Exception as e:
        async_to_sync(channel_layer.group_send)(f'notification_{sender.id}', {
            'type': 'error.handle',
            'error': str(e)
        })

@database_sync_to_async
def unfriend_request(sender, receiver_id):
    try:
        receiver = CustomUser.objects.get(username=receiver_id)
        friendship = Friendship.objects.get(Q(from_user=receiver, to_user=sender) | Q(from_user=sender, to_user=receiver))
        friendship.delete()
    except Exception as e:
        return None

@database_sync_to_async
def block_request(sender, receiver_id):
    try:
        if sender.username == receiver_id:
            raise ValueError("A user cannot block himself.")
        receiver = CustomUser.objects.get(username=receiver_id)
        existing_block = Block.objects.filter(
            blocker=sender, blocked=receiver
        ).first()
        if existing_block:
            friendship = Friendship.objects.get(Q(from_user=receiver, to_user=sender) | Q(from_user=sender, to_user=receiver))
            if friendship:
                friendship.delete()
            return existing_block, receiver.id
        block = Block.objects.create(blocker=sender, blocked=receiver, Block_user='F')
        friendship = Friendship.objects.get(Q(from_user=receiver, to_user=sender) | Q(from_user=sender, to_user=receiver))
        if friendship:
            friendship.delete()
        return block, receiver.id
    except Exception as e:
        print(f"error : {str(e)}")


@database_sync_to_async
def unblock_request(sender, receiver_id):
    try:
        if sender.username == receiver_id:
            raise ValueError("A user cannot unblock himself.")
        receiver = CustomUser.objects.get(username=receiver_id)
        block = Block.objects.get(blocker=sender, blocked=receiver)
        block.delete()
    except Exception as e:
        async_to_sync(channel_layer.group_send)(f'notification_{sender.id}', {
            'type': 'error.handle',
            'error': str(e)
        })



@database_sync_to_async
def create_game_object(sender, receiver_name, game, invite_id):
    try:
        
        receiver = CustomUser.objects.get(username=receiver_name)
        game_obj = None
        if invite_id:
            if GameNotification.objects.filter(id=invite_id).count() != 0:
                GameNotification.objects.filter(id=invite_id).delete()
            else:
                return None
        if game == 'P':
            game_obj = GameOnline.objects.create(player1=sender, player2=receiver)
            game_obj = GameOnlineSerializer(game_obj).data
        elif game == 'T':
            game_obj = OnlineGameModel.objects.create(
                player1=sender, player2=receiver)
            game_obj = OnlineGameModelSerializer(game_obj).data
        return game_obj
    except Exception as e:
        async_to_sync(channel_layer.group_send)(f'notification_{sender.id}', {
            'type': 'error.handle',
            'error': str(e)
        })
        return None


@database_sync_to_async
def delete_game_request(invite_id):
    try:
        GameNotification.objects.filter(id=invite_id).delete()
    except Exception as e:
        print(f"error : {str(e)}")
        return None


@database_sync_to_async
def get_tour_from_db(id, userid):
    try:
        tournament = Tournament.objects.select_related("creator").get(id=id)
        user = CustomUser.objects.get(id=userid)
        try:
            InviteTournament.objects.get(tournament=tournament, user=user)
        except Exception:
            InviteTournament.objects.create(tournament=tournament, user=user)
        return TournamentSerializer(tournament).data
    except Exception as e:
        print(f'error : {str(e)}')


@database_sync_to_async
def accept_reject(tour_id, user, state):
    try:
        tournament = Tournament.objects.select_related(
            "creator").prefetch_related('players').get(id=tour_id)
        state_return = {"tour_id": tournament.id, "state": False}
        if not tournament.is_full  and state == "accept" and user not in tournament.players.all():
            tournament.players.add(user)
            count = tournament.players.count()
            if count == 8:
                tournament.is_full = True
                tournament.save()
            state_return["state"] = True
        InviteTournament.objects.filter(
            user=user, tournament=tournament).delete()
        return state_return
    except Exception as e:
        print(f'error : {str(e)}')


class NotificationConsumer(AsyncWebsocketConsumer):
    connected_users = []
    match_making ={'T': [], 'P': []}
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
        await change_online_state(self.user, True)
        table = await self.online_check(True)
        await self.send_each(table)
        await self.accept()

    async def disconnect(self, close_code):
        if 'error' in self.scope:
            return
        await change_online_state(self.user, False)
        table = await self.online_check(False)
        await self.send_each(table)
        cache.set("connected_users", NotificationConsumer.connected_users)
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        types = data['type']
        if types == 'game_request':
            await self.handle_game_request(data)
        elif types == 'friend_request':
            await self.handle_friend_request(data)
        elif types == 'friend_accept':
            await self.handle_friend_accept(data)
        elif types == 'friend_reject':
            await self.handle_friend_reject(data)
        elif types == 'unfriend_request':
            await self.handle_unfriend_request(data)
        elif types == 'block_request':
            await self.handle_block_request(data)
        elif types == 'unblock_request':
            await self.handle_unblock_request(data)
        elif types == 'accept_game':
            await self.handle_accept_game(data)
        elif types == 'reject_game':
            await self.handle_reject_game(data)
        elif types == 'tour_invite':
            await self.handle_tour_invite(data)
        elif types == 'tour_accept':
            await self.handle_tour_accept(data)
        elif types == 'tour_reject':
            await self.handle_tour_reject(data)
        elif types == 'pvpmatch_request':
            asyncio.create_task(self.handle_pvp_request(data)) 
        elif types == 'cancel_pvp':
            await self.handle_cancel_pvp(data)
        elif types == 'log_out':
            await self.disconnect(1000)


    async def inform_message(self, event):
        await self.send(text_data=json.dumps(event))

    async def game_request(self, event):
        await self.send(text_data=json.dumps(event))

    async def game_accept(self, event):
        await self.send(text_data=json.dumps(event))

    async def friend_request(self, event):
        await self.send(text_data=json.dumps(event))

    async def friend_accept(self, event):
        await self.send(text_data=json.dumps(event))

    async def friend_reject(self, event):
        await self.send(text_data=json.dumps(event))
    
    async def block_req(self, event):
        await self.send(text_data=json.dumps(event))

    async def unblock_req(self, event):
        await self.send(text_data=json.dumps(event))

    async def online_state(self, event):
        await self.send(text_data=json.dumps(event))

    async def tour_invite(self, event):
        await self.send(text_data=json.dumps(event))

    async def tour_accept(self, event):
        await self.send(text_data=json.dumps(event))

    async def tour_reject(self, event):
        await self.send(text_data=json.dumps(event))
    
    async def next_matchtour(self, event):
        await self.send(text_data=json.dumps(event))

    async def error_handle(self, message):
        await self.send(text_data=json.dumps(message))

    async def handle_tour_reject(self, data):
        await accept_reject(data["id"], self.user, "reject")

    async def handle_tour_accept(self, data):
        # print(data)
        state = await accept_reject(data["id"], self.user, "accept")
        await self.channel_layer.group_send(f'notification_{self.user.id}', {
            'type': "tour_accept",
            "message": "you have been added to  this tournament" if state["state"] else "this tournament is full",
            "response": "accepted" if state["state"] else "rejected"
        })
        # print("tournament id : ", f'tour_{state["tour_id"]}')
        await channel_layer.group_send(f'tour_{state["tour_id"]}', {
            'type': "state.change",
        })
    
    async def handle_pvp_request(self, data):
        game_type = data['gameType']
        # print ("game type is : ", game_type)
        # print("array [p]",game_type)
        if game_type == 'P' and self.user not in  NotificationConsumer.match_making['P']:
            NotificationConsumer.match_making['P'].append(self.user)
        elif game_type == 'T' and self.user not in  NotificationConsumer.match_making['T']:
            NotificationConsumer.match_making['T'].append(self.user)
        print(NotificationConsumer.match_making['P'])

        if len(NotificationConsumer.match_making[game_type]) == 2:
            
            done = False
            countr = 5
            player1 = NotificationConsumer.match_making[game_type][0]
            player2 = NotificationConsumer.match_making[game_type][1]
            
            NotificationConsumer.match_making[game_type].remove(player1)
            NotificationConsumer.match_making[game_type].remove(player2)
            
            game_obg = await create_game_object(player1, player2, game_type, None)
            
            await self.channel_layer.group_send(f'notification_{player1.id}', {
                'type'          : 'game.player_info',
                'player'        : playerSerializers(player2).data,
            })
            await self.channel_layer.group_send(f'notification_{player2.id}', {
                'type'          : 'game.player_info',
                'player'        : playerSerializers(player1).data,
            })
            while not done:
                await self.channel_layer.group_send(f'notification_{player1.id}', {
                    'type'      : 'game.counter',
                    'counter'   : countr,
                })
                await self.channel_layer.group_send(f'notification_{player2.id}', {
                    'type'      : 'game.counter',
                    'counter'   : countr,
                })
                await asyncio.sleep(1)
                countr -= 1
                if countr == 0:
                    done = True

            await self.channel_layer.group_send(f'notification_{player1.id}', {
                'type'      : 'game.accept',
                'from'      : player1.username,
                'to'        : player2.username,
                'game_id'   : game_obg['id'],
                'game_type' : game_type
            })
            await self.channel_layer.group_send(f'notification_{player2.id}', {
                'type'      : 'game.accept',
                'from'      : player1.username,
                'to'        : player2.username,
                'game_id'   : game_obg['id'],
                'game_type' : game_type
            })
            
    async def handle_cancel_pvp(self, data):
        game_type = data['gameType']
        
        if self.user in NotificationConsumer.match_making[game_type]:
            NotificationConsumer.match_making[game_type].remove(self.user)

    # handle notifications events

    # handle the tournament invitations

    async def handle_tour_invite(self, data):
        user = data['receiver']
        tour = await get_tour_from_db(data['tour_id'], user['id'])
        receiver_id = user['id']
        await self.channel_layer.group_send(f'notification_{receiver_id}', {
            'type'          : 'tour_invite',
            'from'          : tour["creator"]["username"],
            'to'            : user['username'],
            'tour_id'       : tour['id']
        })

    async def handle_game_request(self, data):
        game_type = data['game']
        info_invite = await create_game_db(self.user, data['receiver'], game_type)
        if info_invite is None:
            return
        await self.channel_layer.group_send(f'notification_{info_invite['receiver']}', {
            'type'          : 'game_request',
            'from'          : self.user.username,
            'from_img'      : str(self.user.profile_image.url) if self.user.profile_image else None,
            'to'            : data['receiver'],
            "game_type"     : game_type,
            "invite_id"     : info_invite['invite_id']
        })
        asyncio.create_task(self.check_expired(info_invite['invite_id']))

    async def check_expired(self,invite_id):
        await asyncio.sleep(30)
        await delete_game_request(invite_id) 

    async def handle_friend_request(self, data):
        try:
            receiver = data.get('receiver')
            obj, receiver_id = await create_friend_db(self.user, receiver)
            if obj and receiver_id:
                await self.channel_layer.group_send(
                    f'notification_{receiver_id}', {
                        'type': 'friend.request',
                    }
                )
        except Exception as e:
            print(str(e))

    async def handle_friend_accept(self, data):
        try:
            receiver_id = data.get('receiver')
            await accept_friend_request(self.user, receiver_id)
        except Exception as e:
            print(str(e))

    async def handle_friend_reject(self, data):
        try:
            receiver_id = data.get('receiver')
            await reject_friend_request(self.user, receiver_id)
        except Exception as e:
            print(str(e))
        
    async def handle_unfriend_request(self, data):
        try:
            receiver_id = data.get('receiver')
            await unfriend_request(self.user, receiver_id)
        except Exception as e:
            print(str(e))

    async def handle_block_request(self, data):
        try:
            receiver = data.get('receiver')
            obj, receiver_id = await block_request(self.user, receiver)
            if obj and receiver_id:
                await self.channel_layer.group_send(
                    f'notification_{self.user.id}', {
                        'type': 'block.req',
                    }
                )
        except Exception as e:
            print(f"error:  {str(e)}")

    async def handle_unblock_request(self, data):
        try:
            receiver_id = data.get('receiver')
            await unblock_request(self.user, receiver_id)
            await self.channel_layer.group_send(
                f'notification_{self.user.id}', {
                    'type': 'unblock.req',
                }
            )
        except Exception as e:
            print(f"error:  {str(e)}")

    async def handle_accept_game(self, data):
        game_type = data['game']
        game_object = await create_game_object(self.user, data['receiver'], game_type, data.get('invite_id'))
        if game_object is None:
            return
        await self.channel_layer.group_send(f'notification_{game_object["player1"]["id"]}', {
            'type'          : 'game.accept',
            'from'          : game_object["player1"]["username"],
            'to'            : game_object["player2"]["username"],
            'game_id'       : game_object['id'],
            'game_type'     : data['game']
        })
        await self.channel_layer.group_send(f'notification_{game_object["player2"]["id"]}', {
            'type'          : 'game.accept',
            'from'          : game_object["player1"]["username"],
            'to'            : game_object["player2"]["username"],
            'game_id'       : game_object['id'],
            'game_type'     : data['game']
        })

    async def handle_reject_game(self, data):
        await delete_game_request(data['invite_id'])

    @database_sync_to_async
    def online_check(self, state, ingame=False, game_type=None, user=None):
        self.user = CustomUser.objects.get(id=self.user.id)
        friends = Friendship.objects.select_related('from_user', 'to_user')\
        .filter(Q(from_user=self.user) | Q(to_user=self.user), request='A')
        users_list = []
        if state is False and self.user in NotificationConsumer.connected_users:
            NotificationConsumer.connected_users.remove(self.user)
            if self.user in NotificationConsumer.connected_users:
                return []
            self.user.last_time = timezone.now()
            self.user.is_online = False
            self.user.is_ingame = False
            self.user.game_type = None
            self.user.save()
        for obj in friends:
            if self.user != obj.from_user and obj.from_user.is_online:
                users_list.append(obj.from_user)
            elif self.user != obj.to_user and obj.to_user.is_online:
                users_list.append(obj.to_user)
        data_send = []
        user_new =  CustomUser.objects.get(username=self.user.username)
        user_s = playerSerializers(user_new).data
        for obj in users_list:
                data_send.append({"receiver": f'notification_{obj.id}', "obj": {
                    'type': "online.state",
                    'user': user_s,
                }})
        return data_send


    async def send_each(self, table):
        if table is None:
            return
        for obj in table:
            await self.channel_layer.group_send(obj['receiver'], obj['obj'])

    async def game_state(self, event):
        table = []
        table = await self.online_check(True, event['ingame'], event['game_type'], self.user)
        await self.send_each(table)

    async def event_tournament(self, event):
        players = event["data"]["players"]
        data = event["data"]
        for player in players:
            await self.channel_layer.group_send(f'notification_{player["id"]}', {
                "type": "tour_notification",
                "data": data["name"],
            })

    async def game_tourstart(self, event):
        matches = event["games"]

    async def tour_notification(self, event):
        await self.send(text_data=json.dumps(event))
    
    async def game_offline(self, event):
        await self.send(text_data=json.dumps(event))
    async def game_player_info(self, event):
        await self.send(text_data=json.dumps(event))
    async def game_counter(self, event):
        await self.send(text_data=json.dumps(event))