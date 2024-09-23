import React from 'react';
import { useTicTacToe } from '../../context/TicTacToeContext';

function SecondPlayer({username, rank,profile_image }) {

    const {scores} = useTicTacToe();
    return (
        <div className="flex items-center second_player text-white rounded-md flex-grow">
            <h2 className="font-Plaguard xsm:text-[2vw] lg:text-4xl">{scores.O !== null ? scores.O : '--'}</h2>
            <div className="flex-1 xsm:mr-1 lg:mr-4">
                <h1 className="font-inter xsm:text-[2vw] lg:text-lg text-right">{username}</h1>
                <h4 className="font-inter text-right xsm:text-[1vw] lg:text-[0.7rem]">LEVEL {rank}</h4>
            </div>
            <img src={'http://localhost' + profile_image} alt='avatar' className='xsm:w-[10vw] lg:w-[4.5rem] lg:h-[4.5rem] xsm:h-[10vw] object-cover rounded-[50%]' />
        </div>
    );
}

export default SecondPlayer;