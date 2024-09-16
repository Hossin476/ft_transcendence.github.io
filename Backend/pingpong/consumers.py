import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .gamelogic.game import GameLogic
from .models import GameOnline, GameOffline
from channels.db import database_sync_to_async
from users.models import CustomUser
from django.core.cache import cache
from channels.layers import get_channel_layer
import sys


channle_layer = get_channel_layer()

@database_sync_to_async
def getPlayers(match):
    match.is_start = True
    match.save()
    print(match.player1)
    players = {"player1": match.player1, "player2": match.player2}
    return players

class RoomObject:

    def __init__(self):
        self.creater_user = None
        self.player1 = None
        self.player2 = None
        self.task = None
        self.player1_connect = False
        self.player2_connect = False
        self.match = None
        self.game = None
        self.start = False
        self.pause = False
        self.game_end = False
        self.stopMessage = None

    def setPlayer1(self, player):
        self.player1 = player
        return self
    
    def setPlayer2(self, player):
        self.player2 = player
        return self


class GameConsumer(AsyncWebsocketConsumer):
    user_in_Game_pingpong = []
    game_room = {}

    async def connect(self):
        if "error" in self.scope:
            await self.close()
            return
        self.user = self.scope['user']

        self.game_id = self.scope["url_route"]["kwargs"]["game_id"]

        self.game_group_id = f"game_{self.game_id}"

        GameConsumer.user_in_Game_pingpong.append(self.user)

        cache.set("users_pingpong", GameConsumer.user_in_Game_pingpong) 

        await channle_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': 'ping pong',
            'ingame': True
        })

        await self.accept()

        await self.channel_layer.group_add(self.game_group_id, self.channel_name)
        if self.game_group_id not in GameConsumer.game_room:
            GameConsumer.game_room[self.game_group_id] = None
            match = await database_sync_to_async(GameOnline.objects.get)(id=int(self.game_id))
            players = await getPlayers(match)
            GameConsumer.game_room[self.game_group_id] = RoomObject().setPlayer1(players['player1'])
            room_obj = GameConsumer.game_room[self.game_group_id]
            room_obj.match = match
            room_obj.setPlayer2(players["player2"])
            room_obj.game = GameLogic('online')
            room_obj.task = asyncio.create_task(self.send_data(room_obj.match.id))
        room_obj = GameConsumer.game_room[self.game_group_id]
        while(room_obj == None):
            room_obj = GameConsumer.game_room[self.game_group_id]
            await asyncio.sleep(1)
        if self.user == room_obj.player1:
            room_obj.player1_connect = True
        elif self.user == room_obj.player2:
            room_obj.player2_connect = True
        

    async def receive(self, text_data):
        # Retrieve the game room object using the game group ID
        room_obj = GameConsumer.game_room[self.game_group_id]

        # Parse the incoming data from JSON
        data = json.loads(text_data)

        # If the incoming data is a move command
        if data["type"] == "move_paddle":
            # If the user is player 1, handle the paddle move for the other player
            if self.user == room_obj.player1:
                room_obj.game.handle_paddle_other(data['move'])
            # If the user is player 2, handle the paddle move for this player
            elif self.user == room_obj.player2:
                room_obj.game.handle_paddle(data["move"])

        # If the incoming data is a start command
        elif data['type'] == 'start':
            # Set the start flag to True
            room_obj.start = True
            # Prepare the game start message
            data = {'type': 'game.start'}
            # Send the game start message to the group
            await self.channel_layer.group_send(self.game_group_id, data)

        # If the incoming data is a pause command, and the game is not already paused, and both players have pause commands left
        elif data['type'] == 'pause' and room_obj.pause is False and room_obj.game.pause1 > 0 and room_obj.game.pause2 > 0:
            # If the user is player 1, decrement player 1's pause count
            if self.user == room_obj.player1:
                room_obj.game.pause1 -= 1
            # If the user is player 2, decrement player 2's pause count
            elif self.user == room_obj.player2:
                room_obj.game.pause2 -= 1
            # Set the pause flag to True
            room_obj.pause = True
            # Set the stop message to indicate who paused the game
            room_obj.stopMessage = f"{self.user.username} paused the game"

    # This Function called when user disconnect
    async def disconnect(self, code_status):
        if 'error' in self.scope:
            return
        await self.channel_layer.group_discard(self.game_group_id, self.channel_name)
        GameConsumer.user_in_Game_pingpong.remove(self.user)
        cache.set("users_pingpong", GameConsumer.user_in_Game_pingpong)
        await channle_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': None,
            'ingame': False
        })
        if self.game_group_id in GameConsumer.game_room:
            room_obj = GameConsumer.game_room[self.game_group_id]
            if room_obj.game_end:
                self.close()
                room_obj.task.cancel()
                return
            else:
                if self.user == room_obj.player1:
                    room_obj.player1_connect = False
                else:
                    room_obj.player2_connect = False

    # This function is used to  manage the game pauses, starts, reconnections, and game logic .

    async def send_data(self, matchId):
        # this line retrieves  the game object from the global list that holds all games currenly running games.
        room_obj = GameConsumer.game_room[self.game_group_id]
        game = room_obj.game
        time_stamp = 15
        print("start game ")
        for i in range(0,time_stamp):
            print("wait to start 1")
            await self.channel_layer.group_send(self.game_group_id,{
                "type": "before.start",
                "message" : f"{time_stamp - i} seconds to start the game",
                "time" : time_stamp - i

            })
            await asyncio.sleep(1)
        room_obj.start = True


        #  This loop works if one or both users disconnect. it give them 30 seconds to reconnect .
        #  if neither user returns to the game, it gets canceled and is not stored  in databse.
        #  However if one user remains in the game, wait for the other player
        #  that player will win the game with score of 3-0
        print("connect player 1 : ", room_obj.player1_connect)
        print("connect player 2 : ", room_obj.player2_connect)
        try:
            while True:
                # time ot wait
                timeSpand = 30
                # Check  both  players to  see if one or both are not connected
                while room_obj.player1_connect == False or room_obj.player2_connect == False:
                    # Substract 1 from the timestamp
                    timeSpand -= 1
                    # This data is sent to the connected user showing the remaining time.
                    data = {
                        'type': 'game.waiting',
                        'iswaiting': True,
                        'currentSecond': timeSpand,
                        'status': 'reconnect',
                        'message':  "wait for your opponent to reconnect"
                    }
                    # This condition  checks if the time has ended when the time reaches 0 the connected player is set as winner.
                    print(timeSpand)
                    # Create a task to either save the result in the database or remove the object from it if both players are disconnected.
                    if timeSpand == 0:
                        await asyncio.create_task(game.reconnect(room_obj.player1_connect, room_obj.player2_connect, int(self.game_id)))
                        room_obj.game_end = True
                        data['iswaiting'] = False
                        await self.channel_layer.group_send(self.game_group_id, data)
                        await self.winner()
                        return

                    # Here , the data is sent to  the user,  and the program sleeps for  1 second between each frame.
                    await self.channel_layer.group_send(self.game_group_id, data)
                    await asyncio.sleep(1)
                    # Check if both players reconnect. Send a frame to the frontend. Stop the countdown.
                    if room_obj.player1_connect == True and room_obj.player2_connect == True:
                        data['iswaiting'] = False
                        await self.channel_layer.group_send(self.game_group_id, data)

                # chech is the game is start
                if room_obj.start == False:
                    await asyncio.sleep(1/60)
                    continue
                # this used to stop game 15 second if one of players pause the game
                if room_obj.pause == True:
                    # how mush  time in each stop
                    timeSpand = 15
                    data = {
                        'type': 'game.waiting',
                        'iswaiting': True,
                        'currentSecond': timeSpand,
                        'status': 'pause',
                        'message': room_obj.stopMessage
                    }
                    # countdown  and sender
                    while timeSpand >= 0:
                        timeSpand -= 1
                        data['currentSecond'] = timeSpand
                        await asyncio.sleep(1)
                        await self.channel_layer.group_send(self.game_group_id, data)
                    # after the 15 second finish send frame to remind to palyers to continue the game
                    data['iswaiting'] = False
                    room_obj.pause = False
                    await self.channel_layer.group_send(self.game_group_id, data)
                    continue
                # this is function handle game logic
                room_obj.game.gameMove(matchId)
                # set the game in varail to make code clean
                game = room_obj.game
                # this data needed to  move the ball and paddles
                data = {
                    "type": "game.update",
                    "ball_position": list(game.ball_position.values()),
                    "paddle_one_position": game.paddle_one_position,
                    "paddle_two_position": game.paddle_two_position,
                }

                await self.channel_layer.group_send(self.game_group_id, data)
                # this is use to make the game work  60 fps
                # 60 fps means 60 frame per second in otherward  60 data per second
                await asyncio.sleep(1/60)
                # check is one of players is win
                if game.score1 == 7 or game.score2 == 7:
                    game.game_end = True
                    await self.winner()
                    break
        except Exception as e:
            print('error have here :', e)

    # Those functions used to send data to all connected sockets in the group
    # depend on the type of data. Each type has its own function with the same name to handle it.

    async def game_update(self, event):
        room_obj = GameConsumer.game_room[self.game_group_id]
        if self.user == room_obj.player1:
            event[self.user.username] = room_obj.game.score2
            event['other'] = room_obj.game.score1
        else:
            event[self.user.username] = room_obj.game.score1
            event['other'] = room_obj.game.score2
        await self.send(text_data=json.dumps(event))

    async def game_start(self, event):
        self.send(text_data=json.dumps(event))

    async def game_waiting(self, event):
        await self.send(text_data=json.dumps(event))

    async def game_winner(self, event):
        await self.send(text_data=json.dumps(event))
    
    async def before_start(self, event):
        await self.send(text_data=json.dumps(event))

    async def winner(self):
        room_obj = GameConsumer.game_room[self.game_group_id]
        winner = None
        if room_obj.game.score1 > room_obj.game.score2:
            winner = room_obj.player1.username
        else:
            winner = room_obj.player2.username
        data = {
            'type': 'game.winner',
            'winner': winner
        }
        await self.channel_layer.group_send(self.game_group_id, data)
        # await self.disconnect(2000)





class LocalGameConsumer(AsyncWebsocketConsumer):
    game_room = {}

    async def connect(self, *args, **kwargs):

        if "error" in self.scope:
            await self.close()
            return
        self.user = self.scope['user']
        self.game_id = self.scope["url_route"]["kwargs"]["game_id"]
        self.game_group_id = f'game_{self.game_id}'
        print(self.game_group_id)
        if self.game_group_id not in LocalGameConsumer.game_room:
            match = await database_sync_to_async(GameOffline.objects.get)(id=self.game_id)
            LocalGameConsumer.game_room[f"game_{match.id}"] = RoomObject(
            ).setPlayer1(self.user)
            LocalGameConsumer.game_room[f"game_{match.id}"].match = match
        room_obj = LocalGameConsumer.game_room[self.game_group_id]
        self.game_group_id = f"game_{room_obj.match.id}"
        await self.channel_layer.group_add(self.game_group_id, self.channel_name)
        await channle_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': 'ping pong',
            'ingame': True
        })
        await self.accept()
        if room_obj.creater_user is None:
            room_obj.creater_user = self.user
            room_obj.game = GameLogic('offline')
            room_obj.task = asyncio.create_task(self.send_data(self.game_id))

    async def receive(self, text_data):
        data = json.loads(text_data)
        room_obj = LocalGameConsumer.game_room[self.game_group_id]
        if data['type'] == 'move_paddle':
            room_obj.game.handle_paddle(data['move'])
        elif data['type'] == 'move_paddle_two':
            room_obj.game.handle_paddle_other(data['move'])
        elif data['type'] == 'start':
            room_obj.start = True
            data = {'type': 'game.start'}
        elif data['type'] == 'pause' and room_obj.pause is False:
            room_obj.pause = True
            room_obj.stopMessage = f"you paused the game"

    async def disconnect(self, code_status):
        await channle_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': None,
            'ingame': False
        })
        await self.channel_layer.group_discard(self.game_group_id, self.channel_name)

    async def send_data(self, matchId):
        room_obj = LocalGameConsumer.game_room[self.game_group_id]
        game = None
        time_stamp = 15
        for i in range(0,time_stamp):
            await self.channel_layer.group_send(self.game_group_id,{
                "type": "before.start",
                "message" : f"{time_stamp - i} seconds to start the game",
                "time" : time_stamp - i
            })
            await asyncio.sleep(1)
        await asyncio.sleep(4)
        while True:

            if room_obj.pause == True:
                    # how mush  time in each stop
                    timeSpand = 15
                    data = {
                        'type': 'game.waiting',
                        'iswaiting': True,
                        'currentSecond': timeSpand,
                        'status': 'pause',
                        'message': room_obj.stopMessage
                    }
                    # countdown  and sender
                    while timeSpand >= 0:
                        timeSpand -= 1
                        data['currentSecond'] = timeSpand
                        await asyncio.sleep(1)
                        await self.channel_layer.group_send(self.game_group_id, data)
                    # after the 15 second finish send frame to remind to palyers to continue the game
                    data['iswaiting'] = False
                    room_obj.pause = False
                    await self.channel_layer.group_send(self.game_group_id, data)
                    continue
            if room_obj.start == False:
                await asyncio.sleep(1/60)
                continue
            room_obj.game.gameMove(matchId)
            game = room_obj.game
            data = {
                "type": "game.update",
                "ball_position": list(game.ball_position.values()),
                "paddle_one_position": game.paddle_one_position,
                "paddle_two_position": game.paddle_two_position,
            }
            await self.channel_layer.group_send(self.game_group_id, data)
            await asyncio.sleep(1/60)
            if game.score1 == 7 or game.score2 == 7:
                game.game_end = True
                await self.winner()
                break

    async def game_update(self, event):
        room_obj = LocalGameConsumer.game_room[self.game_group_id]
        event['score1'] = room_obj.game.score2
        event['score2'] = room_obj.game.score1
        await self.send(text_data=json.dumps(event))

    async def game_start(self, event):
        self.send(text_data=json.dumps(event))

    async def game_waiting(self, event):
        await self.send(text_data=json.dumps(event))
    
    async def before_start(self, event):
        await self.send(text_data=json.dumps(event))

    async def game_winner(self, event):
        await self.send(text_data=json.dumps(event))

    async def winner(self):
        room_obj = LocalGameConsumer.game_room[self.game_group_id]
        winner = None
        if room_obj.game.score1 > room_obj.game.score2:
            winner = room_obj.player1
        else:
            winner = room_obj.player2
        data = {
            'type': 'game.winner',
            'winner': winner
        }
        print("winner send ")
        await self.channel_layer.group_send(self.game_group_id, data)