import FriendsBar from "../Components/Dashboard/FriendsBar"
import Acheivements from "../Components/Dashboard/Acheivements"
import ProfileInfo from "../Components/Dashboard/ProfileInfo"
import MatchHistory from "../Components/Dashboard/MatchHistory"
export default function Dashboard() {
    return (
        <div className="text-white flex    flex-1">
                <div className=" flex flex-col flex-1  lg:pb-8 md:pl-12  gap-y-4 gap-x-16 xsm:p-2 ">
                    <ProfileInfo/>
                    <div className="flex lg:flex-1  xsm:h-1/2 md:h-3/5 lg:h-2/4 gap-x-8 ">
                        <MatchHistory/>
                        <div className="bg-secondaryColor p-4 xl:block xsm:hidden overflow-hidden   lg:flex-1 xl:flex-initial xl:w-80   rounded-3xl ">
                            <h2 className="text-center font-semibold text-2xl mb-4">ACHEIVEMENTS</h2>
                            <div className=" h-5/6 w-full overflow-scroll ">
                            <Acheivements/>
                            </div>
                        </div>
                    </div>  
                </div>
                <div className="xsm:w-16 lg:w-74 xl:w-96  sm:w-28 md:w-32  xsm:items-end   py-8 flex xsm:flex-col  xsm:pr-2  xl:flex-row xl:justify-end sm:pr-4 xl:items-center  2xl:w-96 fade-in">
                    <FriendsBar />
                    <div className="xl:hidden  xsm:w-12 sm:block sm:w-16 friendsBar flex h-2/5  flex-col gap-4 items-center py-2 mt-4 overflow-y-scroll  bg-secondaryColor">
                        <Acheivements/>
                    </div>
                </div>
        </div>
    )
}