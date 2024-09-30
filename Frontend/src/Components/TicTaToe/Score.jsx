import React, { useState, useEffect, useCallback } from 'react';
import FirstPlayer from './FirstPlayer';
import SecondPlayer from './SecondPlayer';
import Timer from './Timer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const BASE_URL = 'http://localhost:8000/api';

function Score() {
    const [users, setUsers] = useState({ player1: null, player2: null });

    const location = useLocation();
    const { tokens } = useAuth();
    const navigate = useNavigate();

    const isOffline = location.state?.isonline === false;
    const gameId = location.state?.gameid;

    const fetchData = useCallback(async () => {
        if (!gameId)
            return;

        const fetchUrl = `${BASE_URL}/${isOffline ? 'offline_user_data' : 'user_data'}/${gameId}`;

        try {
            const response = await fetch(fetchUrl, {
                headers: {
                    "Authorization": `JWT ${tokens.access}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setUsers({
                player1: data.player1 || null,
                player2: data.player2 || null
            });
        } catch (error) {
            console.error('Fetch failed: ', error);
        }
    }, [gameId, isOffline, tokens.access]);

    useEffect(() => {
        if (!gameId) {
            console.error('Game ID is undefined or null');
            navigate('/game');
            return;
        }

        fetchData();
    }, [gameId, fetchData, navigate]);

    const renderPlayer = (playerData, PlayerComponent) => {
        if (!playerData) return null;

        const profileImage = isOffline ? '/user.jpeg' : `${BASE_URL}${playerData.profile_image || ''}`;
        const username = typeof playerData === 'object' ? playerData.username : playerData;
        const rank = isOffline ? '' : (playerData.rank || '');

        return (
            <PlayerComponent
                profile_image={profileImage}
                username={username || 'Unknown'}
                rank={rank}
            />
        );
    };

    return (
        <div className="mt-4 flex w-full items-center xsm:gap-2 lg:gap-9">
            {renderPlayer(users.player1, FirstPlayer)}
            <Timer />
            {renderPlayer(users.player2, SecondPlayer)}
        </div>
    );
}

export default Score;