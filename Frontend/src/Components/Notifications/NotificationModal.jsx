import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
// import FriendResponseNotification from './FriendResponseNotification';
// import GameResponseNotification from './GameResponseNotification'
// import ReconnectNotification from './ReconnectNotification'
import FriendNotification from './FriendNotification'
import GameNotification from './GameNotification';

function NotificationModal() {
    const [notifications, setNotifications] = useState([]);
    const { tokens, socketMessage } = useAuth()

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8000/api/notification/', {
                headers: {
                    "Authorization": "JWT " + tokens.access,
                    "content-Type": "application/json"
                }
            })

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json()
            const notifications = data.map(notification => ({
                ...notification,
                type: notification.isgame === true ? 'game' : 'friend',
            }));
            setNotifications(notifications);
            console.log("notifications ", notifications)
        } catch (error) {
            console.error('Fetch failed: ', error);
        }

    }, [])

    useEffect(() => {

        fetchData();
    }, [socketMessage, fetchData])

    return (
        <div className="bg-white text-gray-800 dark:text-white w-[22rem] md:w-[32rem] xsm:w-[24rem] xsm:h-[40rem] sm:w-[26rem] lg:w-[36rem] h-[50rem] rounded-lg shadow-xl overflow-hidden">
            <div className="sticky top-0 py-4 border-b bg-white border-gray-300 dark:border-gray-400 z-10">
                <h1 className="text-xl text-black md:text-2xl font-semibold pl-6">
                    Notifications <span className="text-blue-600 dark:text-blue-400">({notifications.length})</span>
                </h1>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-5rem)]">
                {notifications.map((notification, index) => (
                    notification.type === 'friend'
                        ? <FriendNotification key={index} notification={notification} />
                        : <GameNotification key={index} notification={notification} />
                ))}
            </div>
        </div>
    );
}

export default NotificationModal;
