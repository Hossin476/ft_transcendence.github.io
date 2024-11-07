
import { useEffect, useState } from "react";
import { Progress } from "./progressBar";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";


const OfflineWin = ({matchObj})=>{
    const navigate = useNavigate()
    return (
        <div className="w-[99%] h-[99%]  absolute z-20 backdrop-blur-lg  flex flex-col justify-center items-center xsm:text-[10px] lg:text-2xl rounded-lg">
        <div className="w-[70%] h-[100%]flex flex-col space-y-10 bg-secondaryColor p-10 rounded-lg  border-thirdColor border-[2px] ">
          <p className=" sm:text-[3vw] xl:text-[40px]   font-bold text-center leader flex justify-center items-center font-Valorax text-border ">GAME END</p>
          <p className=" font-bold text-center leader flex justify-center items-center  ">winner is {matchObj.winner} </p>
          <div className="flex items-center justify-between  w-[100%] ">
            <div className="flex flex-col items-center gap-2 p-2">
              <img src="/lshail.jpeg" className="rounded-full w-[100px] border-[2px] " />
              <p className="text-xl font-inter">{matchObj.player1}</p>
              <p className="text-xl font-inter"> {matchObj.score1} </p>
            </div>
            <p className="  sm:text-[5vw] xl:text-[80px]   font-bold text-center leader flex justify-center items-center font-Valorax text-border animate-bounce"> VS </p>
            <div className="flex flex-col items-center gap-2 ">
              <img src="/lshail.jpeg" className="rounded-full w-[100px]" />
              <p className="text-xl font-inter">{matchObj.player2}</p>
              <p className="text-xl font-inter"> {matchObj.score2}</p>
            </div>
          </div>
          <div className="flex justify-evenly w-[100%] "> 
            <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-[2px] w-[40%] rounded-lg border-thirdColor p-2" onClick={()=> navigate('/')} >HOME</button>
            <button className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-[2px] w-[40%] rounded-lg border-thirdColor p-2" onClick={()=> navigate('../')}>Play again </button>
          </div>
        </div>
        </div>
    )
}



export default function Win({iswin, game_id})
{
    const {tokens, username} = useAuth()
    const [userGame, setUserGame] = useState(null)
    const [Game, setGame] = useState(null)
    const location = useLocation()
    
    useEffect(()=>{
        const fetch_game = async ()=>{
            let url = null
            if (location.state.isonline == true)
                url = `http://${import.meta.env.VITE_BACKEND_URL}/api/pingpong/game/pingpong/${game_id}/`
            else
                url = `http://${import.meta.env.VITE_BACKEND_URL}/api/pingpong/game/pingpong/offline/${game_id}/`
            const response = await fetch(url,{
                headers: {Authorization : "JWT " + tokens.access}
            })
            const data = await response.json()
            if (location.state.isonline == false)
                setGame(data)
            else if (data.player1.username == username)
                setUserGame(data.player1)
            else if (data.player2.username == username)
                setUserGame(data.player2)
        }
        fetch_game()
    },[])
    return (
        <>
            {Game && location && location.state && location.state.isonline == false ? <OfflineWin matchObj={Game}/> : 
            <div className={`w-[101%] blurHelp h-[101%] absolute ${iswin? 'border-green-600': 'border-red-600'} border-[3px] flex flex-col items-center justify-evenly z-10 gap-6 rounded-[20px]`}>
                <div className="relative flex flex-col justify-center items-center">
                    <p className={`font-Plaguard xsm:text-[10vw] lg:text-9xl  ${iswin ?'text-green-500': 'text-red-600'} `}>{iswin? 'YOU WIN' : 'YOU LOSE'}</p>
                    {userGame && <div className="absolute  top-10 flex flex-col  items-center gap-2 w-[100%] ">
                        <img src={`http://localhost${userGame.profile_image}`} className="rounded-full xsm:w-[10vw] lg:w-[140px] xsm:h-[10vw] lg:h-[140px] border-[2px] border-forthColor object-cover" />
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
                    <button className="xsm:w-[60px]  xsm:h-[30px] lg:w-[120px] lg:h-[40px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-150 bg-secondaryColor font-inter lg:border-[2px] xsm:border-[1px] border-forthColor rounded-lg " onClick={()=> navigate('../')}>PLAY AGAIN</button>
                    <button className="xsm:w-[60px]  xsm:h-[30px] lg:w-[120px] lg:h-[40px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-150 bg-secondaryColor font-inter lg:border-[2px] xsm:border-[1px] border-forthColor rounded-lg " onClick={()=> navigate('/')}>HOME</button>
                </div>
            </div>
        }
        </>
    )
}
