import React from 'react'
import { useLocation } from "react-router"
import { useAuth } from '../../context/AuthContext'

function GameRequest({ t, data, socketMessage, gameType, socket, toast }) {

    function handle_accept_game() {
        if (socket) {
            const message = JSON.stringify({
                type: "accept_game",
                receiver: socketMessage.from,
                game: gameType,
                invite_id: socketMessage.invite_id
            })
            socket.send(message);
        }
    }

    function handle_reject_game() {
        if (socket) {
            const message = JSON.stringify({
                type: "reject_game",
                invite_id: socketMessage.invite_id
            })
            socket.send(message);
        }
    }

    return (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex`}>
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={`http://localhost${data.from_img}`}
                            alt=""
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="mt-1 text-sm text-gray-900">
                            {data.from} has challenged you to a {data.game_type === "T" ? "TicTacToe" : "PingPong"} game. Do you accept?
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => {
                        handle_accept_game();
                        toast.dismiss(t.id);
                    }}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-3 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Accept
                </button>
                <button
                    onClick={() => {
                        handle_reject_game();
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

export default GameRequest