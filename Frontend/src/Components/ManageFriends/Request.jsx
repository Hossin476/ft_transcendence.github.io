import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";

export default function Request() {
    const {friendReceiver, socket} = useAuth();

    function accept_friendship() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                "type": "friend_accept",
                "receiver": friendReceiver
            })
            socket.send(message);
        }
    }

    function reject_friendship() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                "type": "friend_reject",
                "receiver": friendReceiver
            })
            socket.send(message);
        }
    }

    return (
        <div className=" w-full border-b-2 border-gray-500  xsm:h-20 sm:h-32 flex items-center xsm:px-2 sm:px-8 justify-between">
            <div className="flex items-center gap-x-4">
                <div className="xsm:w-12 xsm:h-12  md:h-20 md:w-20 bg-indigo-500 rounded-full">
                    <img src="" alt="" />
                </div>
                <div>
                    <h3 className="  md:text-lg font-semibold">khalido</h3>
                    <p className="xsm:text-xs md:text-sm">level 3</p>
                </div>
            </div>
            <div className="flex  xsm:gap-2 sm:gap-x-4 items-center">
                <button className="flex items-center gap-x-2 border border-green-500 p-1 text-green-500 rounded-lg text-sm"> <FaCheck className="xsm:text-xs sm:text-sm" />
                    <span className="xsm:hidden sm:block" onClick={ accept_friendship }> accept</span>
                </button>
                <button className="flex items-center gap-x-2 border border-red-500 p-1 text-red-500 rounded-lg text-sm">
                    <GiCancel />
                    <span className="xsm:hidden sm:block" onClick={reject_friendship}> reject</span>
                </button>
            </div>
        </div>
    )
}