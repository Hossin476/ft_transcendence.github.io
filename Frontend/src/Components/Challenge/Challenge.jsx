import { useState } from "react";
import Friend from "./Friend";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Challenge({ setopen }) {
    const [open, setOpen] = useState(true)
    const [online_ingame, setChallengeData] = useState(null)
    const {tokens, socket, socketMessage} = useAuth();
    const handleOpen = () => {
        setOpen(!open)
    }
    const fetchData = async () => {
        const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/notification/onlinegame/`,
            {
                headers: {Authorization: "JWT " + tokens.access}
            }
        );
        const data = await response.json();
        setChallengeData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(()=>{ 
        if (socketMessage)
            {
                const data = socketMessage
                if (data.type == "online.state" && online_ingame){
                    if (data.online == false){
                        const index_lobby = online_ingame.inlobby.findIndex(user => user.username == data.user.username);
                        const index_game = online_ingame.ingame.findIndex(user => user.username == data.user.username);
                        setChallengeData((current)=>({inlobby: (index_lobby != -1 ? current.inlobby.slice(index_lobby,index_lobby): current.inlobby)
                            , ingame:(index_game != -1 ? current.ingame.slice(index_game,index_game) : current.ingame)}))
                        return
                    }
                    else if (data.ingame == false){
                            const index_game = online_ingame.ingame.findIndex(user => user.username == data.user.username)
                            const index_lobby = online_ingame.inlobby.findIndex(user => user.username == data.user.username)
                            setChallengeData((current) => ({ inlobby: (index_lobby != -1 ? [...current.inlobby.slice(index_lobby,index_game), data.user] : [...current.inlobby, data.user]),ingame: (index_game != -1 ? current.ingame.slice(index_game,index_game) : current.ingame ) }));
                    }else if (data.ingame == true){
                            const index_lobby = online_ingame.inlobby.findIndex(user => user.username == data.user.username)
                            const index_game = online_ingame.ingame.findIndex(user => user.username == data.user.username)
                            setChallengeData((current) => ({ ingame: (index_game != -1 ? [...current.ingame.slice(index_game,index_game), data.user]: [...current.ingame, data.user]),inlobby: (index_lobby != -1 ?current.inlobby.slice(index_lobby, index_lobby) : current.inlobby) }));
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
                {online_ingame && online_ingame.ingame.map((item, index) => <Friend icon={false} hidden={open} PlayerName={item.username} key={index} image={item.profile_image} gameName={item.game_type} />)}
                </div>
            </div>
        </div>
    )
}
