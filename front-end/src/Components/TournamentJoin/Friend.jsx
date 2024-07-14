import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'ldrs/hourglass'
import { useState } from 'react';

export default function Friend({ icon = false, gameName, hidden = false,PlayerName }) {
    const  [WaitRequest, setwaitRequest] = useState(false)
    const notify = () => {
    toast.success("Match Request Sent to "+ PlayerName, { theme: 'dark' })
    setwaitRequest(true)
    setTimeout(() => {
        setwaitRequest(false)
    }, 4000);
}
    return (<div className={`flex flex-row w-[100%] items-center ${hidden ? 'justify-center':''}`}>
        <img src="hyounsi.png" className={`rounded-full lg:w-[52px] lg:h-[52px] object-fit border-[2px] xsm:w-[30px] xsm:h-[30px] ${icon ? 'border-green-600' : 'border-red-600'} `} />
        <div className={`ml-3 flex flex-row justify-between  items-center border-solid ${hidden ? "hidden" : ""} lg:flex xsm:w-[160px] lg:w-[260px]`}>
            <div className="max-w-[calc(100%-3rem)]">
                <h3 className='font-medium text-ellipsis overflow-hidden whitespace-nowrap xsm:text-[10px] lg:text-[15px] xsm:w-[50px] lg:w-[100px] font-inter'>{PlayerName}</h3>
                <p className='text-xs opacity-70 text-ellipsis overflow-hidden whitespace-nowrap font-inter xsm:text-[6px]  lg:text-[10px]'>{icon ? "in lobby" : gameName}</p>
            </div>
            {icon && (!WaitRequest ? <button onClick={notify}><img src="./png.png" className="w-[19px] h-[19px]" /> </button>: <l-hourglass  size="19"bg-opacity="0.1" speed="1.75" color="white" ></l-hourglass>)}
        </div>
    </div>)
}