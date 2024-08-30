import { BsChatText } from "react-icons/bs";
import img from "/public/ykhourba.jpeg"

export default function Friend()
{
    return (
        <div  className="flex justify-between my-2 center">
            <div className="flex xsm:gap-0 xl:gap-4 center">
                <div className=" xsm:w-6 xsm:h-6 w-8 h-8 xl:w-16 xl:h-16 rounded-full border relative ">
                    <img className="w-full rounded-full " src={img} alt="" />
                    <span className=" w-2 h-2 xl:w-4 xl:h-4 right-0 top-0 rounded-full bg-green-500 absolute"></span>
                </div>
                <div className=" xsm:hidden xl:block self-center">
                    <p className="text-xl">solahfaat</p>
                    <p className="text-xsm font-thin">playing ping pong</p>
                </div>
            </div>
            <div className=" xsm:hidden xl:block self-center text-xl">
                <BsChatText />
            </div>
        </div>
    )
}