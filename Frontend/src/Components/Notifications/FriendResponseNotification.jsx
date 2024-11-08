import React from 'react'
import { FaUserCheck } from 'react-icons/fa';

function FriendResponseNotification({response }) {

    return (
        <div className={`p-5 rounded-lg shadow-lg flex items-start transition-all duration-300 ease-in-out bg-green-200 hover:bg-green-300`}>
            <FaUserCheck size={35} color={'green'} className="mr-4 my-auto" />
            <div className="flex-grow my-auto">
                <p className={`text-lg text-green-900`}>
                {response}
                </p>
            </div>
        </div>
    )
}

export default FriendResponseNotification;