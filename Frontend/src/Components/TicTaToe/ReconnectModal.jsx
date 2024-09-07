import React from 'react'
import { useTicTacToe } from '../../context/TicTacToeContext';

const ReconnectModal = () => {

    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);

        return `${getMinutes}:${getSeconds}`;
    };

    const { reconnect_timer } = useTicTacToe();

    return (
        <div className={`w-[101%] blurHelp h-[101%] absolute border-[3px] flex flex-col items-center justify-evenly z-10 gap-6 rounded-[20px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg`}>
            <div className="relative flex flex-col justify-center items-center">
                <h1 className={`font-Plaguard xsm:text-[3.5vw] lg:text-4xl text-white mb-8 `}>Waiting for the Opponent to Reconnect </h1>
                <p className={`font-Plaguard xsm:text-[10vw] lg:text-9xl text-white animate-pulse`}>{formatTime(reconnect_timer)}</p>
            </div>
        </div>
    )
}

export default ReconnectModal