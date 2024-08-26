import { createContext, useRef } from "react"

const GameContext = createContext()

export default GameContext

export  const GameProvider = ({children})=>{
    const waiting = useRef(null)
    const score1 = useRef(null)
    const score2 = useRef(null)
    const waitingStatus = useRef(null)

    const contextData = {
        score1: score1,
        score2: score2,
        waiting: waiting,
        waitingStatus: waitingStatus
    }

    return <GameContext.Provider value={contextData}>
        {children}
    </GameContext.Provider>
}


