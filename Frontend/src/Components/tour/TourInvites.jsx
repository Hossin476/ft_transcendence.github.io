import { useAuth } from "../../context/AuthContext"


export default function TourInvites({setInvites, tourInvite}) {
    const {socket}  = useAuth()

    function handle_accept_tour(tour_id) {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: "tour_accept",
                id: tour_id
            })
            socket.send(message);
        }
        setInvites(prevInvites=> prevInvites.filter(item=>item.id != tourInvite.id))
    }

    function handle_reject_tour(tour_id) {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: "tour_reject",
                id: tour_id
            })
            socket.send(message);
        }
        setInvites(prevInvites=> prevInvites.filter(item=>item.id != tourInvite.id))
    }
    return (
        <div className="flex items-center  border-[1px] border-thirdColor my-4 pl-2 rounded-lg  w-full justify-between">
            <div>
                <h4 className="xsm:text-xs md:text-sm xl:text-lg font-poppins font-bold">{tourInvite.tournament.name}</h4>
                <p className="xsm:text-xs md:text-sm text-gray-400">{tourInvite.tournament.creator.username}</p>
            </div>
            <div className="flex">
                <button onClick={ ()=>handle_accept_tour(tourInvite.tournament.id)} className="xsm:text-xs xsm:p-1 xsm:m-1 md:p-2 md:m-2  border-[1px] text-green-500 border-green-500 rounded ">Accept</button>
                <button onClick={()=>handle_reject_tour(tourInvite.tournament.id)} className="xsm:text-xs xsm:p-1 xsm:m-1 md:p-2 md:m-2  border-[1px] text-red-500 border-red-500 rounded ">Decline</button>
            </div>
        </div>
    )
}