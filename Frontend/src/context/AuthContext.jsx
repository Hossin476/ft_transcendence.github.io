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

    const login = async (data) => {
        localStorage.setItem('tokens', JSON.stringify(data.tokens))
        setTokens(data.tokens)
        setUser(jwtDecode(data.tokens.access))
    }

    const logout = ()=>{
        localStorage.removeItem('tokens');
        setUser(null)
        setTokens(null)
    }

    const global_socket = () => {
        const ws = new WebSocket(`ws://backend:8000/ws/notifications/?token=${tokens.access}`)
        setSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connected');
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
        };
    }


    let value = {
        login,
        logout,
        user:user,
        tokens:tokens,
        socket: socket,
        global_socket
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}