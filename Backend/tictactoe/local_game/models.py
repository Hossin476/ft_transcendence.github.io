from django.db import models
from users.models import CustomUser


class LocalGameModel(models.Model):
    
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    player1 = models.CharField(max_length=150)
    player2 = models.CharField(max_length=150)
    final_winner = models.CharField(max_length=200, null=True, blank=True)
    score_x = models.IntegerField(("Score X"), default=0)
    score_o = models.IntegerField(("Score O"), default=0)
    game_start = models.DateField(("Game Start"), auto_now_add=True)
    game_end = models.DateField(("Game End"), auto_now=True)

    def __str__(self):
        return f"Game between {self.player1} and {self.player2}"
