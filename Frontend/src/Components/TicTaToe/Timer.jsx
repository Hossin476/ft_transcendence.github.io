import React, { useState, useEffect } from 'react'
import { useTicTacToe } from '../../context/TicTacToeContext';

function Timer() {
    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);

        return `${getMinutes}:${getSeconds}`;
    };

    const {timer} = useTicTacToe();

    return (
        <div className=" flex flex-col items-center justify-center border-2 max-w-48 border-white rounded-lg flex-grow">
            <h1 className="xsm:text-[2vw] lg:text-2xl text-white font-inter">Time</h1>
            <hr className='bg-gray-100 w-[50%] opacity-80'/>
            <h2 className="xsm:text-[2vw] lg:text-xl text-white font-inter">{formatTime(timer)}</h2>
        </div>
    );
}

export default Timer