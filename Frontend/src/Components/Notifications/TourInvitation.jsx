import React from 'react'
import { useAuth } from '../../context/AuthContext'

function TournamentInvitation({ t, data, socket, toast }) {

    function handle_accept_tour(tour_id) {
        if (socket) {
            const message = JSON.stringify({
                type: "tour_accept",
                id: tour_id
            })
            socket.send(message);
        }
    }

    function handle_reject_tour(tour_id) {
        if (socket) {
            const message = JSON.stringify({
                type: "tour_reject",
                id: tour_id
            })
            socket.send(message);
        }
    }

    return (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex`}>
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="ml-3 flex-1">
                        <p className="mt-1 text-sm text-gray-900">
                            {data.from} has invited you to a Tournament. Do you accept?
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => {
                        handle_accept_tour(data.tour_id);
                        toast.dismiss(t.id);
                    }}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-3 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Accept
                </button>
                <button
                    onClick={() => {
                        handle_reject_tour(data.tour_id);
                        toast.dismiss(t.id);
                    }}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-3 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Reject
                </button>
            </div>
        </div>
    )
}

export default TournamentInvitation