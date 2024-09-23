import React, { useState, useEffect } from 'react';
import FirstPlayer from './FirstPlayer';
import SecondPlayer from './SecondPlayer';
import Timer from './Timer';
import { useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';

function Score() {
    const [users, setUsers] = useState({ player1: {}, player2: {} });
    const location = useLocation();
    const { tokens } = useAuth();
    let fetch_url;
    let is_offline = users && location.state?.isonline == false;
    const img = 'user.jpeg';
    useEffect(() => {
        async function fetchData() {
            if (location.state?.isonline == true)
                fetch_url = `http://${import.meta.env.VITE_BACKEND_URL}/api/user_data/${location.state?.gameid}`
            else
                fetch_url = `http://${import.meta.env.VITE_BACKEND_URL}/api/offline_user_data/${location.state?.gameid}`
            const response = await fetch(fetch_url, {
                headers: {
                    "Authorization": "JWT " + tokens.access,
                    "content-Type": "application/json"
                }
            });
            const data = await response.json();
            setUsers(prevState => ({
                ...prevState,
                player1: data.player1 || {},
                player2: data.player2 || {}
            }));
        }
        fetchData();
    }, [location.state?.gameid, tokens.access]);

    return (
        <>
            {
                is_offline ? (
                    <div className="mt-4 flex w-full items-center xsm:gap-2 lg:gap-9">
                        <FirstPlayer profile_image={img} username={users.player1.player1} rank={1} />
                        <Timer />
                        <SecondPlayer profile_image={img} username={users.player2.player2} rank={3} />
                    </div>
                ) : (
                    <div className="mt-4 flex w-full items-center xsm:gap-2 lg:gap-9">
                        <FirstPlayer profile_image={users.player1.profile_image} username={users.player1.username} rank={users.player1.rank} />
                        <Timer />
                        <SecondPlayer profile_image={users.player2.profile_image} username={users.player2.username} rank={users.player2.rank} />
                    </div>
                )
            }
        </>


    );
}

export default Score;