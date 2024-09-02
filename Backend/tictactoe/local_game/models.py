from django.db import models
from users.models import CustomUser

class LocalGameModel(models.Model):
    creator = models.ForeignKey(CustomUser, verbose_name=("Creator"), on_delete=models.CASCADE, related_name='game creator')
    opponent = models.CharField(("opponent"), max_length=50)
    final_winner = models.ForeignKey(CustomUser, verbose_name=("Winner"), on_delete=models.CASCADE, null=True, related_name='won_games')
    score_x = models.IntegerField(("Score X"), default=0)
    score_o = models.IntegerField(("Score O"), default=0)
    game_start = models.DateField(("Game Start"), auto_now=False, auto_now_add=False, null=True)
    game_end = models.DateField(("Game End"), auto_now=False, auto_now_add=False, null=True)
    
    def __str__(self):
        return f"Game between {self.opponent} and {self.player2}"