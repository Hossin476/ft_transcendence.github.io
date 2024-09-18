import React, { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext';


const TournamentContext = createContext();

export const useTournament = () => useContext(TournamentContext);

function TournamentProvider({ children }) {
    const [socket, setSocket] = useState(null)
    const [socketMessage, setSocketMessage] = useState(null)
    const {tokens} = useAuth()


    const handlesetMessage = (message)=>{
        setSocketMessage(message)
    }
    let value = {
        socket: socket,
        setTournamentSocket:setSocket,
        socketMessage : socketMessage,
        handlesetMessage,
    }
    return (
        <TournamentContext.Provider value={value}>
            {children}
        </TournamentContext.Provider>
    )
}

export default TournamentProvider;