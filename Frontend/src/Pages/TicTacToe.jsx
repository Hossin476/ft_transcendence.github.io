import React, { useRef, useState, forwardRef } from 'react';
import '../tictactoe.css';
import Header from '../Components/TicTaToe/Header';
import Game from '../Components/TicTaToe/Game';
import Score from '../Components/TicTaToe/Score';

const TicTacToe = () => {
    const [scores, setScores] = useState({ X: 0, O: 0 });
    const score = useRef();

    const updateScores = (winner) => {
        setScores((prevScores) => ({
            ...prevScores,
            [winner]: prevScores[winner] + 1,
        }));
    };

    return (
        <div className="container_tournament bg-primaryColor w-full h-full flex flex-col items-center">
            <Header />
            <div className="flex justify-evenly items-center w-11/12 h-full">
                <div className="border border-forthColor w-11/12 text-white flex flex-col h-[80%] items-center  bg-linkBgColor rounded-3xl">
                    <div className="game_container h-full w-[90%] flex flex-col items-center justify-around">
                        <Score ref={score} scores={scores} />
                        <hr className='border-white border w-full max-w-[1400px]'></hr>
                        <Game updateScores={updateScores} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(TicTacToe);
