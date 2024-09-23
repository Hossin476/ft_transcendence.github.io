import { AiOutlineUserAdd } from "react-icons/ai";
import Friend from "./Friend";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function FriendsBar() {
    const [friends, setFriends] = useState(null)
    let { tokens, socketMessage } = useAuth()
    useEffect(() => {
        const fetch_friends = async () => {
            const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/notification/online/`, {
                headers: { Authorization: "JWT " + tokens.access }
            })
            const data = await response.json()
            setFriends(data)
        }
        fetch_friends()
    }, [])
    useEffect(() => {
        const data = socketMessage
        if (socketMessage) {
            if (data.type == "online.state" && friends) {
                if (data.online == false) {
                    const index_online = friends.online.findIndex(user => user.username == data.user.username);
                    const index_offline = friends.offline.findIndex(user => user.username == data.user.username);
                    setFriends((current) => ({
                        online: (index_online != -1 ? current.online.slice(index_online, index_online) : current.online)
                        , offline: [...(index_offline != -1 ? current.offline.slice(index_offline, index_offline) : current.offline), data.user]
                    }))
                    return
                } else {
                    const index_online = friends.online.findIndex(user => user.username == data.user.username);
                    const index_offline = friends.offline.findIndex(user => user.username == data.user.username);
                    setFriends((current) => ({
                        online: [...(index_online != -1 ? current.online.slice(index_online, index_online) : current.online), data.user]
                        , offline: (index_offline != -1 ? current.offline.slice(index_offline, index_offline) : current.offline)
                    }))
                }
            }
            socketMessage = null
        }
    }, [socketMessage])
    return (
        <div className="bg-secondaryColor rounded-3xl  xsm:w-12 sm:w-16 xl:w-4/5   h-2/5 xl:h-full xl:p-5">
            <h3 className=" xsm:hidden xl:block text-center text-2xl">Friends</h3>
            <div className=" xsm:hidden  xl:flex xl:px-4 xl:pt-4 xl:justify-between xl:center">
                <p className="text-2xl">Online</p>
                <a className="text-xl  self-center" href=""><AiOutlineUserAdd /></a>
            </div>
            <div className=" xsm:1/5 xsm:h-1/3 sm:h-2/5 pt-4 xsm:px-1 xl:px-4">
                <div className="h-full xsm:flex xsm:flex-col xl:block xsm:items-center overflow-y-scroll">
                    {friends && friends.online.map((item, index) => (<Friend online={true} img={item.profile_image} key={index} friendName={item.username} currentAction={item.ingame ? "playing " + item.game_type : "in lobby"} />))}
                </div>
            </div>

            <hr className="w-4/5 center mx-auto my-4 xl:my-8 " />

            <div className=" xl:px-4 xsm:h-1/2 xl:h-2/5 h-1/4  xsm:px-2">
                <h3 className="xsm:hidden xl:block text-xl"> Offline</h3>
                <div className="  h-5/6 xsm:flex xsm:flex-col xl:block xsm:items-center overflow-y-scroll ">
                    {friends && friends.offline.map((item, index) => (<Friend online={false} img={item.profile_image} key={index} friendName={item.username} currentAction={item.last_time} />))}
                </div>
            </div>
        </div>
    )
}