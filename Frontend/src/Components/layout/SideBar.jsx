// import { NavLink } from "react-router-dom"
import { RiDashboardFill } from "react-icons/ri";
import { HiChatAlt2 } from "react-icons/hi";
import { PiPingPongBold } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";

export default function SideBar()
{
    return (
        <div className="xsm:hidden lg:flex   lg:flex-col justify-between h-screen pb-8 items-center">
            <div className=" py-12 h-28">
                <h1 className="text-2xl font-normal ">PONGY</h1>
            </div>
            <div>    
                <ul className="flex flex-col gap-y-16">
                    <li>
                        <NavLink to="dashboard" className={({isActive})=>(isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block")}>
                             <RiDashboardFill className="text-4xl font-normal"/> </NavLink>    
                    </li>
                    <li  >
                        <NavLink to="chat" className={({isActive})=>(isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block")}>
                               <HiChatAlt2 className="text-4xl font-normal"/> </NavLink>    
                    </li>
                    <li  >
                        <NavLink to="game" className={({isActive})=>(isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block")}>
                             <PiPingPongBold className="text-4xl font-normal"/> </NavLink>    
                    </li>
                    <li  >
                        <NavLink to="leaderboard" className={({isActive})=>(isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block")}>
                             <FaChartSimple className="text-4xl font-normal"/> </NavLink>    
                    </li>
                    <li  >
                        <NavLink to="settings" className={({isActive})=>(isActive ? "text-thirdColor block  rounded-lg p-3 bg-linkBgColor": "p-3 block")}>
                             <FiSettings className="text-4xl font-normal"/> </NavLink>    
                    </li>
                </ul>
            </div>
            <div >
                <CiLogout className="text-4xl font-normal" />
            </div>
        </div>
    )
}