import { useContext } from "react"
import GameContext from "../../context/gameContext"

export default function GameCounter(){
    const  {waiting,waitingStatus} = useContext(GameContext)
    return (
      <div className="z-50 blurHelp flex justify-center items-center flex-col gap-2 w-full h-full absolute rounded-2xl">
        <p className="font-Plaguard xl:text-5xl sm:text-2xl" ref={waitingStatus}></p>
        <p className="font-Plaguard xl:text-5xl sm:text-xl" ref={waiting}></p>
      </div>
    )
  }