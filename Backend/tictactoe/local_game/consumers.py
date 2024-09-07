from channels.generic.websocket import AsyncWebsocketConsumer
from .game_logic import TicTacToeLocal
import json
import asyncio
from channels.layers import get_channel_layer

channel_layer = get_channel_layer()


class Room:
    # Manages the state of a Tic Tac Toe game room, including the players and the countdown timer.
    def __init__(self):
        self.players = {"X": None, "O": None}
        self.countdown_task = None

    def add_player(self, player):
        """
        Adds a player to the Tic Tac Toe game room.

        Args:
            player: The player to be added.

        Returns:
            str: The role ('X' or 'O') assigned to the player, or None if the room is full.
        """
        if self.players["X"] is None:
            self.players["X"] = player
            return "X"
        elif self.players["O"] is None:
            self.players["O"] = player
            return "O"
        return None

    def remove_player(self, player):
        """
        Removes a player from the Tic Tac Toe game room.

        Args:
            player: The player to be removed.

        Returns:
            str: The role ('X' or 'O') of the removed player, or None if the player was not found.
        """
        for role in self.players:
            if self.players[role] == player:
                self.players[role] = None
                return role
        return None

    def start_countdown(self, countdown_coroutine):
        """
        Starts the countdown timer for the Tic Tac Toe game.

        Args:
            countdown_coroutine: The coroutine that handles the countdown.
        """
        if self.countdown_task:
            self.countdown_task.cancel()
        self.countdown_task = asyncio.create_task(countdown_coroutine)

    def cancel_countdown(self):
        # Cancels the countdown timer for the Tic Tac Toe game.
        if self.countdown_task:
            self.countdown_task.cancel()
            self.countdown_task = None


class TicTacToeLocalConsumer(AsyncWebsocketConsumer):
    # A WebSocket consumer that handles the real-time communication for a local Tic Tac Toe game.
    room = Room()
    game = TicTacToeLocal()

    async def connect(self):
        # Handles the WebSocket connection for a Tic Tac Toe game.
        if 'error' in self.scope:
            await self.close()
            return

        self.user = self.scope.get('user')
        self.player_role = self.room.add_player(self.user)

        if self.player_role:
            await self.accept()
            await self.send_game_update()
            await channel_layer.group_send(f'notification_{self.user.id}', {
                'type': 'game.state',
                'game_type': 'tic tac toe',
                'ingame': True
            })
            self.room.start_countdown(self.start_countdown())
        else:
            await self.close()

    async def receive(self, text_data):
        """
        Handles WebSocket messages received from the client.

        Args:
            text_data: The received message as a JSON string.
        """
        data = json.loads(text_data)
        action = data.get('action')
        index = data.get('index')

        if action == 'move':
            move_made = self.game.make_move(index)
            if move_made:
                await self.send_game_update()

                if self.game.winner is not None:
                    await self.reset_game()

    async def disconnect(self, close_code):
        """
        Handles the WebSocket disconnection for a Tic Tac Toe game.

        Args:
            close_code: The WebSocket close code.
        """
        await channel_layer.group_send(f'notification_{self.user.id}', {
            'type': 'game.state',
            'game_type': None,
            'ingame': False
        })
        self.room.remove_player(self.user)
        self.room.cancel_countdown()

    async def reset_game(self):
        # Resets the Tic Tac Toe game after a winner is determined.
        await asyncio.sleep(5)
        self.game.reset_game()
        await self.send_game_update()

    async def start_countdown(self):
        # Starts the countdown timer for the Tic Tac Toe game.
        try:
            while self.game.countdown_value > 0 and not self.game.game_over:
                await asyncio.sleep(1)
                self.game.countdown_value -= 1
                await self.send_game_update()
        except asyncio.CancelledError:
            print("Countdown cancelled.")
        finally:
            if self.game.countdown_value <= 0 or self.game.game_over:
                self.game.check_game_over()
                await self.send_game_update()

    async def send_game_update(self):
        # Sends the current state of the Tic Tac Toe game to the client.
        await self.send(text_data=json.dumps({
            'type': 'game.update',
            'state': self.game.board,
            'winner': self.game.winner,
            'winner_line': self.game.winner_line,
            'score_x': self.game.score_x,
            'score_o': self.game.score_o,
            'final_winner': self.game.final_winner,
            'countdown': self.game.countdown_value,
            'player_role': self.player_role
        }))
