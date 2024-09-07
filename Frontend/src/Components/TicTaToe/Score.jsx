import React, { useState, useEffect } from 'react';
import FirstPlayer from './FirstPlayer';
import SecondPlayer from './SecondPlayer';
import Timer from './Timer';
import { useTicTacToe } from '../../context/TicTacToeContext';
import {useLocation} from 'react-router'
import { useAuth } from '../../context/AuthContext';

function Score() {
    const [users, setUsers] = useState({ player1: {}, player2: {} })
    const location = useLocation()
    const {tokens} = useAuth()

    useEffect(() => {

        async function fetchData() {
            const response = await fetch(`http://localhost:8000/user_data/${location.state.gameid}`, {
                headers: {
                    "Authorization": "JWT " + tokens.access,
                    "content-Type": "application/json"
                }
            })
            const data = await response.json();
            setUsers(prevState => ({
                ...prevState,
                player1: data.player1 || {},
                player2: data.player2 || {}
            }));
        }
        fetchData();
    }, [])

    return (
        <div className="mt-4 flex w-full items-center xsm:gap-2 lg:gap-9">
            <FirstPlayer player1={users.player1}/>
            <Timer />
            <SecondPlayer player2={users.player2}/>
        </div>
    );
}

export default Score;