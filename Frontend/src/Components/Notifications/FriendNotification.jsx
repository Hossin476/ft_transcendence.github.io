import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'
import moment from 'moment';
import { IoMdPersonAdd } from "react-icons/io";



function FriendNotification({ notification }) {

    const { setFriendReceiver } = useAuth();

    // function accept_friendship(receiver) {
    //     if (socket) {
    //         const message = JSON.stringify({
    //             "type": "friend_accept",
    //             "receiver": receiver
    //         })
    //         socket.send(message);
    //     }
    // }

    // function reject_friendship(receiver) {
    //     if (socket) {
    //         const message = JSON.stringify({
    //             "type": "friend_reject",
    //             "receiver": receiver
    //         })
    //         socket.send(message);
    //     }
    // }

    useEffect(() => { setFriendReceiver(notification.sender?.username) }, []);

    return (
        <>
            <div className={`p-5 rounded-lg shadow-lg flex items-start transition-all duration-300 ease-in-out bg-gray-100`}>
                <IoMdPersonAdd size={35} className="mr-4 my-auto" />
                <div className="flex-grow my-auto">
                    <h3 className={`text-lg `}>
                        {notification.sender?.username} has sent you a friend request
                    </h3>
                    <p className="text-sm text-gray-400 ">{moment(notification.created_at).fromNow()}</p>
                </div>
            </div>
        </>
    );
}

export default FriendNotification;
