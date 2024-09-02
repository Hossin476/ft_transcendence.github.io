class TicTacToe:
    def __init__(self, max_score=5, countdown_value=20):
        # Initialize the tictactoe class
        self.max_score = max_score
        self.countdown_value = countdown_value
        self.x_score = 0
        self.o_score = 0
        self.reset_game()

    def reset_game(self):
        # Reset the game state
        self.board = [None] * 9  # Initialize empty 3x3 board
        self.x_is_next = True    # X starts first
        self.winner = None       # No winner at start
        self.final_winner = None # No final winner at start
        self.winner_line = None  # No winning line at start
        self.game_over = False   # Game is not over

    def make_move(self, index, role):
        # Attempt to make a move on the board
        if self._invalid_move(index, role):
            return False

        # Place the move on the board
        self.board[index] = 'X' if self.x_is_next else 'O'
        self.x_is_next = not self.x_is_next  # Switch turns
        self.check_winner()   # Check if this move results in a win
        self.check_game_over()  # Check if the game is over
        return True

    def _invalid_move(self, index, role):
        # Check if the move is invalid
        return (
            self.board[index] is not None or  # Cell already occupied
            self.winner is not None or        # Game already won
            self.game_over or                 # Game is over
            (self.x_is_next and role != 'X') or  # Not X's turn
            (not self.x_is_next and role != 'O') # Not O's turn
        )

    def check_winner(self):
        # Define all possible winning lines
        lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
            [0, 4, 8], [2, 4, 6]              # Diagonals
        ]

        # Check each line for a winner
        for line in lines:
            if self._check_line(line):
                self._set_winner(line)
                return

        # If all cells are filled and no winner, it's a draw
        if all(self.board):
            self.winner = 'Draw'

    def _check_line(self, line):
        # Check if all cells in a line are the same and not None
        a, b, c = line
        return self.board[a] and self.board[a] == self.board[b] == self.board[c]

    def _set_winner(self, line):
        # Set the winner and update scores
        self.winner = self.board[line[0]]
        self.winner_line = line
        if self.winner == 'X':
            self.x_score += 1
        else:
            self.o_score += 1

    def check_game_over(self):
        # Check if the game is over based on scores or countdown
        if self.x_score >= self.max_score:
            self._end_game('X')
        elif self.o_score >= self.max_score:
            self._end_game('O')
        elif self.countdown_value <= 0:
            self._check_final_winner()

    def _end_game(self, winner):
        # End the game with a final winner
        self.final_winner = winner
        self.game_over = True

    def _check_final_winner(self):
        # Determine the final winner based on scores
        if self.x_score > self.o_score:
            self.final_winner = 'X'
        elif self.o_score > self.x_score:
            self.final_winner = 'O'
        else:
            self.final_winner = None  # It's a draw
        self.game_over = True