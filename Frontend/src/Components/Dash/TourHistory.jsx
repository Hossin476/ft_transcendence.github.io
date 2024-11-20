
import { useAuth } from "../../context/AuthContext"
import imgProfle from "/public/ykhourba.jpeg"

// http://127.0.0.1:8000/api/tournament/tournaments/



export default function TourHistory({tour}) {

    const {user} = useAuth()
    const winner = tour.winner && tour.winner.id ===user.user_id ? 'win':'Lose'
    return(
        <div className={`flex ${winner ==='win' ? 'bg-[#395446]' :'bg-[#572a39]'}  justify-between items-center xsm:p-1 xsm:m-2 sm:p-2  rounded-xl`}>
            <div className="xsm:text-xs lg:text-lg flex gap-2 items-center justify-center">
                <hr  className=" xsm:h-[3rem] sm:h-[4rem] lg:ml-2 w-1 bg-gray-200 rounded-full border-none"/>
                <div className="xsm:h-8 xsm:w-8 sm:h-16 sm:w-16 bg-red-500 overflow-hidden  rounded-full">
                    <img className="w-full" src={tour.creator.profile_image} alt="" />
                </div>
                <p>{tour.creator.username}</p>
            </div>
            <div>
                <h3>{tour.name}</h3>
            </div>
            <p className={`${winner === 'win' ? 'text-[#d1c875]' : 'text-[#d75c5c]'}`}>{winner === 'win' ? 'You Win':'You Lose' }</p>
        </div>
    )
}