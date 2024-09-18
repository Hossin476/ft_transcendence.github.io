import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .game_logic import TicTacToeLocal
from .models import LocalGameModel
from channels.db import database_sync_to_async
from django.utils import timezone

class TicTacToeLocalConsumer(AsyncWebsocketConsumer):
    games = {}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.game_id = None
        self.game = None
        self.players = {'X': None, 'O': None}
        self.current_player = 'X'
        self.start_countdown_task = None
        self.game_countdown_task = None
        self.start_countdown_value = 10
        self.start = False

    async def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        await self.initialize_game()
        await self.accept()
        await self.send_game_update()
        if not self.start:
            self.start_countdown_task = asyncio.create_task(self.start_countdown())

    async def disconnect(self, close_code):
        if self.start_countdown_task:
            self.start_countdown_task.cancel()
        if self.game_countdown_task:
            self.game_countdown_task.cancel()
        await self.save_game_result()

    async def initialize_game(self):
        self.game = self.games.get(self.game_id)
        if not self.game:
            self.game = TicTacToeLocal()
            self.games[self.game_id] = self.game
        await self.load_game_state()

    @database_sync_to_async
    def load_game_state(self):
        game_instance = LocalGameModel.objects.get(id=self.game_id)
        self.players['X'] = game_instance.player1
        self.players['O'] = game_instance.player2

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            action = data.get('action')
            index = data.get('index')

            if action == 'move' and not self.game.game_over and self.start:
                move_made = self.game.make_move(index)
                if move_made:
                    self.current_player = 'O' if self.current_player == 'X' else 'X'
                    await self.send_game_update()
                    if self.game.winner is not None:
                        asyncio.create_task(self.reset_game())
        except Exception as e:
            await self.send_error(f"An error occurred: {str(e)}")

    async def send_game_update(self, reset=False):
        await self.send(text_data=json.dumps({
            'state': self.game.board,
            'winner_line': None if reset else self.game.winner_line,
            'winner': None if reset else self.game.winner,
            'final_winner': None if reset else self.game.final_winner,
            'score_x': self.game.score_x,
            'score_o': self.game.score_o,
            'countdown': self.game.countdown_value,
            'current_turn': self.current_player
        }))
    
    async def send_start_countdown_update(self):
        await self.send(text_data=json.dumps({
            'start_countdown_value' : self.start_countdown_value
        }))

    async def reset_game(self):
        await asyncio.sleep(5)
        self.game.reset_game()
        await self.send_game_update(reset=True)

    @database_sync_to_async
    def save_game_result(self):
        game_instance = LocalGameModel.objects.get(id=self.game_id)
        game_instance.final_winner = self.players[self.game.final_winner] if self.game.final_winner else None
        game_instance.score_x = self.game.score_x
        game_instance.score_o = self.game.score_o
        if not game_instance.game_start:
            game_instance.game_start = timezone.now()
        game_instance.game_end = timezone.now()
        game_instance.save()

    async def send_error(self, message):
        await self.send(text_data=json.dumps({
            'type': 'error',
            'message': message
        }))

    async def start_countdown(self):
        try:
            while self.start_countdown_value >= 0:
                await self.send_start_countdown_update()
                await asyncio.sleep(1)
                self.start_countdown_value -= 1
            await self.save_game_start()
            self.start = True
            self.game_countdown_task = asyncio.create_task(self.game_countdown())
        except asyncio.CancelledError:
            await self.send_error(f"An error occurred: {str(e)}")

    @database_sync_to_async
    def save_game_start(self):
        game_instance = LocalGameModel.objects.get(id=self.game_id)
        game_instance.game_start = timezone.now()
        game_instance.save()

    async def game_countdown(self):
        try:
            while self.game.countdown_value > 0 and not self.game.game_over:
                await asyncio.sleep(1)
                self.game.countdown_value -= 1
                await self.send_game_update()
            if self.game.countdown_value == 0 or self.game.game_over:
                self.game.check_game_over()
                await self.send_game_update()
                await self.save_game_result()
        except asyncio.CancelledError:
            await self.send_error(f"An error occurred: {str(e)}")