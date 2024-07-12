import React, { useState } from 'react';
import '../tictactoe.css';
import Header from '../Components/TicTaToe/Header';
import FirstPlayer from '../Components/TicTaToe/FirstPlayer';
import SecondPlayer from '../Components/TicTaToe/SecondPlayer';
import Timer from '../Components/TicTaToe/Timer';
import Game from '../Components/TicTaToe/Game';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(board) || newBoard[index]) return;
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderCell = (index, className) => (
    <div className={`${className}`} onClick={() => handleClick(index)} key={index}>
      {board[index]}
    </div>
  );

  const winner = calculateWinner(board);
  const isBoardFull = board.every(cell => cell !== null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  if (winner) {
    resetGame();
    console.log(`Winner: ${winner}`);
  }

  if (!winner && isBoardFull) {
    resetGame();
    console.log('Draw');
  }

  return (
    <div className='container_tictactoe w-11/12 mx-auto h-5/6 my-auto'>
      <Header />
      <div className='game_container grid mx-auto h-5/6 my-auto'>
        <div className="top_layer grid px-5 mt-5">
          <FirstPlayer />
          <Timer />
          <SecondPlayer />
        </div>
        <Game renderCell={renderCell} />
      </div>
    </div>
  );
}

export default TicTacToe;