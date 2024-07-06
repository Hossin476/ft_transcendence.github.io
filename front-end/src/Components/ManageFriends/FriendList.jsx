
import { LuSwords } from "react-icons/lu";
import { BsChatText } from "react-icons/bs";

export default function Friendlist() {
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
            <div className="flex  xsm:gap-2 sm:gap-x-4 items-center xsm:text-lg sm:text-4xl">
                <LuSwords />
                <BsChatText />
            </div>
        </div>
    )
}