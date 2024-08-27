import json
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
from .game_logic import TicTacToe
from .models import OnlineGameModel
from users.models import CustomUser
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from django.core.cache import cache
from channels.layers import get_channel_layer



channle_layer = get_channel_layer()


class Room:
    def __init__(self):
        self.players = {"X": None, "O": None}
        self.countdown_task = None
        self.reconnect_countdown_task = None
        self.reconnect_countdown_value = 0

    def add_player(self, player):
        for role in self.players:
            if self.players[role] is None:
                self.players[role] = player
                return role
        return None


    def get_player(self, role):
        return self.players[role]

    def remove_player(self, player):
        for role in self.players:
            if self.players[role] == player:
                self.players[role] = None
                return role
        return None

    def are_both_players_present(self):
        return all(player is not None for player in self.players.values())

    def start_countdown(self, countdown_coroutine):
        if self.countdown_task:
            self.countdown_task.cancel()
        self.countdown_task = asyncio.create_task(countdown_coroutine)

    def cancel_countdown(self):
        if self.countdown_task:
            self.countdown_task.cancel()
            self.countdown_task = None
            

    def start_reconnect_countdown(self, countdown_coroutine):
        if self.reconnect_countdown_task:
            self.reconnect_countdown_task.cancel()
        self.reconnect_countdown_task = asyncio.create_task(countdown_coroutine)

    def cancel_reconnect_countdown(self):
        if self.reconnect_countdown_task:
            self.reconnect_countdown_task.cancel()
            self.reconnect_countdown_task = None
            self.reconnect_countdown_value = 0




class TicTacToeConsumer(AsyncWebsocketConsumer):
    global_room = Room()
    global_game = TicTacToe()
    users_ingame = []

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = None
        self.room_group_name = None
        self.room = TicTacToeConsumer.global_room
        self.user = None
        self.game = TicTacToeConsumer.global_game
        self.game_record = None

    async def connect(self):
        if 'error' in self.scope:
            await self.close()
            return
        self.user = self.scope.get('user')

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"game_{self.room_name}"
        self.player_role = self.room.add_player(self.user)
        TicTacToeConsumer.users_ingame.append(self.user)
        await  channle_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': 'tic tac teo',
            'ingame': True,
        })
        cache.set('users_tictactoe', TicTacToeConsumer.users_ingame)
        if self.player_role:
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
            self.game_record = await database_sync_to_async(OnlineGameModel.objects.get)(id=self.room_name)
            await self.channel_layer.group_send(self.room_group_name, {
                'type': 'game.update',
                'state': self.game.board,
                'winner_line': self.game.winner_line,
                'winner': self.game.winner,
                'score_x': self.game.x_score,
                'score_o': self.game.o_score,
                'final_winner': self.game.final_winner,
                'countdown': self.game.countdown_value,
                'player_role': self.player_role
            })
            await asyncio.create_task(self.update_record())
            if self.room.reconnect_countdown_task and not self.room.reconnect_countdown_task.done():
                self.room.cancel_reconnect_countdown()
            if self.room.are_both_players_present():
                self.room.start_countdown(self.start_countdown())
        else:
            await self.close()

    async def disconnect(self, close_code):
        self.room.remove_player(self.user)
        TicTacToeConsumer.users_ingame.remove(self.user)
        await channle_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': None,
            'ingame': False,
        })
        cache.set('users_tictactoe',TicTacToeConsumer.users_ingame)
        if not self.room.are_both_players_present():
            self.room.start_reconnect_countdown(self.disconnect_countdown())
            self.room.cancel_countdown()
            self.game.reset_game()
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


    async def disconnect_countdown(self):
        try:
            self.room.reconnect_countdown_value = 15
            while self.room.reconnect_countdown_value > 0:
                await asyncio.sleep(1)
                self.room.reconnect_countdown_value -= 1
                await self.channel_layer.group_send(self.room_group_name, {
                    'type': 'handle.reconnect',
                    'reconnect_countdown': self.room.reconnect_countdown_value,
                })
        except asyncio.CancelledError:
            pass


    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')
        index = data.get('index')
        if action == 'move':
            if not self.room.are_both_players_present():
                return
            move_made = self.game.make_move(index, self.player_role)
            if move_made:
                await self.channel_layer.group_send(self.room_group_name, {
                    'type': 'game.update',
                    'state': self.game.board,
                    'winner_line': self.game.winner_line,
                    'winner': self.game.winner,
                    'score_x': self.game.x_score,
                    'score_o': self.game.o_score,
                    'final_winner': self.game.final_winner,
                    'countdown': self.game.countdown_value,
                    'player_role': self.player_role
                })
                await asyncio.create_task(self.update_record())
            if self.game.winner is not None:
                asyncio.create_task(self.reset_game())

    async def reset_game(self):
        await asyncio.sleep(5)
        await asyncio.create_task(self.update_record())
        await self.game.reset_game()
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'game.update',
            'state': self.game.board,
            'winner_line': None,
            'winner': None,
            'final_winner': None,
            'score_x': self.game.x_score,
            'score_o': self.game.o_score,
            'countdown': self.game.countdown_value,
            'player_role': self.player_role
        })

    async def start_countdown(self):
        try:
            while self.game.countdown_value > 0 and not self.game.game_over:
                await asyncio.sleep(1)
                self.game.countdown_value -= 1
                await self.channel_layer.group_send(self.room_group_name, {
                    'type': 'game.update',
                    'state': self.game.board,
                    'winner': self.game.winner,
                    'final_winner': self.game.final_winner,
                    'winner_line': self.game.winner_line,
                    'score_x': self.game.x_score,
                    'score_o': self.game.o_score,
                    'countdown': self.game.countdown_value,
                    'player_role': self.player_role
                })
        except asyncio.CancelledError:
            pass
        finally:
            if self.game.countdown_value <= 0 or self.game.game_over:
                self.game.check_game_over()
                await self.channel_layer.group_send(self.room_group_name, {
                    'type': 'game.update',
                    'state': self.game.board,
                    'winner': self.game.winner,
                    'final_winner': self.game.final_winner,
                    'winner_line': self.game.winner_line,
                    'score_x': self.game.x_score,
                    'score_o': self.game.o_score,
                    'countdown': self.game.countdown_value,
                    'player_role': self.player_role
                })
                await asyncio.create_task(self.update_record())

    async def game_update(self, event):
        await self.send(text_data=json.dumps({
            'state': event['state'],
            'winner': event['winner'],
            'winner_line': event['winner_line'],
            'score_o': event['score_o'],
            'score_x': event['score_x'],
            'countdown': event.get('countdown'),
            'final_winner': event.get('final_winner'),
            'player_role': self.player_role
        }))
    
    async def handle_reconnect(self, event):
        await self.send(text_data=json.dumps({
            'reconnect_countdown': event.get('reconnect_countdown')
        }))
    
    async def update_record(self):
        if self.game_record:
            self.game_record.score_x = self.game.x_score
            self.game_record.score_o = self.game.o_score
            if self.game.final_winner:
                self.game_record.final_winner = self.room.get_player(self.game.final_winner)
            await database_sync_to_async(self.game_record.save)()