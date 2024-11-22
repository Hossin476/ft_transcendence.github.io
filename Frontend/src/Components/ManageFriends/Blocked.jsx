import { CgUnblock } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Blocked({ friends, setFriends }) {
    const { socket } = useAuth();
    const { t } = useTranslation();

    function handle_unblock_request() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                "type": "unblock_request",
                "receiver": friends.blocked_user
            })
            socket.send(message)
            setFriends(prevFriends => prevFriends.filter(friend => friend.blocked_user !== friends.blocked_user));
        }
    }

    return (
        <div className=" w-full border-b-2 border-gray-500  xsm:h-20 sm:h-32 flex items-center xsm:px-2 sm:px-8 justify-between">
            <div className="flex items-center gap-x-4">
                <div className="xsm:w-12 xsm:h-12  md:h-20 md:w-20 bg-indigo-500 rounded-full">
                    <img className="rounded-full" src={friends.profile_image} alt="profile image" />
                </div>
                <div>
                    <h3 className="md:text-lg font-semibold">{friends.blocked_user}</h3>
                    <p className="xsm:text-xs md:text-sm">{t("Level")} {friends.rank}</p>
                </div>
            </div>
            <div className="flex  xsm:gap-2 sm:gap-x-4 items-center xsm:text-lg sm:text-4xl">
                <button className="flex items-center gap-x-2 border border-blue-500 p-1 text-red-500 rounded-lg text-sm" onClick={handle_unblock_request}>
                    <CgUnblock className="text-blue-500" />
                    <span className="xsm:hidden text-blue-500 sm:block">{t("Unblock")}</span>
                </button>
            </div>
        </div>
    )
}