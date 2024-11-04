import { AiOutlineUserAdd } from "react-icons/ai";
import Friend from "./Friend";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function FriendsBar() {
    const [friends, setFriends] = useState(null)
    let { tokens, socketMessage } = useAuth()
    useEffect(() => {
        const fetch_friends = async () => {
            const response = await fetch(`/api/notification/online/`, {
                headers: { Authorization: "JWT " + tokens.access }
            })
            const data = await response.json()
            console.log(data)
            setFriends(data)
        }
        fetch_friends()
    }, [])
    useEffect(() => {
        const data = socketMessage
        if (socketMessage) {
            const data = socketMessage
            if (data.type == "online.state" && friends) {
                const finindex = friends.users.findIndex(item => item.id == data.user.id)
                if (finindex != -1) {
                    friends.users[finindex] = data.user
                    setFriends({ users: friends.users })
                } else
                    setFriends({ users: [...friends.users, data.user] })
            }
            console.log("new friend change state : ",data)
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
            <div className="  pt-4 xsm:px-1 xl:px-4">
                <div className="h-full xsm:flex xsm:flex-col xl:block xsm:items-center overflow-y-scroll">
                    {friends && friends.users.map((item, index) => (<Friend online={item.is_online} img={item.profile_image} key={index} friendName={item.username} currentAction={ (!item.is_online ? item.last_time : (item.is_ingame ? "playing " + item.game_type : "in lobby"))}  />))}
                </div>
            </div>
        </div>
    )
}