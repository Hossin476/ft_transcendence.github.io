import { AiOutlineUserAdd } from "react-icons/ai";
import Friend from "./Friend";
export default function FriendsBar() {
    return (
        <div className="bg-secondaryColor rounded-3xl  xsm:w-12 sm:w-16 xl:w-4/5   h-2/5 xl:h-full xl:p-5">
            <h3 className=" xsm:hidden xl:block text-center text-2xl">Friends</h3>
                <div className=" xsm:hidden  xl:flex xl:px-4 xl:pt-4 xl:justify-between xl:center">
                    <p className="text-2xl">Online</p>
                    <a  className="text-xl  self-center" href=""><AiOutlineUserAdd /></a>
                </div>
            <div className=" xsm:1/5 xsm:h-1/3 sm:h-2/5 pt-4 xsm:px-1 xl:px-4">
                <div className="h-full xsm:flex xsm:flex-col xl:block xsm:items-center overflow-y-scroll">
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                </div>
            </div>

            <hr className="w-4/5 center mx-auto my-4 xl:my-8 " />

            <div className=" xl:px-4 xsm:h-1/2 xl:h-2/5 h-1/4  xsm:px-2">
                <h3 className="xsm:hidden xl:block text-xl"> Offline</h3>
                <div className="  h-5/6 xsm:flex xsm:flex-col xl:block xsm:items-center overflow-y-scroll ">
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                </div>
            </div>
        </div>
    )
}