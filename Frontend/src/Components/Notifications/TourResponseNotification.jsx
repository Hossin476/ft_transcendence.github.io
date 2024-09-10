import React from 'react'
import { FaUserCheck, FaUserTimes } from 'react-icons/fa';

function TourResponseNotification({msg, response}) {
    const bgColor = response === "accepted" ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300';
    const textColor = response === "accepted" ? 'text-green-900' : 'text-red-900';
    const Icon = response === "accepted" ? FaUserCheck : FaUserTimes;

    return (
        <div className={`p-5 rounded-lg shadow-lg flex items-start transition-all duration-300 ease-in-out ${bgColor}`}>
            <Icon size={35} color={response === "accepted" ? 'green' : 'red'} className="mr-4 my-auto" />
            <div className="flex-grow my-auto">
                <p className={`text-lg ${textColor}`}>
                {msg}
                </p>
            </div>
        </div>
    )
}

export default TourResponseNotification