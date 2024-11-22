import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTicTacToe } from "../../context/TicTacToeContext";
import { useAuth } from '../../context/AuthContext';
import { Progress } from "./progressBar";
import { useTranslation } from 'react-i18next';

const Win = ({ final_winner }) => {
    const { t } = useTranslation();
    const [gameData, setGameData] = useState({});
    const { playerRole } = useTicTacToe();
    const location = useLocation();
    const navigate = useNavigate();
    const { tokens, customFetch } = useAuth();

    const isWin = final_winner === playerRole;
    const isOffline = location.state?.isonline === false;
    const gameId = location.state?.gameid;
    const BASE_URL = '/api';

    const fetchGameData = useCallback(async () => {
        if (!gameId)
            return;
        const fetchUrl = `${BASE_URL}/${isOffline ? 'offline_winner_data' : 'winner_data'}/${gameId}`;
        try {
            const response = await customFetch(fetchUrl, {
                headers: {
                    "Authorization": `JWT ${tokens.access}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setGameData(data);
        } catch (error) {
            setGameData({})
        }
    }, [gameId, isOffline, tokens.access])

    useEffect(() => {
        if (!gameId) {
            navigate('/game');
            return;
        }

        fetchGameData();
    }, [navigate, isOffline, fetchGameData]);

    if (!gameData) return null;

    const playerData = isWin ? gameData.winner : gameData?.loser;
    let profileImage = `${gameData?.profile_image || '/user.jpeg'}`;

    const renderOfflineContent = () => (
        <>
            <p className={`font-Plaguard xsm:text-[8vw] lg:text-7xl text-green-500`}>
                {gameData?.winner} HAS WON
            </p>
            <img src={profileImage} alt="Player" className="mt-8 rounded-full xsm:w-[15vw] lg:w-[140px] border-[2px] border-forthColor object-cover" />
        </>
    );

    const renderOnlineContent = () => (
        <>
            <p className={`font-Plaguard xsm:text-[10vw] lg:text-9xl ${isWin ? 'text-green-500' : 'text-red-600'}`}>
                {isWin ? 'YOU WIN' : 'YOU LOSE'}
            </p>
            <div className="flex flex-col items-center gap-2 w-full">
                <img src={playerData?.profile_image} alt="Player" className="rounded-full xsm:w-[10vw] lg:w-[140px] border-[2px] border-forthColor object-cover" />
                <p className="font-inter">{playerData?.username}</p>
                <p className="w-full text-right"> {isWin ? '+30XP' : '+0XP'} </p>
                <div className="w-[90%] font-inter text-xs bg-secondaryColor xsm:p-2 lg:p-3 flex flex-col justify-center items-center rounded-full border-[1px]">
                    <div className="flex justify-between w-full xsm:text-[8px] lg:text-[15px]">
                        <p>{t("LEVEL")} {playerData?.rank}</p>
                        <p>{t("LEVEL")} {playerData?.rank + 1}</p>
                    </div>
                    <Progress value={playerData.xp % 100} max={100} />
                </div>
            </div>
        </>
    );

    return (
        <div className={`w-[101%] h-[101%] top-0 -mt-1 backdrop-blur-md  absolute ${isOffline ? 'border-green-600' : isWin ? 'border-green-600' : 'border-red-600'} border-[3px] flex flex-col items-center justify-evenly z-10 rounded-[20px]`}>
            <div className="flex flex-col justify-center items-center">
                {isOffline ? renderOfflineContent() : renderOnlineContent()}
            </div>
            <div className="flex justify-evenly w-full">
                <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-[2px] w-[40%] max-w-[200px] rounded-lg border-thirdColor p-2" onClick={() => navigate('/')}>{t("HOME")}</button>
                <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-[2px] w-[40%] max-w-[200px] rounded-lg border-thirdColor p-2" onClick={() => navigate('/game')}>{t("PLAY AGAIN")}</button>
            </div>
        </div>
    );
};

export default Win;