import React, { useEffect } from 'react';
import moment from 'moment';
import { IoMdPersonAdd } from "react-icons/io";

function FriendNotification({ notification }) {

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
