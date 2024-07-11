import React from 'react'
import '../tictactoe.css'

function TicTacToe() {
  return (
    <div className='container_tictactoe flex flex-col mx-auto'>
      <div className='top_container w-full'>
        <h1 className='lg:text-4xl md:text-4xl sm:text-md font-bold text-center h-1/6 leader flex justify-center items-center'>TIC TAC TOE</h1>
        <span>return</span>
      </div>
      <div className='game_container my-auto'>
        <div className="top_layer bg-red-400 grid grid-cols-3 h-2/5 relative">
          <div className="first_player bg-indigo-400">
            <span>image</span>
            <h1>Player 1</h1>
            <h4>level 2</h4>
            <h2>05</h2>
          </div>
          <div className="timer_container bg-yellow-300">
            <h1>Time</h1>
            <h2>00:24</h2>
          </div>
          <div className="second_player">
            <span>image</span>
            <h1>Player 2</h1>
            <h4>level 1</h4>
            <h2>04</h2>
          </div>
        </div>
        <div className="bottom_layer bg-green-600 grid grid-cols-3">
          <p> X </p>
          <div className="game_board">
            <div className="row">
              <div className="cell">X</div>
              <div className="cell">O</div>
              <div className="cell">X</div>
            </div>
            <div className="row">
              <div className="cell">O</div>
              <div className="cell">X</div>
              <div className="cell">O</div>
            </div>
            <div className="row">
              <div className="cell">X</div>
              <div className="cell">O</div>
              <div className="cell">X</div>
            </div>
          </div>
          <p> O </p>
        </div>
      </div>
    </div>
  )
}

export default TicTacToe;