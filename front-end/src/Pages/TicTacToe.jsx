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
    <div className="container_tournament bg-primaryColor w-full grid grid-rows-1 justify-items-center items-center">
      <div className="flex justify-center items-center w-11/12 h-full">
        <div className='border border-forthColor  w-full text-white flex flex-col h-5/6 items-center justify-evenly bg-linkBgColor rounded-3xl'>
          <Header />
          <div className='game_container grid h-11/12 w-full justify-around items-center'>
            <div className="top_layer grid px-5">
              <FirstPlayer />
              <Timer />
              <SecondPlayer />
            </div>
            <Game renderCell={renderCell} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;