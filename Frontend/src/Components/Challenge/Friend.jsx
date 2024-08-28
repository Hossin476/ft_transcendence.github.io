import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';

import 'ldrs/hourglass'
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router'

export default function Friend({ icon = false, gameName, hidden = false, PlayerName, image }) {
    const [WaitRequest, setwaitRequest] = useState(false)
    const [state, setState] = useState(icon)
    const { socket } = useAuth();
    const location = useLocation();
    const gameType = location.pathname.split('/')[2] === "tictactoe" ? 'T' : 'P';
    const notify = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: 'game_request',
                receiver: PlayerName,
                game: gameType
            });
            socket.send(message);
            console.log("send message :", PlayerName)
        } else {
            console.error('WebSocket is not open. Unable to send game request.');
        }
        toast.success('Game Request Was successfully sent to ' + PlayerName)
        setwaitRequest(true)
        setTimeout(() => {
            setwaitRequest(false)
        }, 4000);
    }
    return (
        <div className={`flex items-center space-x-3 ${hidden ? 'justify-center' : ''}`}>
            <img src={"http://localhost:8000" + image} className={`rounded-full w-12 h-12 object-cover border-2 ${state ? 'border-green-500' : 'border-red-500'} `} />
            <div className={`flex items-center justify-between w-full border-b ${hidden ? "hidden" : ""}`}>
                <div className="w-full">
                    <h3 className='text-sm font-medium overflow-ellipsis overflow-hidden whitespace-nowrap'>{PlayerName}</h3>
                    <p className='text-xs text-gray-400 overflow-ellipsis overflow-hidden whitespace-nowrap'>{state ? "in lobby" : 'playing ' + gameName}</p>
                </div>
                {state && (!WaitRequest ? <button onClick={notify}><img src="/png.png" className="w-5 h-5" /> </button> : <l-hourglass size="19" bg-opacity="0.1" speed="1.75" color="white" ></l-hourglass>)}
            </div>
        </div>
    )
}