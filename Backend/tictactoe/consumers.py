import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from channels.layers import get_channel_layer
from django.core.cache import cache
from .game_logic import TicTacToe
from .models import OnlineGameModel
from users.models import CustomUser
from asgiref.sync import sync_to_async

channel_layer = get_channel_layer()


class Room:
    def __init__(self):
        self.players = {"X": None, "O": None}
        self.tasks = {
            "game_countdown": None,
            "reconnect_countdown": None,
            "start_countdown": None
        }
        self.countdown_values = {
            "reconnect": 15,
            "start": 15
        }
        self.lock = asyncio.Lock()

    async def add_player(self, player):
        async with self.lock:
            if player in self.players.values():
                raise Exception("Player is already in the game")
            for role, assigned_player in self.players.items():
                if assigned_player is None:
                    self.players[role] = player
                    return role
            raise Exception("Game is full")

    async def remove_player(self, player):
        async with self.lock:
            for role, assigned_player in self.players.items():
                if assigned_player == player:
                    self.players[role] = None
                    return role
            return None

    def are_both_players_present(self):
        return all(self.players.values())

    async def are_both_players_absent(self):
        return all(player is None for player in self.players.values())

    async def start_task(self, task_name, coroutine):
        async with self.lock:
            if self.tasks.get(task_name):
                self.tasks[task_name].cancel()
                self.tasks[task_name] = None
            try:
                self.tasks[task_name] = asyncio.create_task(coroutine)
            except Exception as e:
                await self.send_error(f"Failed to start task {task_name}: {e}")


    async def cancel_task(self, task_name):
        async with self.lock:
            if self.tasks.get(task_name):
                self.tasks[task_name].cancel()
                self.tasks[task_name] = None


class TicTacToeConsumer(AsyncWebsocketConsumer):
    rooms = {}
    games = {}
    users_ingame = set()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.game_id = None
        self.room_group_name = None
        self.user = None
        self.game_record = None
        self.player_role = None
        self.room = None
        self.game = None

    async def connect(self):
        if self.scope.get('error'):
            await self.close()
            return

        self.user = self.scope.get('user')
        if not self.user:
            await self.close()
            return

        self.game_id = self.scope['url_route']['kwargs'].get('game_id')
        if not self.game_id:
            await self.close()
            return

        try:
            await self.initialize_game_and_room()
            await self.accept()
            await self.send_game_update()
            await self.handle_player_connection()
        except Exception as e:
            await self.send_error(f"An error occurred: {str(e)}")
            await self.close()
            return

    async def initialize_game_and_room(self):
        self.room = self.rooms.get(self.game_id)
        self.game = self.games.get(self.game_id)

        if not self.room:
            self.room = Room()
            self.rooms[self.game_id] = self.room

        if not self.game:
            self.game = TicTacToe()
            self.games[self.game_id] = self.game

        self.room_group_name = f"game_{self.game_id}"
        try:
            self.player_role = await self.room.add_player(self.user)
        except Exception as e:
            await self.send_error(f"Could not add player: {str(e)}")
            raise

        await self.send_game_state_notification(True)
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        self.game_record = await self.get_game_record()

    async def handle_player_connection(self):
        if self.room.are_both_players_present() and not self.game.start:
            await self.room.start_task('start_countdown', self.start_countdown())

        if self.room.tasks['reconnect_countdown'] and not self.game.game_over and self.game.final_winner is None:
            await self.room.cancel_task('reconnect_countdown')
            if self.game.winner is not None:
                asyncio.create_task(self.reset_game())

        if self.game.start and self.room.tasks['game_countdown'] is None:
            await self.room.start_task('game_countdown', self.game_countdown())

    async def disconnect(self, close_code):
        if not self.user or not self.game_id or self.scope.get('error'):
            return

        try:
            await self.room.remove_player(self.user)
            await self.send_game_state_notification(False)
            await self.handle_player_disconnection()
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        except Exception as e:
            await self.send_error(f"Error during disconnect: {e}")

    async def handle_player_disconnection(self):
        if not self.room.are_both_players_present() and not self.game.game_over and self.game.final_winner is None:
            await self.room.start_task('reconnect_countdown', self.disconnect_countdown())

        await self.room.cancel_task('game_countdown')

        if await self.room.are_both_players_absent():
            await database_sync_to_async(self.game_record.delete)()
            self.rooms.pop(self.game_id, None)
            self.games.pop(self.game_id, None)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            action = data.get('action')
            index = data.get('index')

            if action == 'move' and self.game.start and not self.game.game_over:
                move_made = self.game.make_move(index, self.player_role)
                if move_made:
                    await self.send_game_update()
                    await self.update_record()
                    if self.game.winner is not None:
                        asyncio.create_task(self.reset_game())
        except json.JSONDecodeError:
            await self.send_error("Invalid JSON format")
        except Exception as e:
            await self.send_error(f"An error occurred: {str(e)}")

    async def disconnect_countdown(self):
        try:
            self.room.countdown_values['reconnect'] = 10
            while self.room.countdown_values['reconnect'] > 0:
                await asyncio.sleep(1)
                self.room.countdown_values['reconnect'] -= 1
                await self.send_reconnect_update()
            await self.handle_reconnect_timeout()
        except asyncio.CancelledError:
            await self.send_error(f"An error occurred! ")

    async def start_countdown(self):
        try:
            while self.room.countdown_values['start'] > 0:
                await self.send_game_update()
                await asyncio.sleep(1)
                self.room.countdown_values['start'] -= 1
                await self.send_start_update()
            await self.room.start_task('game_countdown', self.game_countdown())
            self.game.start = True
        except asyncio.CancelledError:
            await self.send_error(f"An error occurred! ")

    async def game_countdown(self):
        try:
            while self.game.countdown_value > 0 and not self.game.game_over:
                await self.send_game_update()
                await asyncio.sleep(1)
                self.game.countdown_value -= 1
            await self.handle_game_end()
        except asyncio.CancelledError:
            await self.send_error(f"An error occurred! ")

    async def reset_game(self):
        try:
            await asyncio.sleep(3)
            if not self.room.tasks['reconnect_countdown']:
                self.game.reset_game()
                await self.send_game_update(reset=True)
        except asyncio.CancelledError:
            await self.send_error(f"An error occurred! ")

    async def send_game_update(self, reset=False):
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'game.update',
            'state': self.game.board,
            'winner_line': None if reset else self.game.winner_line,
            'winner': None if reset else self.game.winner,
            'final_winner': None if reset else self.game.final_winner,
            'score_x': f'{self.room.players.get('X')} : {self.game.x_score}',
            'score_o': f'{self.room.players.get('O')} : {self.game.o_score}',
            'countdown': self.game.countdown_value,
            'current_turn': 'X' if self.game.x_is_next else 'O',
            'draw': self.game.draw
        })

    async def game_update(self, event):
        await self.send(text_data=json.dumps({
            'state': event.get('state'),
            'winner': event.get('winner'),
            'winner_line': event.get('winner_line'),
            'score_o': event.get(f'score_x'),
            'score_x': event.get(f'score_o'),
            'countdown': event.get('countdown'),
            'final_winner': event.get('final_winner'),
            'current_turn': event.get('current_turn'),
            'draw': event.get('draw'),
            'player_role': self.player_role
        }))

    @database_sync_to_async
    def get_game_record(self):
        try:
            return OnlineGameModel.objects.get(id=self.game_id)
        except OnlineGameModel.DoesNotExist:
            return None

    @database_sync_to_async
    def update_record(self):
        if not self.game_record or self.game_record.winner:
            return
        try:
            self.game_record.score_x = self.game.x_score
            self.game_record.score_o = self.game.o_score
            if self.game.final_winner and not self.game_record.winner:
                winner = self.room.players.get(self.game.final_winner)
                loser_role = 'O' if self.game.final_winner == 'X' else 'X'
                loser = self.room.players.get(loser_role)
                if winner:
                    self.game_record.winner = winner
                    winner.xp += 30
                    winner.rank = winner.xp / 100
                    winner.wins_t += 1
                    winner.save()
                if loser:
                    loser.loses_t += 1
                    loser.save()
                self.game_record.is_end = True
            self.game_record.save()
        except Exception as e:
            print(f"An error occurred: {str(e)}")

    async def send_game_state_notification(self, ingame):
        await channel_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': 'tic tac toe' if ingame else None,
            'ingame': ingame,
        })

    async def send_reconnect_update(self):
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'handle.reconnect',
            'reconnect_countdown': None if not self.game.start else self.room.countdown_values.get('reconnect'),
        })

    async def handle_reconnect(self, event):
        await self.send(text_data=json.dumps({
            'reconnect_countdown': event.get('reconnect_countdown')
        }))

    async def send_start_update(self):
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'handle.start',
            'start_countdown_value': self.room.countdown_values.get('start'),
        })

    async def handle_start(self, event):
        await self.send(text_data=json.dumps({
            'start_countdown_value': event.get('start_countdown_value')
        }))

    async def handle_reconnect_timeout(self):
        async with asyncio.Lock():
            if self.room.countdown_values['reconnect'] == 0 and self.game.final_winner is None and not self.game.game_over:
                other_player_role = 'O' if self.player_role == 'X' else 'X'
                other_player = self.room.players.get(other_player_role)
                if other_player:
                    try:
                        user = await database_sync_to_async(CustomUser.objects.get)(id=self.user.id)
                    except Exception:
                        print("User does not exist.")
                    user.loses_t += 1
                    await database_sync_to_async(user.save)()
                    self.game.final_winner = other_player_role
                    self.game.game_over = True
                    self.game_record.is_end = True
                    await self.update_record()
                    await self.send_game_update()

    async def handle_game_end(self):
        async with asyncio.Lock():
            if self.game.countdown_value == 0 or self.game.game_over:
                self.game.check_game_over()
                self.game_record.is_end = True
                await self.update_record()
                await self.send_game_update()
                await self.room.cancel_task('game_countdown')
                await self.room.cancel_task('reconnect_countdown')

    async def send_error(self, message):
        await self.send(text_data=json.dumps({
            'type': 'error.handle',
            'error': message
        }))
