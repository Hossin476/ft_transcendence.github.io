import SideBar from "../Components/SideBar"
import NavBar from "../Components/NavBar"
import BottomBar from "../Components/BottomBar"
import { Outlet } from "react-router"
export default function LayoutOne(){
    return (
        <>
            <div className="flex h-screen   flex-row">
                    <div className="w-28  bg-primaryColor  xsm:hidden lg:block text-white ">
                       <SideBar />
                    </div>
                    <div className="flex-auto bg-primaryColor   h-full ">
                        <div className="   text-white xsm:h-12 sm:h-28 ">
                            <NavBar/>
                        </div>
                        <div className="flex main-wrapper relative" >
                                <Outlet/>
                            <BottomBar/>
                        </div>
                    </div>
            </div>
        </>
    )    
}