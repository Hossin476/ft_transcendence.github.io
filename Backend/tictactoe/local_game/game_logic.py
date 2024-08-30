class TicTacToeLocal:
    def __init__(self):
        self.board = [None] * 9
        self.x_is_next = True
        self.winner = None
        self.score_x = 0
        self.score_o = 0
        self.winner_line = None
        self.game_over = None
        self.countdown_value = 120
        self.game_over = False
        self.max_score = 5
        self.final_winner = None

    def make_move(self, index):
        if self.board[index] or self.winner or self.game_over:
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
                    self.score_x += 1
                else:
                    self.score_o += 1
                return

        if all(self.board):
            self.winner = 'Draw'

    def check_game_over(self):
        if self.score_x >= self.max_score:
            self.final_winner = 'X'
            self.game_over = True
        elif self.score_o >= self.max_score:
            self.final_winner = 'O'
            self.game_over = True
        elif self.countdown_value <= 0:
            self.final_winner = 'X' if self.score_x > self.score_o else 'O' if self.score_o > self.score_x else None
            self.game_over = True

    async def reset_game(self):
        self.board = [None] * 9
        self.x_is_next = True
        self.winner = None
        self.winner_line = None
        self.final_winner = None
        self.game_over = False
