import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
// import FriendResponseNotification from './FriendResponseNotification';
// import GameResponseNotification from './GameResponseNotification'
// import ReconnectNotification from './ReconnectNotification'
// import FriendNotification from './FriendNotification'
import GameNotification from './GameNotification';

function NotificationModal() {
    const [notifications, setNotifications] = useState([]);
    const {tokens} = useAuth()

    useEffect(()=>
    {
        async function fetchData()
        {
            const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/notification/`, {
                headers: {
                    "Authorization": "JWT " + tokens.access,
                    "content-Type": "application/json"
                }
            })
            setNotifications(await response.json())
        }
        fetchData();
    }, [])

    return (
        <div className="relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white dark:border-b-white"></div>
            <div className="bg-white text-gray-800 dark:text-white w-[22rem] md:w-[28rem] lg:w-[36rem] h-[50rem] rounded-lg shadow-xl overflow-hidden">
                <div className="sticky top-0 py-4 border-b bg-white border-gray-300 dark:border-gray-400 z-10">
                    <h1 className="text-xl text-black md:text-2xl font-semibold pl-6">
                        Notifications <span className="text-blue-600 dark:text-blue-400">({notifications.length})</span>
                    </h1>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-5rem)]">
                        {/* <FriendNotification key={index} notification={notification}/> */}
                    {notifications.map((notification, index) => (
                        <GameNotification key={index} notification={notification} />
                    ))}
                    {/* <ReconnectNotification /> */}
                    {/* <FriendResponseNotification username={"hamza"} response={"rejected"} />
                    <GameResponseNotification username={"user"} response={"rejected"} /> */}
                </div>
            </div>
        </div>
    );
}

export default NotificationModal;
