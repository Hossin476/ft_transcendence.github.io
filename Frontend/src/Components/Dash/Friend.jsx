import { BsChatText } from "react-icons/bs";


export default function Friend() {
    return (
        <div className="flex items-center self-center md:self-auto justify-between">
            <div className="flex  items-center lg:gap-4">
                <div className=" xsm:h-[2rem] xsm:w-[2rem] sm:w-[4rem] sm:h-[4rem] relative rounded-full bg-red-500">
                    <span className="xsm:w-1 xsm:h-1 sm:w-2 sm:h-2 bg-green-500 right-1 top-2 absolute rounded-full"></span>
                </div>
                <div className="xsm:hidden lg:block">
                    <h1 className="font-semibold">Player Name</h1>
                    <p className="font-thin">status</p>
                </div>
            </div>
            <div className='xsm:hidden lg:block'>
                <BsChatText className="text-xl" />
            </div>
        </div>
    )
}