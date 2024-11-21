import toast from 'react-hot-toast'
import 'ldrs/hourglass'
import {  useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Friend({ gameType, icon = false, gameName, hidden = false, PlayerName, image }) {
    const [WaitRequest, setwaitRequest] = useState(false)
    const { socket } = useAuth();

    const notify = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {

            const message = JSON.stringify({
                type: 'game_request',
                receiver: PlayerName,
                game: gameType
            });
            socket.send(message);
        } else {
            console.error('WebSocket is not open. Unable to send game request.');
        }
        toast.success('Game Request Was successfully sent to ' + PlayerName)
        setwaitRequest(true)
        setTimeout(() => {
            setwaitRequest(false)
        }, 4000);
    }

    return (<div className={`flex flex-row w-[90%] h-[80px] items-center ${hidden ? 'justify-center' : ''}  gap-2`}>
        <img src={image} className={`rounded-full w-[52px] h-[52px] object-fit border-[2px]  ${icon ? 'border-green-600' : 'border-red-600'} `} />
        <div className={` items-center justify-between border-solid lg:flex xsm:${hidden ? "hidden" : "flex"} w-[90%]`}>
            <div >
                <h3 className='font-medium text-ellipsis overflow-hidden whitespace-nowrap  text-[24px] font-inter'>{PlayerName}</h3>
                <p className='text-xs opacity-70 text-ellipsis overflow-hidden whitespace-nowrap font-inter text-[12px]'>{icon ? "in lobby" : 'playing ' + gameName}</p>
            </div>
            {icon && (!WaitRequest ? <button onClick={notify}><img src="/png.png" className="w-[30px] h-[30px]" /> </button> : <l-hourglass size="19" bg-opacity="0.1" speed="1.75" color="white" ></l-hourglass>)}
        </div>
    </div>)
}