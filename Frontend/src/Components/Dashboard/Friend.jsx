import { BsChatText } from "react-icons/bs";

export default function Friend({img, friendName , currentAction, online})
{
    return (
        <div  className="flex justify-between my-2 center">
            <div className="flex xsm:gap-0 xl:gap-4 center">
                <div className=" xsm:w-6 xsm:h-6 w-8 h-8 xl:w-16 xl:h-16 rounded-full border relative ">
                    <img className="w-full rounded-full xsm:w-6 xsm:h-6 w-8 h-8 xl:w-16 xl:h-16 object-cover " src={'http://localhost:8000'+img} alt="" />
                    <span className={` w-2 h-2 xl:w-4 xl:h-4 right-0 top-0 rounded-full ${online ? "bg-green-500": "bg-red-500"} absolute`}></span>
                </div>
                <div className=" xsm:hidden xl:block self-center">
                    <p className="text-xl">{friendName}</p>
                    <p className="text-xsm font-thin">{currentAction}</p>
                </div>
            </div>
            <div className=" xsm:hidden xl:block self-center text-xl">
                <BsChatText />
            </div>
        </div>
    )
}