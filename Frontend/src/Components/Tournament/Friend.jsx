import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';

export default function Friend({ icon = false, gameName, hidden = false, PlayerName }) {
    const [WaitRequest, setwaitRequest] = useState(false)
    const notify = () => {
        toast.success("Match Request Sent to " + PlayerName, { theme: 'dark' })
        setwaitRequest(true)
        setTimeout(() => {
            setwaitRequest(false)
        }, 4000);
    }
    return (<div className="flex flex-row w-[100%] items-center">
        <img src="lshail.jpeg" className={`rounded-full md:w-[60px] md:h-[60px] object-fit border-[2px] xsm:w-[60px] xsm:[60px] sm:w-[60px] sm:h-[60px] ${icon ? 'border-green-600' : 'border-red-600'}`} />
        <div className={`ml-3 flex flex-row justify-between  items-center border-solid ${hidden ? "hidden" : ""} lg:flex w-[260px]`}>
            <div className="max-w-[calc(100%-3rem)]">
                <h3 className='font-medium text-ellipsis overflow-hidden whitespace-nowrap w-[100px]'>{PlayerName}</h3>
                <p className='text-xs opacity-70 text-ellipsis overflow-hidden whitespace-nowrap'>{icon ? "in lobby" : gameName}</p>
            </div>

            {icon && (!WaitRequest ? <button onClick={notify}><img src="/challenge.png" className="w-5 h-5" /> </button> : <l-hourglass size="40" bg-opacity="0.1" speed="1.75" color="white" ></l-hourglass>)}
        </div>
    </div>)
}