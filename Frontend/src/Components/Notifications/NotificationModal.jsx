import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import FriendNotification from './FriendNotification';
import GameNotification from './GameNotification';
import FriendResponseNotification from './FriendResponseNotification';

function NotificationModal() {
    const [notifications, setNotifications] = useState([]);
    const { tokens, socketMessage, customFetch } = useAuth();

    const fetchData = useCallback(async () => {
        try {
            const response = await customFetch('/api/notification/', {
                headers: {
                    "Authorization": "JWT " + tokens.access,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok)
                throw new Error(`HTTP error!  status: ${response.status}`);
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error('Fetch failed: ', error);
            setNotifications([])
        }
    }, [tokens.access]);

    useEffect(() => {
        fetchData();
    }, [socketMessage, fetchData]);

    return (
        <div className="bg-white text-gray-800 dark:text-white w-[22rem] md:w-[32rem] xsm:w-[24rem] xsm:h-[40rem] sm:w-[26rem] lg:w-[36rem] h-[50rem] rounded-lg shadow-xl overflow-hidden">
            <div className="sticky top-0 py-4 border-b bg-white border-gray-300 dark:border-gray-400 z-10">
                <h1 className="text-xl text-black md:text-2xl font-semibold pl-6">
                    Notifications <span className="text-blue-600 dark:text-blue-400">({notifications.length})</span>
                </h1>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-5rem)]">
                {notifications.map((notification, index) => {
                    if (notification.type === 'friend')
                        return <FriendNotification key={index} notification={notification} />;
                    else if (notification.type === 'game')
                        return <GameNotification key={index} notification={notification} />;
                    else if (notification.type === 'friend_response')
                        return <FriendResponseNotification key={index} response={notification.response} />;
                    return null;
                })}
            </div>
        </div>
    );
}

export default NotificationModal;