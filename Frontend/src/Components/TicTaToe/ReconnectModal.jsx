import React from 'react'
import { useTicTacToe } from '../../context/TicTacToeContext';
import { useTranslation } from 'react-i18next';

const ReconnectModal = () => {

    const { reconnect_timer, formatTime } = useTicTacToe();
    const { t } = useTranslation();

    return (
        <div className={`w-[101%] backdrop-blur-md h-[101%] absolute top-0 -mt-1 border-[3px] flex flex-col items-center justify-evenly z-10 gap-6 rounded-[20px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg`}>
            <div className="relative flex flex-col justify-center items-center">
                <h1 className={`font-Plaguard xsm:text-[3.5vw] lg:text-4xl text-white mb-8 `}>{t("Waiting for the Opponent to Reconnect")} </h1>
                <p className={`font-Plaguard xsm:text-[10vw] lg:text-9xl text-white animate-pulse`}>{formatTime(reconnect_timer)}</p>
            </div>
        </div>
    )
}

export default ReconnectModal