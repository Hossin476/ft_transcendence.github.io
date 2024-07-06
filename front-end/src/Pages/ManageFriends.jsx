import { FaSearch } from "react-icons/fa";
import Manage from "../Components/ManageFriends/Manage";

export default function ManageFriends() {
    return (
        <div className="text-white w-full flex items-center justify-center ">
            <div className=" w-11/12 h-5/6 xsm:p-4 sm:p-12 bg-secondaryColor rounded-lg border border-forthColor">
                <div className="flex items-center justify-between mb-8">
                    <h1 className=" sm:text-4xl font-semibold" >Friends</h1>
                    <div className="flex items-center justify-center relative">
                        <input className=" xsm:h-8 xsm:p-2  sm:h-12 sm:p-4 sm:w-72 relative rounded-lg text-gray-800 outline-none bg-gray-300"  type="text" name="" id="" placeholder="add friend here" />
                        <FaSearch className="absolute xsm:right-4 xsm:text-sx sm:right-5 sm:top-4 text-xl text-gray-500" />
                    </div>
                </div>

                <div className="w-full h-11/12 ">
                    <Manage/> 
                </div>
            </div>
        </div>
    )
}