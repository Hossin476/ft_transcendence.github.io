import React, { createContext, useState, useContext } from 'react';

const TicTacToeContext = createContext();

export const useTicTacToe = () => useContext(TicTacToeContext);

export const TicTacToeProvider = ({ children }) => {
    const [scores, setScores] = useState({ X: null, O: null });
    const [timer, setTimer] = useState(0);
    const [playerRole, setPlayerRole] = useState(null);
    const [reconnect_timer, setReconnectTimer] = useState(0);

    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);

        return `${getMinutes}:${getSeconds}`;
    };

    const values =
    {
        scores,
        setScores,
        timer,
        setTimer,
        playerRole,
        setPlayerRole,
        reconnect_timer,
        setReconnectTimer,
        formatTime
    }

    return (
        <TicTacToeContext.Provider value={values}>
            {children}
        </TicTacToeContext.Provider>
    );
};
