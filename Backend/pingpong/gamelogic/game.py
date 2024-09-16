from channels.db import database_sync_to_async
from ..models import GameOnline, GameOffline
import asyncio
import sys
class GameLogic:
    def __init__(self, gameMode):
        self.gameMode = gameMode
        self.paddle_one_position = {'x': 1, 'y': 0.1, 'z': 1.92}
        self.paddle_two_position = {'x': 1, 'y': 0.1, 'z': -1.92}
        self.score1 = 0
        self.score2 = 0
        self.pause1 = 3
        self.pause2 = 3
        self.ball_position = {'x': 0, 'y': 0.1, 'z': 0}
        self.ball_movement = {"vx": 0.05, "vz": 0.05, "x": 1, "z": 0.1}
    
    def gameMove(self, matchId):
        
        self.ball_movement['x'] += self.ball_movement['vx']
        self.ball_movement['z'] += self.ball_movement['vz']
        if self.ball_movement['z'] >= 2.8 or self.ball_movement['z'] <= -2.8:
            try:
                mtp = 1
                if self.ball_movement['vz'] > 0:
                    mtp = -1
                if self.ball_movement['z'] >= 2.8:
                    self.score1 += 1
                    if self.gameMode == 'online':
                        asyncio.create_task(self.update_winner_score_online(matchId, 1))
                    elif self.gameMode == 'offline':
                        asyncio.create_task(self.update_winner_score__offline(matchId, 1))
                else:
                    self.score2 += 1
                    if self.gameMode == 'online':
                        asyncio.create_task(self.update_winner_score_online(matchId, 2))
                    elif self.gameMode == 'offline':
                        asyncio.create_task(self.update_winner_score__offline(matchId,2))
            except Exception as e:
                print(f"An error occurred: {e}", file=sys.stderr)
            self.ball_movement = {"vx": 0.05, "vz": 0.05 * mtp, "x": 1, "z": 0.1}
        if self.ball_movement['x'] >= 1.98 or self.ball_movement['x'] <= 0.03:
            self.ball_movement['vx'] *= -1
        if (self.ball_movement['z'] >= self.paddle_one_position['z'] - 0.05 and self.ball_movement['z'] <= self.paddle_one_position['z']) and (self.ball_movement['x'] >= self.paddle_one_position['x'] - 0.3 and self.ball_movement['x'] <= self.paddle_one_position['x'] + 0.3):
            collisionPosition = self.paddle_one_position['x'] - self.ball_position['x']
            self.ball_movement['vz'] *= -1
            self.ball_movement['vx'] = collisionPosition * -0.2

        if (self.ball_movement['z'] >= self.paddle_two_position['z'] - 0.05 and  self.ball_movement['z'] <= self.paddle_two_position['z']) and (self.ball_movement['x'] >= self.paddle_two_position['x'] - 0.3 and self.ball_movement['x'] <= self.paddle_two_position['x'] + 0.3):
            collisionPosition = self.paddle_two_position['x'] - self.ball_position['x']
            self.ball_movement['vz'] *= -1
            self.ball_movement['vx'] = collisionPosition * -0.2
        self.ball_position['x'] = self.ball_movement['x']
        self.ball_position['z'] = self.ball_movement['z']

    def handle_paddle(self, event):
        currentX = self.paddle_one_position['x']
        if event == "right":
            currentX += 0.04
        if event == 'left':
            currentX -= 0.04
        if currentX > 0.25 and currentX < 1.75:
            self.paddle_one_position['x'] = currentX
    
    def handle_paddle_other(self, event):
        currentX = self.paddle_two_position['x']
        if event == "right":
            currentX -= 0.04
        if event == 'left':
            currentX += 0.04
        if currentX > 0.25 and currentX < 1.75:
            self.paddle_two_position['x'] = currentX
    

    @database_sync_to_async
    def update_winner_score_online(self, matchId, scoreNumber):
        match = GameOnline.objects.get(id=matchId)
        if scoreNumber == 1:
            match.score1 = self.score1
        else:
            match.score2 = self.score2
        if match.score1 == 7:
            match.winner = match.player1
        elif match.score2 == 7:
            match.winner = match.player2
        if match.winner is not None : 
            match.winner.xp =  match.winner.xp + 30
            match.winner.rank =  match.winner.xp / 100
            match.winner.save()
            match.is_game_end = True
            print('match winner : ',  match.winner.xp, file=sys.stderr)
            match.save()

    @database_sync_to_async
    def update_winner_score__offline(self, matchId, scoreNumber):
        print("game id : ", matchId)
        match = GameOffline.objects.get(id=matchId)
        print("score 1: ",  match.score1)
        print("score 2: ",  match.score2)
        if scoreNumber == 1:
            match.score1 = self.score1
        else:
            match.score2 = self.score2
        if match.score1 == 7:
            match.winner = match.player1
            print("player 1 win")
        elif match.score2 == 7:
            match.winner = match.player2
            print("player 2 win")
        if match.winner is not None :
            print("there is winner ")
            match.is_game_end = True
        match.save()



    @database_sync_to_async
    def reconnect(self,player1_status, player2_status, matchid):
            matchObj = GameOnline.objects.get(id=matchid)
            if player1_status == False and player2_status == False:
                matchObj.delete()
            elif player1_status:
                matchObj.winner = matchObj.player1
                matchObj.score1 = 3
                self.score1 = 3
                self.score2 = 0
                matchObj.score2 = 0
                matchObj.winner.xp = matchObj.winner.xp + 30
                matchObj.winner.rank =  matchObj.winner.xp / 100
                matchObj.winner.save()
            elif player2_status:
                matchObj.winner = matchObj.player2
                matchObj.score1 = 0
                matchObj.score2 = 3
                self.score1 = 0
                self.score2 = 3
                matchObj.winner.xp = matchObj.winner.xp + 30
                matchObj.winner.rank =  matchObj.winner.xp / 100
                matchObj.winner.save()

            if player1_status or player2_status:
                matchObj.is_game_end = True
                matchObj.save()
            



        

