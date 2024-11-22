import { useState } from "react";
import Friend from "./Friend";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { LiaBattleNet } from "react-icons/lia";
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Challenge({ setopen, gameType }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(true)
    const [online_ingame, setChallengeData] = useState(null);
    const {tokens, socket, socketMessage, customFetch} = useAuth();
    const handleOpen = () => {
        setOpen(!open)
    }
    const fetchData = async () => {
        const response = await customFetch(`/api/notification/onlinegame/`,
            {
                headers: {Authorization: "JWT " + tokens.access}
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
                if (data.type == "online.state" && online_ingame){
                    const finindex = online_ingame.users.findIndex(item => item.id == data.user.id)
                    if (finindex != -1){
                        if (data.user.is_online == false)
                            online_ingame.users.splice(finindex, 1)
                        else
                            online_ingame.users[finindex] = data.user
                        setChallengeData({...online_ingame})
                    }else
                        setChallengeData({users: [...online_ingame.users, data.user]})
                        console.log("new friend change state : ",data)
                }
            }

    },[socketMessage])
    return (
        <div className={`bg-secondaryColor  flex-col xsm:h-[90%] lg:h-[90%] text-white lg:px-2 right-2 min-w-[60px] flex  xsm:absolute lg:relative space-y-7 xsm:${!open ? 'w-full' : 'w-[1%]'} lg:w-[35%]`}>
            <div className='flex  gap-2 justify-center items-center py-6  '>
                <FaChevronRight className={`${open? "rotate-180": "rotate-0"} lg:hidden rounded-full`} onClick={()=>setOpen((current)=> !current)}/>
                <div className={`w-[80%]  lg:flex gap-2 justify-center xsm:${open ? "hidden": 'flex'}`} >
                    <LiaBattleNet className={`font-bold text-3xl `}/>
                    <h1 className={`font-bold text-xl lg:block `}> {t("CHALLENGE")}</h1>
                </div>
            </div>
            <div className='flex  flex-col w-[100%] xsm:gap-2 lg:gap-4 h-[100%] '>
                <div className='  flex flex-col overflow-auto items-center  lg:gap-4 xsm:gap-2'>
                    {online_ingame && online_ingame.users?.map((item, index) => <Friend gameType={gameType} icon={!item.is_ingame} hidden={open} PlayerName={item.username} key={index} image={item.profile_image} gameName={item.game_type} />)}
                </div>
            </div>
        </div>
    )
}
