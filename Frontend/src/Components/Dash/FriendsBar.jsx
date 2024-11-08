import { IoMdPersonAdd } from "react-icons/io";
import Friend from "./Friend";
import { useAuth } from "../../context/AuthContext";
import { useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function FriendsBar() {
    const { t } = useTranslation();
    const [online_ingame, setChallengeData] = useState(null);
    const {tokens, socketMessage} = useAuth();
    const fetchData = async () => {
        const response = await fetch(`/api/notification/online/`,
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
                        online_ingame.users[finindex] = data.user
                        setChallengeData({users: online_ingame.users})
                    }else
                        setChallengeData({users: [...online_ingame.users, data.user]})
                }
                console.log("new friend change state : ",data)
            }

    },[socketMessage])

    return (
        <div className=" xsm:w-12 lg:w-74 xl:w-80  sm:w-28 md:w-32  lg:px-4 bg-secondaryColor rounded">
            <div className="flex h-[5rem]  xsm:justify-center items-center xl:justify-between">
                <h1 className="xsm:text-xsm  xsm:hidden xl:block sm:text-xl sm:self-center">{t('Friends')}</h1>
                <Link to="/managefriends"><IoMdPersonAdd className="text-xl  sm:self-center" /></Link> 
            </div>
            <div className=" h-[calc(100%-5rem)] sm:items-center lg:items-stretch gap-y-4 flex flex-col overflow-scroll">
                {
                    online_ingame && online_ingame.users.map((item,index)=> <Friend  
                    key={index} name = {item.username}  status = {item.is_ingame} online = {item.is_online} user_id = {item.id}
                    />)
                }
            </div>
        </div>
    )
}