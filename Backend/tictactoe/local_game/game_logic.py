class TicTacToeLocal:
    """
    A class that manages the logic for a local Tic Tac Toe game.

    Attributes:
        board (list): A list of 9 elements representing the current state of the Tic Tac Toe board.
        x_is_next (bool): Indicates whether it's X's turn or O's turn.
        winner (str or None): Represents the winner of the game ('X', 'O', or 'Draw').
        winner_line (list or None): The three indices that form the winning line.
        game_over (bool): Indicates whether the game has ended.
        score_x (int): The score for the X player.
        score_o (int): The score for the O player.
        countdown_value (int): The countdown timer for the game.
        max_score (int): The maximum score required to win the game.
        final_winner (str or None): Represents the final winner of the game ('X' or 'O').
    """

    def __init__(self):
        # Initializes the Tic Tac Toe game.
        self.reset_game()
        self.score_x = 0
        self.score_o = 0
        self.countdown_value = 10
        self.max_score = 5
        self.final_winner = None

    def make_move(self, index):
        """
        Makes a move on the Tic Tac Toe board.

        Args:
            index (int): The index on the board where the player wants to place their mark.

        Returns:
            bool: True if the move was successful, False otherwise.
        """
        if self.board[index] is not None or self.winner or self.game_over:
            return False

        self.board[index] = 'X' if self.x_is_next else 'O'
        self.x_is_next = not self.x_is_next
        self.check_winner()
        self.check_game_over()
        return True

    def check_winner(self):
        # Checks if there is a winner on the Tic Tac Toe board.
        winning_combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ]

        for combination in winning_combinations:
            a, b, c = combination
            if self.board[a] and self.board[a] == self.board[b] == self.board[c]:
                self.winner = self.board[a]
                self.winner_line = combination
                self.update_score(self.winner)
                return

        if all(self.board):
            self.winner = 'Draw'

    def update_score(self, winner):
        """
        Updates the score based on the winner.

        Args:
            winner (str): The winner of the game ('X' or 'O').
        """
        if winner == 'X':
            self.score_x += 1
        elif winner == 'O':
            self.score_o += 1

    def check_game_over(self):
        # Checks if the game has ended and determines the final winner.
        if self.score_x >= self.max_score:
            self.final_winner = 'X'
            self.game_over = True
        elif self.score_o >= self.max_score:
            self.final_winner = 'O'
            self.game_over = True
        elif self.countdown_value <= 0:
            if self.score_x > self.score_o:
                self.final_winner = 'X'
            elif self.score_o > self.score_x:
                self.final_winner = 'O'
            self.game_over = True

    def reset_game(self):
        # Resets the Tic Tac Toe game to its initial state.
        self.board = [None] * 9
        self.x_is_next = True
        self.winner = None
        self.winner_line = None
        self.game_over = False
