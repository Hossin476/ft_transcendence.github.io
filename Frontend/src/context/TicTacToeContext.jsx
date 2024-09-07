import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const TicTacToeContext = createContext();

export const useTicTacToe = () => useContext(TicTacToeContext);

export const TicTacToeProvider = ({ children }) => {
    const [scores, setScores] = useState({ X: null, O: null });
    const [timer, setTimer] = useState(0);
    const [playerRole, setPlayerRole] = useState(null)
    const [reconnect_timer, setReconnectTimer] = useState(0);

    const values =
    {
        scores: scores,
        setScores,
        timer: timer,
        setTimer,
        playerRole: playerRole,
        setPlayerRole,
        reconnect_timer,
        setReconnectTimer
    }

    return (
        <TicTacToeContext.Provider value={values}>
            {children}
        </TicTacToeContext.Provider>
    );
};
