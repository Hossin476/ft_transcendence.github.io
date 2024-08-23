import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router'

function NotificationHandler() {
    const nav = useNavigate()

    const { socket, username } = useAuth();

    function handle_accept_game() {
        if (socket) {
            const message = JSON.stringify({
                type: "accept_game",
                receiver: "hamza",
                game: "P"
            })
            socket.send(message);
        }
    }

    function handle_reject_game() {
        if (socket) {
            const message = JSON.stringify({
                type: "reject_game",
                id: "1"
            })
            socket.send(message);
        }
    }

    function createGameUrl(gameType, gameId) {
        const gameName = gameType === "T" ? "tictactoe" : "pingpong";
        return `/game/${gameName}/pvpgame/match/${gameId}`;
    }

    if (socket) {
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data.game_type)
            if (data.type === 'game_request') {
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex`}>
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={`http://localhost:8000${data.from_img}`}
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
                ))
            } else if (data.type === 'game_accept')
                nav(createGameUrl(data.game_type, data.game_id))
        };
    }

    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                className: '',
                duration: 5000,
                style: {
                    background: 'white',
                    color: '#000',
                },
            }}
        />
    )
}

export default NotificationHandler;