class TicTacToe:
    def __init__(self):
        self.board = [None] * 9
        self.x_is_next = True
        self.winner = None
        self.final_winner = None
        self.winner_line = None
        self.x_score = 0
        self.o_score = 0
        self.max_score = 5
        self.countdown_value = 30
        self.game_over = False

    def make_move(self, index, role):
        if self.board[index] or self.winner or self.game_over:
            return False
        if (self.x_is_next and role != 'X') or (not self.x_is_next and role != 'O'):
            return False

        self.board[index] = 'X' if self.x_is_next else 'O'
        self.x_is_next = not self.x_is_next
        self.check_winner()
        self.check_game_over()
        return True

    def check_winner(self):
        lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for line in lines:
            a, b, c = line
            if self.board[a] and self.board[a] == self.board[b] and self.board[a] == self.board[c]:
                self.winner = self.board[a]
                self.winner_line = line
                if self.winner == 'X':
                    self.x_score += 1
                else:
                    self.o_score += 1
                return

        if all(self.board):
            self.winner = 'Draw'

    def check_game_over(self):
        if self.x_score >= self.max_score:
            self.final_winner = 'X'
            self.game_over = True
        elif self.o_score >= self.max_score:
            self.final_winner = 'O'
            self.game_over = True
        elif self.countdown_value <= 0:
            self.final_winner = 'X' if self.x_score > self.o_score else 'O' if self.o_score > self.x_score else None
            self.game_over = True

    async def reset_game(self):
        self.board = [None] * 9
        self.x_is_next = True
        self.winner = None
        self.winner_line = None
        self.game_over = False
        self.final_winner = None

