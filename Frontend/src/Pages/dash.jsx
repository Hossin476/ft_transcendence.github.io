
import Statistics from "../Components/Dash/Statistics";
import Profile from "../Components/Dash/Profile";
import PlayerHistory from "../Components/Dash/PlayerHistory";
import PlayerCharts from "../Components/Dash/PlayerCharts";
import FriendsBar from "../Components/Dash/FriendsBar";

// import Match from "../Components/Dashboard/Match";



export default function Dash() {

    return (
        <div className="w-full flex justify-center xsm:pl-2 xsm:py-2 xsm:gap-2  sm:pl-4 sm:py-4 sm:gap-4 ">  
                <div className="h-[100%] flex-1     overflow-scroll  justify-center">
                    <div className="md:h-[15rem] md:flex flex-wrap p-2 justify-between w-full bg-secondaryColor rounded">
                        <Profile />
                        <Statistics />
                    </div>
                    <PlayerHistory />
                    <PlayerCharts />
                </div>
                <FriendsBar />
        </div>
    )
}