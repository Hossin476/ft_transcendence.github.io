import { createContext, useEffect, useRef, useState } from "react"
import { useLocation } from 'react-router-dom';

const GameContext = createContext()

export default GameContext

export  const GameProvider = ({children})=>{
    const location = useLocation()
    const waiting = useRef(null)
    const score1 = useRef(null)
    const score2 = useRef(null)
    const beforeStart = useRef(null)
    const waitingStatus = useRef(null)
    const [gameid , setGameid] = useState()
    useEffect(()=>{

    },[location])
    const contextData = {
        score1: score1,
        beforeStart:beforeStart,
        score2: score2,
        waiting: waiting,
        waitingStatus: waitingStatus,
        setGameid:setGameid,
        gameid:gameid
    }

    return <GameContext.Provider value={contextData}>
        {children}
    </GameContext.Provider>
}


