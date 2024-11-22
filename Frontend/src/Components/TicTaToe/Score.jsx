import React, { useState, useEffect, useCallback } from 'react';
import FirstPlayer from './FirstPlayer';
import SecondPlayer from './SecondPlayer';
import Timer from './Timer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTicTacToe } from '../../context/TicTacToeContext';

function Score() {
    const [users, setUsers] = useState({ player1: null, player2: null });
    const location = useLocation();
    const { tokens, customFetch } = useAuth();
    const navigate = useNavigate();
    const { scores } = useTicTacToe();

    const isOffline = location.state?.isonline === false;
    const gameId = location.state?.gameid;
    const BASE_URL = '/api';

    const fetchData = useCallback(async () => {
        if (!gameId) return;

        const fetchUrl = `${BASE_URL}/${isOffline ? 'offline_user_data' : 'user_data'}/${gameId}`;
        try {
            const response = await customFetch(fetchUrl, {
                headers: {
                    "Authorization": `JWT ${tokens.access}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setUsers({
                player1: data.player1 || null,
                player2: data.player2 || null
            });
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    }, [gameId, isOffline, tokens.access]);

    useEffect(() => {
        if (!gameId) {
            console.error('Game ID is undefined or null');
            navigate('/game');
            return;
        }
        fetchData();
    }, [fetchData, navigate]);

    const renderPlayer = (playerData, PlayerComponent) => {
        if (!playerData) return null;

        const profileImage = isOffline ? '/user.jpeg' : `${playerData.profile_image || ''}`;
        const username = typeof playerData === 'object' ? playerData.username : playerData;
        const rank = isOffline ? '1' : (playerData.rank || 1);
        const playerScore = scores[username];

        return (
            <PlayerComponent
                profile_image={profileImage}
                username={username}
                rank={rank}
                score={playerScore}
            />
        );
    };

    return (
        <div className="mt-10 flex w-full items-center xsm:gap-2 lg:gap-9">
            {renderPlayer(users.player1, FirstPlayer)}
            <Timer />
            {renderPlayer(users.player2, SecondPlayer)}
        </div>
    );
}

export default Score;