import { RiDashboardFill } from "react-icons/ri";
import { HiChatAlt2 } from "react-icons/hi";
import { PiPingPongBold } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";
export default function BottomBar()
{
    return (
    <ul className=" xsm:text-lg w-screen   lg:hidden flex sm:text-2xl flex-row justify-center xsm:gap-2 sm:gap-6  xsm:py-4 sm:py-4 h-16 absolute bottom-0 text-white ">
        <li>
            <NavLink to="/example1"  className={({isActive})=>isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block"}
            > <RiDashboardFill className=" font-normal"/> </NavLink>
        </li>
        <li>
            <NavLink to="" className={({isActive})=>isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block"}
            >   <HiChatAlt2 className=" font-normal"/> </NavLink>    
        </li>
        <li>
            <NavLink to="" className={({isActive})=>isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block"}
            > <PiPingPongBold className=" font-normal"/> </NavLink>    
        </li>
        <li>
            <NavLink to="" className={({isActive})=>isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block"}
            > <FaChartSimple className=" font-normal"/> </NavLink>    
        </li>
        <li>
            <NavLink to="" className={({isActive})=>isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block"}
            > <FiSettings className=" font-normal"/> </NavLink>    
        </li>
    </ul>
    )
}