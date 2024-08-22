import React, { useState } from 'react';
import Notification from './Notification';

function NotificationModal() {
    const [notifications, setNotifications] = useState([
        { profile_pic: '/lshail.jpeg', content: 'This is notification 1', username: 'lahoucine', created_at: 'now', date: 'last week' },
        { profile_pic: '/lshail.jpeg', content: 'has invited you to a TicTacToe game', username: 'lahoucine', created_at: '2 minutes ago', date: 'today' },
    ]);

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
                    {notifications.map((notification, index) => (
                        <Notification key={index} notification={notification} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NotificationModal;
