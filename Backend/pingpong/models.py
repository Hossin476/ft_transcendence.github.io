from django.db import models
from users.models import CustomUser

class GameOnline(models.Model):
    player1 = models.ForeignKey(CustomUser, related_name='match_home', on_delete=models.CASCADE)
    player2 = models.ForeignKey(CustomUser, related_name='match_away', on_delete=models.CASCADE)
    winner = models.ForeignKey(CustomUser, related_name='winner_game', on_delete=models.CASCADE, null=True)
    score1 = models.IntegerField(default=0)
    score2 = models.IntegerField(default=0)
    startTime = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    is_game_end = models.BooleanField(default=False)

    def __str__(self):
        return f'owner_{self.player1.username}'


class GameOffline(models.Model):
    creater_game = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    player1 = models.CharField(max_length=200)
    player2 = models.CharField(max_length=200)
    score1 = models.IntegerField(default=0)
    score2 = models.IntegerField(default=0)
    startTime = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    is_game_end = models.BooleanField(default=False)

    def __str__(self):
        return f'owner_{self.creater_game.username}'