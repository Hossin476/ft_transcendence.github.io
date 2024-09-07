
import TourInvite from "./TourInvite"
import TourHistory from "./TourHistory"
export default function HistoryAndInvites({tours}) {
    return (
        <div className="flex-1  w-[90%] h-[100%] overflow-scroll gap-4 items-center flex xsm:flex-col lg:flex-row">
            <TourInvite />
            < TourHistory tours={tours}/>
        </div>
    )
}