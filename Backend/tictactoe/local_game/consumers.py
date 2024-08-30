from channels.generic.websocket import AsyncWebsocketConsumer
from .game_logic import TicTacToeLocal
import json
import asyncio

class Room:
    def __init__(self):
        self.players = {"X": None, "O": None}
        self.countdown_task = None

    def add_player(self, player):
        if self.players["X"] is None:
            self.players["X"] = player
            return "X"
        return None

    def remove_player(self, player):
        for role in self.players:
            if self.players[role] == player:
                self.players[role] = None
                return role
        return None

    def start_countdown(self, countdown_coroutine):
        if self.countdown_task:
            self.countdown_task.cancel()
        self.countdown_task = asyncio.create_task(countdown_coroutine)

    def cancel_countdown(self):
        if self.countdown_task:
            self.countdown_task.cancel()
            self.countdown_task = None


global_room = Room()
global_game = TicTacToeLocal()

class TicTacToeLocalConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.player_role = None
        self.room = global_room
        self.game = global_game

    async def connect(self):
        self.user = self.scope.get('user')
        if self.user is None:
            await self.close()
            return

        self.player_role = self.room.add_player(self.user)
        if self.player_role:
            await self.accept()
            await self.send(text_data=json.dumps({
                'type': 'game.update',
                'state': self.game.board,
                'winner': self.game.winner,
                'winner_line': self.game.winner_line,
                'score_x': self.game.score_x,
                'score_o': self.game.score_o,
                'countdown': self.game.countdown_value,
                'final_winner': self.game.final_winner,
                'player_role': self.player_role
            }))
            self.room.start_countdown(self.start_countdown())
        else:
            await self.close()

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')
        index = data.get('index')
        if action == 'move':
            move_made = self.game.make_move(index)
            if move_made:
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
                if self.game.winner is not None:
                    asyncio.create_task(self.reset_game())

    async def disconnect(self, close_code):
        self.room.remove_player(self.user)
        self.game.reset_game()
        self.room.cancel_countdown()

    async def reset_game(self):
        await asyncio.sleep(5)
        await self.game.reset_game()
        await self.send(text_data=json.dumps({
            'type': 'game.update',
            'state': self.game.board,
            'winner_line': None,
            'winner': None,
            'final_winner': None,
            'score_x': self.game.score_x,
            'score_o': self.game.score_o,
            'countdown': self.game.countdown_value,
            'player_role': self.player_role
        }))

    async def start_countdown(self):
        try:
            while self.game.countdown_value > 0 and not self.game.game_over:
                await asyncio.sleep(1)
                self.game.countdown_value -= 1
                await self.send(text_data=json.dumps({
                    'type': 'game.update',
                    'state': self.game.board,
                    'winner': self.game.winner,
                    'final_winner': self.game.final_winner,
                    'winner_line': self.game.winner_line,
                    'score_x': self.game.score_x,
                    'score_o': self.game.score_o,
                    'countdown': self.game.countdown_value,
                    'player_role': self.player_role
                }))
        except asyncio.CancelledError:
            print("Countdown cancelled.")
        finally:
            if self.game.countdown_value <= 0 or self.game.game_over:
                self.game.check_game_over()
                await self.send(text_data=json.dumps({
                    'type': 'game.update',
                    'state': self.game.board,
                    'winner': self.game.winner,
                    'final_winner': self.game.final_winner,
                    'winner_line': self.game.winner_line,
                    'score_x': self.game.score_x,
                    'score_o': self.game.score_o,
                    'countdown': self.game.countdown_value,
                    'player_role': self.player_role
                }))