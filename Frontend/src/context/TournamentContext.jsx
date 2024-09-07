import React, { createContext, useContext } from 'react'


const TournamentContext = createContext();

export const useTournament = () => useContext(TournamentContext);

function TournamentProvider({ children }) {
    let fillToken = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null;
    const [tokens, setTokens] = useState(fillToken);
    const [user, setUser] = useState(tokens ? jwtDecode(tokens.access) : null)
    const [socket, setSocket] = useState(null)
    const [socketMessage, setSocketMessage] = useState(null)

    const login = async (data) => {
        localStorage.setItem('tokens', JSON.stringify(data.tokens))
        setTokens(data.tokens)
        setUser(jwtDecode(data.tokens.access))
    }

    const logout = () => {
        localStorage.removeItem('tokens');
        setUser(null)
        setTokens(null)
    }

    const tournament_socket = () => {
        let tour_id = 1;
        const ws = new WebSocket(`ws://localhost:8000/ws/tournament/${tour_id}/?token=${tokens.access}`)
        
        ws.onopen = () => {
            console.log('WebSocket connected');
            setSocket(ws);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close();
            setSocket(null)
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            ws.close();
            setSocket(null);
            setTimeout(tournament_socket, 5000)
        };
        ws.onmessage  = (e) =>{
            const data = JSON.parse(e.data);
            setSocketMessage(data)
        }
    }

    let value = {
        login,
        logout,
        user: user,
        tokens: tokens,
        socket: socket,
        tournament_socket,
        socketMessage : socketMessage
    }
    return (
        <TournamentContext.Provider values={value}>
            {children}
        </TournamentContext.Provider>
    )
}

export default TournamentProvider;