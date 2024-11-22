import { useEffect, useRef, useCallback } from 'react';

const useWebSocket = (url, onMessage) => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket(url);
        socketRef.current.onopen = () => { };
        socketRef.current.onerror = () => { };
        socketRef.current.onclose = () => { };
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