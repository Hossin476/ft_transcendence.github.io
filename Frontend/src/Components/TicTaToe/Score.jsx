import React, { useState, useEffect } from 'react';
import FirstPlayer from './FirstPlayer';
import SecondPlayer from './SecondPlayer';
import Timer from './Timer';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

function Score() {
    const [users, setUsers] = useState({ player1: {}, player2: {} });
    const location = useLocation();
    const { tokens } = useAuth();
    const navigate = useNavigate();
    const is_offline = users && location.state?.isonline == false;
    useEffect(() => {
        if (!location.state?.gameid) {
            console.error('Game ID is undefined or null');
            navigate('/game');
            return;
        }

        const fetchData = async () => {
            const fetch_url = location.state?.isonline === true
                ? `http://localhost:8000/user_data/${location.state?.gameid}`
                : `http://localhost:8000/offline_user_data/${location.state?.gameid}`;

            try {
                const response = await fetch(fetch_url, {
                    headers: {
                        "Authorization": "JWT " + tokens.access,
                        "content-Type": "application/json"
                    }
                });

                if (!response.ok) 
                    throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                setUsers({
                    player1: data.player1 || {},
                    player2: data.player2 || {}
                });
            } catch (error) {
                console.error('Fetch failed: ', error);
            }
        }

        fetchData();
    }, [location.state?.gameid, tokens.access]);

    return (
        <>
            {
                is_offline ? (
                    <div className="mt-4 flex w-full items-center xsm:gap-2 lg:gap-9">
                        <FirstPlayer profile_image={'/user.jpeg'} username={typeof users.player1 === 'object' ? users.player1.username : users.player1} rank={1} />
                        <Timer />
                        <SecondPlayer profile_image={'/user.jpeg'} username={typeof users.player2 === 'object' ? users.player2.username : users.player2} rank={3} />
                    </div>
                ) : (
                    <div className="mt-4 flex w-full items-center xsm:gap-2 lg:gap-9">
                        <FirstPlayer profile_image={'http://localhost:8000' + users.player1?.profile_image || ''} username={users.player1?.username || ''} rank={users.player1?.rank || ''} />
                        <Timer />
                        <SecondPlayer profile_image={'http://localhost:8000' + users.player2?.profile_image || ''} username={users.player2?.username || ''} rank={users.player2?.rank || ''} />
                    </div>
                )
            }
        </>
    );
}

export default Score;