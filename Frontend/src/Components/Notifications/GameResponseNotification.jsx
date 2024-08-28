import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function GameResponseNotification({ username, response }) {
    const bgColor = response === "accepted" ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300';
    const textColor = response === "accepted" ? 'text-green-900' : 'text-red-900';
    const Icon = response === "accepted" ? FaCheckCircle : FaTimesCircle;

    return (
        <div className={`p-5 rounded-lg shadow-lg flex items-start transition-all duration-300 ease-in-out ${bgColor}`}>
            <Icon size={35} color={response === "accepted" ? 'green' : 'red'} className="mr-4" />
            <div className="flex-grow my-auto">
                <p className={`text-lg ${textColor}`}>
                {username} {response === "accepted" ? 'accepted' : 'rejected'} your game request.
                </p>
            </div>
        </div>
    )
}

export default GameResponseNotification;