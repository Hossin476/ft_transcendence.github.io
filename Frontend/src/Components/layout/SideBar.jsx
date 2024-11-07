// import { NavLink } from "react-router-dom"
import { RiDashboardFill } from "react-icons/ri";
import { HiChatAlt2 } from "react-icons/hi";
import { PiPingPongBold } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {useNavigate} from "react-router"

export default function SideBar()
{
    const {logout} = useAuth()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        logout()
        navigate('/login');

    }
    return (
        <div className="xsm:hidden w-24 lg:flex px-2 rounded bg-secondaryColor justify-center lg:flex-col  pb-2 my-2   items-center">

            <div className="flex-1 flex flex-col justify-center ">    
                <ul className="flex   flex-col gap-y-16">
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
            <div className ="">
                <CiLogout className="text-4xl font-normal" onClick={handleLogout}/>
            </div>
        </div>
    )
}