import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AES, enc } from 'crypto-js';

const AuthContext = createContext();

const getUserData = async (access, customFetch) => {
    try {
        const response = await customFetch("/api/users/user_info/", {
            method: "GET",
            headers: {
                "Authorization": "JWT " + access,
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const useAuth = () => useContext(AuthContext);

const checkRequiredProperties = (obj) => {
    return obj && obj.hasOwnProperty('access') && obj.hasOwnProperty('refresh') && obj.hasOwnProperty('username');
};

const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

export const AuthProvider = ({ children }) => {
    const nav = useNavigate();
    let fillToken = null;
    try {
        const encryptedToken = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null;
        fillToken = localStorage.getItem('tokens') ? JSON.parse(AES.decrypt(encryptedToken, import.meta.env.VITE_CRYPTO_KEY).toString(enc.Utf8)) : null;
    } catch (error) {
        localStorage.removeItem('tokens');
        nav('/login');
    }

    const [tokens, setTokens] = useState(checkRequiredProperties(fillToken) ? fillToken : null);
    const [user, setUser] = useState(checkRequiredProperties(fillToken) ? jwtDecode(fillToken.access) : null);
    const [socket, setSocket] = useState(null);
    const [username, setUserName] = useState(checkRequiredProperties(fillToken) ? fillToken.username : null);
    const [chatsocket, setChatSocket] = useState(null);
    const [socketMessage, setSocketMessage] = useState(null);

    const login = async (data) => {
        try {
            const encryptedToken = AES.encrypt(JSON.stringify(data.tokens), import.meta.env.VITE_CRYPTO_KEY).toString();
            localStorage.setItem('tokens', JSON.stringify(encryptedToken));
            setTokens(data.tokens);
            setUser(data.tokens.user);
            setUserName(data.tokens?.username);
        } catch (error) {
        }
    };

    const logout = async () => {
        try {
            const res = await fetch(`/api/auth/logout/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "JWT " + tokens.access
                },
                body: JSON.stringify({ "refresh_token": tokens.refresh })
            });
            if (socket) socket.send(JSON.stringify({ "type": "log_out" }));
            localStorage.removeItem('tokens');
            setUser(null);
            setTokens(null);
            setUserName(null);
            if (socket) socket.close();
            if (chatsocket) chatsocket.close();
        } catch (error) {
            if (socket) socket.send(JSON.stringify({ "type": "log_out" }));
            localStorage.removeItem('tokens');
            setUser(null);
            setTokens(null);
            setUserName(null);
            if (socket) socket.close();
            if (chatsocket) chatsocket.close();
        }
    };

    const global_socket = () => {
        if (socket) socket.close();
        const ws = new WebSocket(`wss://${window.location.host}/ws/notifications/?token=${tokens.access}`);
        ws.onopen = () => {
            setSocket(ws);
            console.log('WebSocket connected');
            setUserName(tokens?.username);
        };
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close();
            setSocket(null);
            global_socket();
        };
        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setSocket(null);
        };
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log('WebSocket message received:', data);
            setSocketMessage(data);
        };
    };

    const createSocket = () => {
        if (chatsocket) chatsocket.close();
        let ws = new WebSocket(`wss://${window.location.host}/ws/chat/?token=${tokens.access}`);
        ws.onopen = (e) => {
            setChatSocket(() => ws);
            console.log("Chat socket opened");
        };
        ws.onclose = (e) => {
            console.log("Chat socket closed");
        };
        ws.onerror = (e) => {
            console.error("Chat socket error:", e);
            createSocket();
        };
    };

    const updateUser = async (tokens) => {
        if (!tokens) return;
        let data = await getUserData(tokens.access, customFetch);
        if (data) {
            setUser(() => {
                return { ...data, user_id: data.id };
            });
        }
    };

    const customFetch = async (url, options) => {
        try {
            if (tokens) {
                const decodedToken = jwtDecode(tokens.access);
                const currentTime = Date.now() / 1000;
                const access = await fetch('/api/auth/token/verify/', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + tokens.access
                    },
                });
                if (access.status === 404) {
                    localStorage.removeItem('tokens');
                    setUser(null);
                    setTokens(null);
                    setUserName(null);
                    nav('/login');
                    return;
                }
                if (decodedToken.exp < currentTime || !access.ok) {
                    try {
                        const response = await fetch('/api/auth/token/refresh/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ refresh: tokens.refresh })
                        });
                        if (response.ok) {
                            const newTokens = await response.json();
                            const tokens2set = AES.encrypt(JSON.stringify({ ...tokens, ...newTokens }), import.meta.env.VITE_CRYPTO_KEY).toString();
                            localStorage.setItem('tokens', JSON.stringify(tokens2set));
                            setTokens({ ...tokens, access: newTokens.access });
                            options.headers["Authorization"] = "JWT " + newTokens.access;
                        } else {
                            localStorage.removeItem('tokens');
                            setUser(null);
                            setTokens(null);
                            setUserName(null);
                            nav('/login');
                            return;
                        }
                    } catch (error) {
                        localStorage.removeItem('tokens');
                        setUser(null);
                        setTokens(null);
                        setUserName(null);
                        nav('/login');
                        return;
                    }
                }
            }
            return fetch(url, options);
        } catch (error) {
            setUser(null);
            setTokens(null);
            setUserName(null);
            nav('/login');
        }
    };

    useEffect(() => {
        if (tokens) {
            updateUser(tokens);
        }
    }, [tokens]);

    useEffect(() => {
        return () => {
            if (socket) socket.close();
            if (chatsocket) chatsocket.close();
        };
    }, []);

    let value = {
        login,
        logout,
        user,
        tokens,
        socket,
        username,
        global_socket: debounce(global_socket, 300),
        socketMessage,
        createSocket: debounce(createSocket, 300),
        chatsocket,
        setUser,
        customFetch,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};