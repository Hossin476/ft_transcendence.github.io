import { IoMdPersonAdd } from "react-icons/io";
import Friend from "./Friend";


export default function FriendsBar() {
    return (
        <div className=" xsm:w-12 lg:w-74 xl:w-80  sm:w-28 md:w-32  lg:px-4 bg-secondaryColor rounded">
            <div className="flex h-[5rem] xsm:justify-center items-center lg:justify-between">
                <h1 className="xsm:text-xsm  sm:text-xl sm:self-center">Friends</h1>
                <IoMdPersonAdd className="text-xl xsm:hidden lg:block" />
            </div>
            <div className=" h-[calc(100%-5rem)] sm:items-center lg:items-stretch gap-y-4 flex flex-col overflow-scroll">
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
            </div>
        </div>
    )
}