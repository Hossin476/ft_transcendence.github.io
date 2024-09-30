import { useEffect, useRef } from "react";
import { BsChatText } from "react-icons/bs";
import moment from 'moment';
import Lottie from 'react-lottie';
import offlineIcon from './icons/offline.json';
import onlineIcon from './icons/online.json';
import hh from './icons/hh.json';


export default function Friend({img, friendName , currentAction, online})
{
    const ref = useRef();

    useEffect(() => {
        let settime;
        if (online === false) {
            settime = setInterval(() => {
                ref.current.innerText = "last seen " + moment(currentAction).fromNow();
            }, 60000);
        }
        return () => clearInterval(settime);
    }, [currentAction, online]);

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className="flex justify-between my-2 center">
            <div className="flex xsm:gap-0 xl:gap-4 center">
                <div className=" xsm:w-6 xsm:h-6 w-8 h-8 xl:w-16 xl:h-16 rounded-full border relative ">
                    <img className="rounded-full xsm:w-6 xsm:h-6 w-8 h-8 xl:w-16 xl:h-16 object-cover " src={'http://localhost'+img} alt="" />
                    <span className={` w-4 h-4 xl:w-6 xl:h-6 -right-2 top-0 rounded-full  absolute`}>{online ?<Lottie options={{...defaultOptions, animationData:onlineIcon}} /> : <Lottie  options={{...defaultOptions, animationData:offlineIcon}} />}</span>
                </div>
                <div className=" xsm:hidden xl:block self-center">
                    <p className="text-xl">{friendName}</p>
                    <p className="text-[10px] font-thin" ref={ref}>{(online == false ? "last seen " + moment(currentAction).fromNow(): currentAction)}</p>
                </div>
            </div>
            <div className=" xsm:hidden xl:block self-center text-xl">
                <BsChatText />
            </div>
        </div>
    )
}