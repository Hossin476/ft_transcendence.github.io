import CreateTournament from "../Components/tour/CreateTournament";
import HistoryAndInvites from "../Components/tour/HistoryAndInvites";
import Header from "../Components/tour/Header";

export default function Chat() {
    return(
        <div className="flex-1 h-[90%] flex items-center   justify-center">
            <div className="h-[90%] w-[90%] flex flex-col rounded-lg border-[2px] border-thirdColor bg-secondaryColor  items-center py-20">
                <Header />
                <CreateTournament />
                <HistoryAndInvites />
            </div>
        </div>
    )
}