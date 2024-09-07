import { useTicTacToe } from "../../context/TicTacToeContext";
import { Progress } from "./progressBar";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export default function Win({ final_winner }) {
    const { playerRole } = useTicTacToe();
    let isWin = final_winner === playerRole;
    let location = useLocation();
    let { tokens } = useAuth();
    const [gameData, setGameData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:8000/winner_data/${location.state.gameid}`, {
                headers: {
                    "Authorization": "JWT " + tokens.access
                }
            });
            const data = await response.json();
            setGameData(data);
        }
        fetchData();
    }, [location.state.gameid, tokens.access]);

    if (!gameData)
        return null;
    const playerData = isWin ? gameData.winner : gameData.loser;

    return (
        <div className={`w-[101%] blurHelp h-[101%] absolute ${isWin ? 'border-green-600' : 'border-red-600'} border-[3px] flex flex-col items-center justify-evenly z-10 gap-6 rounded-[20px]`}>
            <div className="relative flex flex-col justify-center items-center">
                <p className={`font-Plaguard xsm:text-[10vw] lg:text-9xl ${isWin ? 'text-green-500' : 'text-red-600'}`}>
                    {isWin ? 'YOU WIN' : 'YOU LOSE'}
                </p>
                <div className="absolute top-10 flex flex-col items-center gap-2 w-[100%]">
                    <img src='/lshail.jpeg' alt="Player" className="rounded-full xsm:w-[10vw] lg:w-[140px] border-[2px] border-forthColor object-cover" />
                    <p className="font-inter">{playerData.username}</p>
                    <p className="w-[100%] text-right"> {isWin ? '+30XP' : '+0XP'} </p>
                    <div className="w-[90%] font-inter text-xs bg-secondaryColor xsm:p-2 lg:p-3 flex flex-col justify-center items-center rounded-full border-[1px]">
                        <div className="flex justify-between w-[100%] xsm:text-[8px] lg:text-[15px]">
                            <p className="">LEVEL {playerData.rank}</p>
                            <p>LEVEL {playerData.rank + 1}</p>
                        </div>
                        <Progress value={playerData.xp % 100} max={100} />
                    </div>
                </div>
            </div>
        </div>
    );
}
