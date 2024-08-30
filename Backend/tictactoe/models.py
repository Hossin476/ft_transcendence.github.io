from django.db import models
from django.contrib.auth import get_user_model

class OnlineGameModel(models.Model):
    player1 = models.ForeignKey(get_user_model(), verbose_name=("Player 1"), on_delete=models.CASCADE, related_name='player1_games')
    player2 = models.ForeignKey(get_user_model(), verbose_name=("Player 2"), on_delete=models.CASCADE, related_name='player2_games')
    final_winner = models.ForeignKey(get_user_model(), verbose_name=("Winner"), on_delete=models.CASCADE, null=True, related_name='won_games')
    score_x = models.IntegerField(("Score X"), default=0)
    score_o = models.IntegerField(("Score O"), default=0)
    game_start = models.DateField(("Game Start"), auto_now=False, auto_now_add=False, null=True)
    game_end = models.DateField(("Game End"), auto_now=False, auto_now_add=False, null=True)
    # board_state = models.JSONField(("Board State"), default=list)
    # countdown_value = models.IntegerField(("Countdown Value"), default=120)
    
    def __str__(self):
        return f"Game between {self.player1} and {self.player2}"