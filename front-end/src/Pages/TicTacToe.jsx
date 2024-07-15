import React, { useState } from 'react';
import '../tictactoe.css';
import Header from '../Components/TicTaToe/Header';
import FirstPlayer from '../Components/TicTaToe/FirstPlayer';
import SecondPlayer from '../Components/TicTaToe/SecondPlayer';
import Timer from '../Components/TicTaToe/Timer';
import Game from '../Components/TicTaToe/Game';

function TicTacToe() {
  return (
    <div className="container_tournament bg-primaryColor justify-evenly w-full h-full flex flex-col items-center">
          <Header />
      <div className="flex justify-center items-center w-11/12 h-full">
        <div className='border border-forthColor  w-11/12 text-white flex flex-col h-5/6 items-center justify-evenly bg-linkBgColor rounded-3xl'>
          <div className='game_container h-11/12 w-full items-center'>
            <div className=" flex w-full px-10 justify-center items-center xsm:gap-2 lg:gap-9">
              <FirstPlayer />
              <Timer />
              <SecondPlayer />
            </div>
            <Game />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;