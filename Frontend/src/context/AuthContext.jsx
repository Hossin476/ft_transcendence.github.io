import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    let fillToken = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null;
    const [tokens, setTokens] = useState(fillToken);
    const [user, setUser] = useState(tokens ? jwtDecode(tokens.access) : null)
    const [socket, setSocket] = useState(null)
    const [username, setUserName] = useState(null);
    const [chatsocket, setChatSocket] = useState(null)
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

    const global_socket = () => {
        const ws = new WebSocket(`ws://${import.meta.env.VITE_BACKEND_URL}/ws/notifications/?token=${tokens.access}`)
        
        ws.onopen = () => {
            setSocket(ws);
            console.log('WebSocket connected');
            axios.get(`http://${import.meta.env.VITE_BACKEND_URL}/api/auth/users/me/`,
                {
                    headers: {
                        "Authorization": "JWT " + tokens.access
                    }
                }
            ).then((data) => {
                setUserName(data.data.username)
            }).catch((error) => {
                console.log("error ", error.message)
            })
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
            setTimeout(global_socket, 5000)
        };
        ws.onmessage  = (e) =>{
            const data = JSON.parse(e.data);
            setSocketMessage(data)
        }
    }

    const createSocket = ()=> {
        let ws = new WebSocket(`ws://${import.meta.env.VITE_BACKEND_URL}/ws/chat/?token=${tokens.access}`)
         ws.onopen = (e)=> {
             setChatSocket(()=>ws)
             console.log("socket opened")
         }
         ws.onclose = (e)=> {
             console.log("socket closed")
         }
     }

    let value = {
        login,
        logout,
        user: user,
        tokens: tokens,
        socket: socket,
        username: username,
        global_socket,
        socketMessage : socketMessage,
        createSocket,
        chatsocket:chatsocket,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}