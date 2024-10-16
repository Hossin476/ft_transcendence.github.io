import SideBar from "../Components/layout/SideBar"
import NavBar from "../Components/layout/NavBar"
import BottomBar from "../Components/layout/BottomBar"
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router"
export default function LayoutOne(){
    return (
        <>
            <div className="flex h-screen bg-primaryColor flex justify-center w-full  flex-row">
            <div className="w-full  h-screen flex-col flex max-w-[1700px]">
                <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {   
                        background: 'white',
                        color: '#000',
                    },
                }}
            />
                    <div className=" text-white xsm:h-12 sm:h-28 ">
                        <NavBar/>
                    </div>
                    <div className=" flex flex-1 main-wrapper  h-full ">
                        <SideBar />
                        <div className="flex flex-1" >
                                <Outlet/>
                            <BottomBar/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )    
}