
import img from "/public/ykhourba.jpeg"
import { IoNotifications } from "react-icons/io5";
import { LiaCoinsSolid } from "react-icons/lia";
export default function NavBar() {
    return (
        <div className="  xsm:py-4  flex xsm:h-full  items-center justify-between lg:justify-end">
            <div className="lg:hidden  sm:pl-12 xsm:pl-4">
                <h1 className="xsm:text-lg text-2xl font-normal ">PONGY</h1>
            </div>
            <ul className="flex xsm:pr-4  xsm:gap-4 sm:gap-16 items-center">
                <li className="relative">
                    <IoNotifications  className=" xsm:text-xl sm:text-4xl"/>
                    <span className=" xsm:w-3 xsm:h-3 sm:w-4 sm:h-4 text-xs top-0 right-0 flex items-center justify-center p-1 font-thin bg-red-500 rounded-full absolute" >1</span>
                </li>
                <li className="flex gap-2 items-center xsm:text-xl sm:text-2xl"> 1337
                    <span>
                        <LiaCoinsSolid/>
                    </span>
                </li>
                <li className="text-2xl font-thin xsm:hidden lg:block" >YKHOURBA</li>
                <li className=" xsm:w-8 xsm:h-8 sm:w-16 sm:h-16 border-2 rounded-full"><img className="w-full rounded-full" src={img} alt="" /></li>
            </ul>
        </div>
    )
}