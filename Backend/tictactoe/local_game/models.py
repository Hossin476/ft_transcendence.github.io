from django.db import models
from users.models import CustomUser


class LocalGameModel(models.Model):
    """
    Model representing a local Tic-Tac-Toe game between two players.

    Attributes:
        creator (ForeignKey): A reference to the user who created the game.
        opponent (CharField): The name of the opponent in the game.
        final_winner (ForeignKey): A reference to the user who won the game. Can be null if the game has not ended.
        score_x (IntegerField): The final score of player X.
        score_o (IntegerField): The final score of player O.
        game_start (DateField): The date and time when the game started.
        game_end (DateField): The date and time when the game ended.
    """
    creator = models.ForeignKey(CustomUser, verbose_name=("Creator"), on_delete=models.CASCADE, related_name='game creator')
    opponent = models.CharField(("opponent"), max_length=50)
    final_winner = models.ForeignKey(CustomUser, verbose_name=("Winner"), on_delete=models.CASCADE, null=True, related_name='won_games')
    score_x = models.IntegerField(("Score X"), default=0)
    score_o = models.IntegerField(("Score O"), default=0)
    game_start = models.DateField(("Game Start"),auto_now_add=True)
    game_end = models.DateField(("Game End"), auto_now=True)
    
    def __str__(self):
        return f"Game between {self.opponent} and {self.player2}"