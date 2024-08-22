import React from 'react';
import {useAuth} from '../../context/AuthContext'

function Notification({ notification }) {

    const {socket} = useAuth();

    function accept_game()
    {
        console.log("accept")
    }
    function reject_game()
    {
        console.log("reject")
    }

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex items-start hover:bg-gray-200 transition duration-300">
            <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                <img src={notification.profile_pic} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="flex-grow ml-4">
                <h3 className="text-black text-lg mt-1 max-w-[15rem] flex-wrap">
                    {notification.username} {notification.content}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{notification.created_at}</p>
            </div>
            <div className="flex items-center ml-4 my-auto space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300" onClick={accept_game}>
                    Accept
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300" onClick={reject_game}>
                    Reject
                </button>
            </div>
        </div>
    );
}

export default Notification;
