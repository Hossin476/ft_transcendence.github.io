import React, { useRef, useState, forwardRef, useEffect } from 'react';
import '../tictactoe.css';
import Header from '../Components/TicTaToe/Header';
import Game from '../Components/TicTaToe/Game';
import Score from '../Components/TicTaToe/Score';
import { TicTacToeProvider } from '../context/TicTacToeContext';

const TicTacToe = () => {

    return (
        <div className="container_tournament bg-primaryColor w-full h-full flex flex-col items-center ">
            <TicTacToeProvider>
                <Header />
                <div className="flex justify-evenly items-center w-11/12 h-full relative">
                    <div className="border border-forthColor w-11/12 text-white flex flex-col h-[80%] items-center bg-linkBgColor rounded-3xl">
                        <div className="game_container h-full w-[90%] flex flex-col items-center justify-around">
                            <Score />
                            <hr className='border-white border w-full max-w-[1400px]'></hr>
                            <Game />
                        </div>
                    </div>
                </div>
            </TicTacToeProvider>
        </div>
    );
};

export default forwardRef(TicTacToe);
