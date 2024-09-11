import React from 'react'
import { TbTournament } from "react-icons/tb";


function TourResponseNotification({ t, data }) {
    const msg = data.message;
    const response = data.response;

    const bgColor = response === "accepted" ? 'bg-green-200' : 'bg-red-200';
    const textColor = response === "accepted" ? 'text-green-900' : 'text-red-900';
    const Icon = TbTournament;

    return (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white p-4 shadow-lg rounded-lg pointer-events-auto flex ${bgColor}` }>
            <Icon size={25} color={response === "accepted" ? 'green' : 'red'} className="mr-4 my-auto" />
            <div className="flex-grow my-auto">
                <p className={`text-lg ${textColor}`}>
                    {msg}
                </p>
            </div>
        </div>
    )
}

export default TourResponseNotification