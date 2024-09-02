# Import necessary modules
import json
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
from .game_logic import TicTacToe
from .models import OnlineGameModel
from users.models import CustomUser
from channels.db import database_sync_to_async
from django.core.cache import cache
from channels.layers import get_channel_layer

# Get the channel layer for WebSocket communication
channel_layer = get_channel_layer()

# Define a Room class to manage game rooms
class Room:
    def __init__(self):
        # Initialize players, countdown tasks, and reconnect countdown
        self.players = {"X": None, "O": None}
        self.countdown_task = None
        self.reconnect_countdown_task = None
        self.reconnect_countdown_value = 0

    def add_player(self, player):
        # Add a player to the room and assign a role (X or O)
        for role, assigned_player in self.players.items():
            if assigned_player is None:
                self.players[role] = player
                return role
        return None

    def get_player(self, role):
        # Get the player assigned to a specific role
        return self.players.get(role)

    def remove_player(self, player):
        # Remove a player from the room
        for role, assigned_player in self.players.items():
            if assigned_player == player:
                self.players[role] = None
                return role
        return None

    def are_both_players_present(self):
        # Check if both players are in the room
        return all(self.players.values())

    def are_both_players_absent(self):
        # Check if both players have exited the game
        return all(player is None for player in self.players.values())

    def start_task(self, task_attr, coroutine):
        # Start an asynchronous task
        task = getattr(self, task_attr)
        if task:
            task.cancel()
        setattr(self, task_attr, asyncio.create_task(coroutine))

    def cancel_task(self, task_attr):
        # Cancel an asynchronous task
        task = getattr(self, task_attr)
        if task:
            task.cancel()
            setattr(self, task_attr, None)


# Define the TicTacToe WebSocket Consumer
class TicTacToeConsumer(AsyncWebsocketConsumer):
    # Class variables for global room, game, and users in game
    users_ingame = []
    rooms = {}
    games = {}

    def __init__(self, *args, **kwargs):
        # Initialize the consumer with necessary attributes
        super().__init__(*args, **kwargs)
        self.game_id = None
        self.room_group_name = None
        self.user = None
        self.game_record = None
        self.player_role = None

    async def connect(self):
        # Handle WebSocket connection
        if 'error' in self.scope:
            await self.close()
            return
        self.user = self.scope.get('user')
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.room = TicTacToeConsumer.rooms.get(self.game_id) or Room()
        self.game = TicTacToeConsumer.games.get(self.game_id) or TicTacToe()
        self.room_group_name = f"game_{self.game_id}"
        self.player_role = self.room.add_player(self.user)
        TicTacToeConsumer.rooms[self.game_id] = self.room
        TicTacToeConsumer.games[self.game_id] = self.game

        # Update users in game and cache
        TicTacToeConsumer.users_ingame.append(self.user)
        cache.set('users_tictactoe', TicTacToeConsumer.users_ingame)

        # Send game state notification
        await channel_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': 'tic tac toe',
            'ingame': True,
        })

        # Add user to the game group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        # Get game record from database
        self.game_record = await database_sync_to_async(OnlineGameModel.objects.get)(id=self.game_id)
        await self.send_game_update()
        await self.update_record()

        # Handle reconnection countdown
        if self.room.reconnect_countdown_task and not self.room.reconnect_countdown_task.done():
            self.room.cancel_task('reconnect_countdown_task')

        # Start countdown if both players are present
        if self.room.are_both_players_present():
            self.room.start_task('countdown_task', self.start_countdown())

    async def disconnect(self, close_code):
        # Handle WebSocket disconnection
        if 'error' in self.scope:
            return
        self.room.remove_player(self.user)
        TicTacToeConsumer.users_ingame.remove(self.user)
        cache.set('users_tictactoe', TicTacToeConsumer.users_ingame)

        # Send game state notification
        await channel_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': None,
            'ingame': False,
        })

        # Start reconnect countdown if a player left
        if not self.room.are_both_players_present() and not self.game.game_over:
            self.room.start_task('reconnect_countdown_task', self.disconnect_countdown())
            self.room.cancel_task('countdown_task')

        if self.room.are_both_players_absent():
            if self.game_id in TicTacToeConsumer.rooms:
                del TicTacToeConsumer.rooms[self.game_id]
            if self.game_id in TicTacToeConsumer.games:
                del TicTacToeConsumer.games[self.game_id]

        # Remove user from the game group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def disconnect_countdown(self):
        # Handle countdown for player reconnection
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
        # Handle incoming WebSocket messages
        data = json.loads(text_data)
        action = data.get('action')
        index = data.get('index')

        if action == 'move' and self.room.are_both_players_present():
            move_made = self.game.make_move(index, self.player_role)
            if move_made:
                await self.send_game_update()
                await self.update_record()
                if self.game.winner is not None:
                    asyncio.create_task(self.reset_game())

    async def reset_game(self):
        # Reset the game after a delay
        await asyncio.sleep(5)
        await self.update_record()
        self.game.reset_game()
        await self.send_game_update(reset=True)

    async def start_countdown(self):
        # Start the game countdown
        try:
            while self.game.countdown_value > 0 and not self.game.game_over:
                await asyncio.sleep(1)
                self.game.countdown_value -= 1
                await self.send_game_update()
        except asyncio.CancelledError:
            pass
        finally:
            if self.game.countdown_value <= 0 or self.game.game_over:
                self.game.check_game_over()
                await self.update_record()
                await self.send_game_update()

    async def send_game_update(self, reset=False):
        # Send game update to all players in the group
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'game.update',
            'state': self.game.board,
            'winner_line': None if reset else self.game.winner_line,
            'winner': None if reset else self.game.winner,
            'final_winner': None if reset else self.game.final_winner,
            'score_x': self.game.x_score,
            'score_o': self.game.o_score,
            'countdown': self.game.countdown_value,
            'player_role': self.player_role
        })

    async def handle_reconnect(self, event):
        # Handle reconnection events
        await self.send(text_data=json.dumps({
            'reconnect_countdown': event.get('reconnect_countdown')
        }))


    async def update_record(self):
        # Update the game record in the database
        if self.game_record:
            self.game_record.score_x = self.game.x_score
            self.game_record.score_o = self.game.o_score
            if self.game.final_winner and not self.game_record.winner:
                winner = self.room.get_player(self.game.final_winner)
                if winner:
                    self.game_record.winner = winner
                    winner.xp += 30
                    winner.rank = winner.xp / 100
                    await database_sync_to_async(winner.save)()
            # Save the game record
            await database_sync_to_async(self.game_record.save)()


    async def game_update(self, event):
        # Send game update to the client
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
