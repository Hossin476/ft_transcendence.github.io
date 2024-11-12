
import img from "/public/ykhourba.jpeg"
import { IoNotifications } from "react-icons/io5";
import { LiaCoinsSolid } from "react-icons/lia";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from 'react';
import NotificationModal from '../Notifications/NotificationModal';
import NotificationHandler from "../Notifications/NotificationHandler";
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from "../../Components/Settings/LanguageSwitcher";

export default function NavBar() {

    const { socket, global_socket, socketMessage, createSocket,user, username } = useAuth()
    const [showNotifications, setShowNotifications] = useState(false);
    const nav = useNavigate();

    console.log("hello this is me :",username)

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };
    useEffect(() => {
        if (socketMessage) {
            if (socketMessage.type == 'game.accept') {
                const gameType = socketMessage.game_type === "T" ? "tictactoe" : "pingpong";
                nav(`/game/${gameType}/pvpgame/match`, { state: { gameid: socketMessage.game_id, isonline: true } });
            } else if (socketMessage.type == 'game.offline') {
                const gameType = socketMessage.game_type === "T" ? "tictactoe" : "pingpong"
                nav(`/game/${gameType}/pvpgame/match`, { state: { gameid: socketMessage.game_id, isonline: false } });
            }
        }
    }, [socketMessage])

    useEffect(() => {
        global_socket();
        createSocket();
        return () => {
            if (socket)
                socket.close()
        };
    }, []);
    console.log("user navbar ", user)
    return (
        <div className="xsm:py-4 flex bg-secondaryColor rounded xsm:h-full items-center justify-between justify-end relative">
            <div className=" xsm:pl-4">
                <h1 className="xsm:text-lg text-2xl font-semibold">PONGY</h1>
            </div>
            <ul className="flex xsm:pr-4 xsm:gap-4 sm:gap-10 items-center">
                <LanguageSwitcher />
                <li>
                    <IoNotifications
                        className="xsm:text-xl sm:text-4xl cursor-pointer"
                        onClick={toggleNotifications}
                    />
                    {showNotifications && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 z-[70]">
                            <NotificationModal />
                        </div>
                    )}
                </li>
                {/* <li className="flex gap-2 items-center xsm:text-xl sm:text-2xl">1337
                    <span>
                        <LiaCoinsSolid />
                    </span>
                </li> */}
                <li className="text-2xl font-thin xsm:hidden lg:block">{username}</li>
                <li onClick={() => nav(`/profile/${user.id}`)} className="xsm:w-8 xsm:h-8 sm:w-16 sm:h-16 border-2 rounded-full">
                    <img className="w-full rounded-full" src={user.profile_image} alt="Profile" />
                </li>
            </ul>
            <NotificationHandler />
        </div>
    )
}