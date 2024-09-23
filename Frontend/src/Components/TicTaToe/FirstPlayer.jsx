import React from 'react';
import { useTicTacToe } from '../../context/TicTacToeContext';

function FirstPlayer({profile_image, username, rank}) {
    const {scores} = useTicTacToe();

    return (
        <div className="flex first_player items-center text-white rounded-md flex-grow">
            <img src={'http://localhost' + profile_image} alt='avatar' className='xsm:w-[10vw] lg:w-[4.5rem] lg:h-[4.5rem] xsm:h-[10vw]  object-cover rounded-[50%]' />
            <div className="flex-1 xsm:ml-1 lg:ml-4">
                <h1 className="xsm:text-[2vw] lg:text-lg font-inter">{username}</h1>
                <h4 className="xsm:text-[1vw] lg:text-[0.7rem] font-inter">LEVEL {rank}</h4>
            </div>
            <h2 className="font-Plaguard xsm:text-[2vw] lg:text-4xl">{scores.X !== null ? scores.X : '--'}</h2>
        </div>
    );
}

export default FirstPlayer;
