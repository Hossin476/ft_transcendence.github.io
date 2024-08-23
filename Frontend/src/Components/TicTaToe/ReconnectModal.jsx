import React from 'react'
import { useTicTacToe } from '../../context/TicTacToeContext';
import { Progress } from "./progressBar";

const ReconnectModal = () => {

    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);

        return `${getMinutes}:${getSeconds}`;
    };

    const { reconnect_timer } = useTicTacToe();

    return (
        <div className={`w-[101%] blurHelp h-[101%] absolute  border-[3px] flex flex-col items-center justify-evenly z-10 gap-6 rounded-[20px]`}>
            <div className="relative flex flex-col justify-center items-center">
                <p className={`font-Plaguard xsm:text-[10vw] lg:text-9xl text-green-500 `}>{formatTime(reconnect_timer)}</p>
            </div>
            <div className="w-[100%] flex justify-center gap-9  xsm:text-[8px] lg:text-[15px] ">
                <button className="xsm:w-[60px]  xsm:h-[30px] lg:w-[120px] lg:h-[40px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-150 bg-secondaryColor font-inter lg:border-[2px] xsm:border-[1px] border-forthColor rounded-lg ">PLAY AGAIN</button>
                <button className="xsm:w-[60px]  xsm:h-[30px] lg:w-[120px] lg:h-[40px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-150 bg-secondaryColor font-inter lg:border-[2px] xsm:border-[1px] border-forthColor rounded-lg ">HOME</button>
            </div>
        </div>
    )
}

export default ReconnectModal