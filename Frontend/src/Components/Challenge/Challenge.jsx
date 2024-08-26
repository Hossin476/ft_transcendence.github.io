import { useState } from "react";
import Friend from "./Friend";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ChallengeData } from "../data/challangeData";
import { useAuth } from "../../context/AuthContext";

export default function Challenge({ setopen }) {
    const [open, setOpen] = useState(true)
    const [online_ingame, setChallengeData] = useState(null)
    const {tokens, socket, socketMessage} = useAuth();
    const handleOpen = () => {
        setOpen(!open)
    }
    const fetchData = async () => {
        const response = await fetch('http://localhost:8000/notification/online/',
            {
                headers: {
                    Authorization: "JWT " + tokens.access
                }
            }
        );
        const data = await response.json();
        console.log(data)
        setChallengeData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(()=>{
        if (socketMessage)
            {
                const data = socketMessage
                console.log(data)
                if (data.type == "online.state" && online_ingame){
                    if (data.online == false){
                        const index1 = online_ingame.inlobby.findIndex(user => user.username == data.user.username);
                        const index2 = online_ingame.ingame.findIndex(user => user.username == data.user.username);
                        if (index1 != -1)
                            setChallengeData((current)=>({inlobby: current.inlobby.slice(index1), ingame: current.ingame}))
                        else if (index2 != -1)
                            setChallengeData((current)=>({inlobby: current.inlobby, ingame: current.ingame.slice(index2)}))
                        return
                    }
                    else if (data.ingame == false){
                            const index = online_ingame.ingame.findIndex(user => user.username == data.user.username)
                            if (online_ingame.inlobby.findIndex(user => user.username == data.user.username) != -1)
                                return
                            if (index != -1)
                                setChallengeData((current) => ({ inlobby: [...current.inlobby, online_ingame.ingame[index]], ingame: current.ingame.slice(index) }));
                            else
                                setChallengeData((current) => ({ inlobby: [...current.inlobby, data.user], ingame: current.ingame }));
                    }else if (data.ingame == true){
                            const index = online_ingame.inlobby.findIndex(user => user.username == data.user.username)
                            if (index != -1)
                                setChallengeData((current) => ({ ingame: [...current.ingame, online_ingame.inlobby[index]], inlobby: current.inlobby.slice(index) }));
                            else
                                setChallengeData((current) => ({ ingame: [...current.ingame, data.user], inlobby: current.lobby }));
                    }
                }
            }

    },[socketMessage])
    return (
        <div className='bg-secondaryColor  flex-col xsm:h-[70%] lg:h-[80%] text-white items-center rounded-[40px] justify-evenly  right-2  flex  xsm:absolute lg:relative'>

            <h1 className='font-bold lg:text-xl xsm:text-[8px] sm:text-[10px]'> CHALLENGE</h1>
            <div className='flex  flex-col w-[93%] xsm:gap-2 lg:gap-4 h-[40%]'>
                <h2 className=' font-medium opacity-90 lg:text-xl xsm:text-[8px] sm:text-[10px]'>in lobby</h2>
                <div className='  flex flex-col overflow-auto items-center  lg:gap-4 xsm:gap-2'>
                    {online_ingame && online_ingame.inlobby.map((item, index) => <Friend icon={true} hidden={open} PlayerName={item.username} key={index} image={item.profile_image} />)}
                </div>
            </div>
            <div className="flex w-[90%]  items-center justify-center">
                <button className={` ${open ? 'rotate-[-90deg]' : 'rotate-[90deg]'} bg-secondaryColor   rounded-full xsm:block lg:hidden  cursor-pointer hover:opacity-70`} onClick={handleOpen}>
                    <IoIosArrowUp/>
                </button>
                <div className="w-[80%]  h-[2px] required bg-gray-400 flex" />
            </div>
            <div className='flex  flex-col w-[93%] xsm:gap-2 lg:gap-4 h-[40%]'>
                <h2 className='text-xl font-medium opacity-90 lg:text-xl xsm:text-[8px] sm:text-[10px]'>In game</h2>
                <div className=' flex flex-col overflow-auto lg:gap-4 xsm:gap-2 '>
                {online_ingame && online_ingame.ingame.map((item, index) => <Friend icon={false} hidden={open} PlayerName={item.username} key={index} image={item.profile_image} />)}
                </div>
            </div>






        </div>
    )
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             