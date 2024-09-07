
import { useEffect, useState } from "react";
import { Progress } from "./progressBar";
import { useAuth } from "../../context/AuthContext";



export default function Win({iswin, game_id})
{
    const {tokens, username} = useAuth()
    const [userGame, setGame] = useState(null)
    useEffect(()=>{
        const fetch_game = async ()=>{
            const response = await fetch(`http://localhost:8000/pingpong/game/pingpong/${game_id}/`,{
                headers: {Authorization : "JWT " + tokens.access}
            })
            const data = await response.json()
            console.log("data winner  : ", data)
            if (data.player1.username == username)
                setGame(data.player1)
            else if (data.player2.username == username)
                setGame(data.player2)
        }
        fetch_game()
    },[])
    return (
        <div className={`w-[101%] blurHelp h-[101%] absolute ${iswin? 'border-green-600': 'border-red-600'} border-[3px] flex flex-col items-center justify-evenly z-10 gap-6 rounded-[20px]`}>
            <div className="relative flex flex-col justify-center items-center">
                <p className={`font-Plaguard xsm:text-[10vw] lg:text-9xl  ${iswin ?'text-green-500': 'text-red-600'} `}>{iswin? 'YOU WIN' : 'YOU LOSE'}</p>
                {userGame && <div className="absolute  top-10 flex flex-col  items-center gap-2 w-[100%] ">
                     <img src={`http://localhost:8000${userGame.profile_image}`} className="rounded-full xsm:w-[10vw] lg:w-[140px] xsm:h-[10vw] lg:h-[140px] border-[2px] border-forthColor object-cover" />
                    <p className="font-inter">{userGame.username}</p>
                    <p className="w-[100%] text-right">{iswin ? '+30XP': '+0XP'}</p>
                    <div className="w-[90%] font-inter text-xs bg-secondaryColor xsm:p-2  lg:p-3  flex flex-col justify-center items-center rounded-full border-[1px] ">
                        <div className="flex justify-between w-[100%] xsm:text-[8px] lg:text-[15px] ">
                            <p className="">LEVEL {userGame.rank}</p>
                            <p>LEVEL {userGame.rank + 1}</p>
                        </div>
                        <Progress value={userGame.xp%100} max={100}/>
                    </div>
                </div>}
            </div>
            <div className="w-[100%] flex justify-center gap-9  xsm:text-[8px] lg:text-[15px] ">
                <button className="xsm:w-[60px]  xsm:h-[30px] lg:w-[120px] lg:h-[40px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-150 bg-secondaryColor font-inter lg:border-[2px] xsm:border-[1px] border-forthColor rounded-lg ">PLAY AGAIN</button>
                <button className="xsm:w-[60px]  xsm:h-[30px] lg:w-[120px] lg:h-[40px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-150 bg-secondaryColor font-inter lg:border-[2px] xsm:border-[1px] border-forthColor rounded-lg ">HOME</button>
            </div>
        </div>
    )
}
