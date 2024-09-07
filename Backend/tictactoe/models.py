from django.db import models
from users.models import CustomUser


class OnlineGameModel(models.Model):
    """
    Model representing an online Tic-Tac-Toe game between two players.

    Attributes:
        player1 (ForeignKey): A reference to the first player in the game.
        player2 (ForeignKey): A reference to the second player in the game.
        winner (ForeignKey): A reference to the player who won the game. Can be null if the game ends in a draw.
        score_x (IntegerField): The score of player X.
        score_o (IntegerField): The score of player O.
        game_start (DateField): The date when the game started.
        game_end (DateField): The date when the game ended.
    """
    player1 = models.ForeignKey(CustomUser, verbose_name=("Player 1"), on_delete=models.CASCADE, related_name='player1_games')
    player2 = models.ForeignKey(CustomUser, verbose_name=("Player 2"), on_delete=models.CASCADE, related_name='player2_games')
    winner = models.ForeignKey(CustomUser, verbose_name=("Winner"), on_delete=models.CASCADE, null=True, related_name='won_games')
    score_x = models.IntegerField(("Score X"), default=0)
    score_o = models.IntegerField(("Score O"), default=0)
    game_start = models.DateTimeField(auto_now_add=True)
    game_end = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Game between {self.player1} and {self.player2}"
