import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import axiosInstance from '../utils/axiosInstance';

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
        console.log(data)
        localStorage.setItem('tokens', JSON.stringify(data.tokens))
        setTokens(data.tokens)
        setUser(jwtDecode(data.tokens.access))
    }

    const logout = async () => {

        try {
            const res = await fetch(`/api/auth/logout/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "JWT " + tokens.access
                    },
                    body: JSON.stringify({ "refresh_token": tokens.refresh })
                }
            )
            if (res.ok) {
                if (socket)
                    socket.send(JSON.stringify({ "type": "log_out" }))
                localStorage.removeItem('tokens');
                setUser(null)
                setTokens(null)
            }
        }
        catch (error) {
            console.error('Error logging out:', error)
        }
    };

    const global_socket = () => {
        const ws = new WebSocket(`wss://${window.location.host}/ws/notifications/?token=${tokens.access}`)

        ws.onopen = () => {
            setSocket(ws);
            console.log('WebSocket connected');
            axios.get(`/api/auth/users/me/`,
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
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setSocketMessage(data)
        }
    }

    const createSocket = () => {
        let ws = new WebSocket(`wss://${window.location.host}/ws/chat/?token=${tokens.access}`)
        ws.onopen = (e) => {
            setChatSocket(() => ws)
            console.log("socket opened")
        }
        ws.onclose = (e) => {
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
        socketMessage: socketMessage,
        createSocket,
        chatsocket: chatsocket,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}