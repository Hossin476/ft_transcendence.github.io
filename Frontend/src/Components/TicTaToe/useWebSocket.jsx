import { useEffect, useRef, useCallback } from 'react';

const useWebSocket = (url, onMessage) => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket(url);
        socketRef.current.onopen = () => { console.log("Websocket Connected!") };
        socketRef.current.onerror = (error) => { console.log("an Error Occured: ", error) };
        socketRef.current.onclose = () => { console.log("Websocket Disconnected!") };
        socketRef.current.onmessage = (event) => onMessage(JSON.parse(event.data));

        return () => {
            if (socketRef.current) socketRef.current.close();
        };
    }, [url, onMessage]);

    const sendMessage = useCallback((message) => {
        if (socketRef.current?.readyState === WebSocket.OPEN)
            socketRef.current.send(JSON.stringify(message));
    }, []);

    return sendMessage;
};

export default useWebSocket;