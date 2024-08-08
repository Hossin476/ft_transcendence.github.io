import { useState } from "react";
import Friend from "./Friend";
import { IoIosArrowUp } from "react-icons/io";
// import { ChallengeData } from "../../challengeData";
import { ToastContainer } from 'react-toastify';

export default function Challenge({ setopen }) {
    const [open, setOpen] = useState(true)
    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        <div className='bg-secondaryColor  flex-col xsm:h-[80%] lg:h-[97%] text-white items-center rounded-[40px] justify-evenly  right-2  flex  xsm:absolute lg:relative'>
            <h1 className='font-bold lg:text-xl xsm:text-[8px] sm:text-[10px]'> CHALLENGE</h1>
            <div className='flex  flex-col w-[93%] gap-5 h-[40%]'>
                <h2 className=' font-medium opacity-90 lg:text-xl xsm:text-[8px] sm:text-[10px]'>in lobby</h2>
                <div className='  flex flex-col overflow-auto gap-5'>
                    {ChallengeData.inlobby.map((item, index) => <Friend icon={true} hidden={open} PlayerName={item.name} />)}
                </div>
            </div>
            <div className="w-[80%]  h-[2px] required bg-gray-400 flex" />
            <button className={`absolute left-[-20px] top-[50%] ${open ? 'rotate-[-90deg]' : 'rotate-[90deg]'} bg-secondaryColor p-3  rounded-full sm:block lg:hidden 2xl:hidden cursor-pointer  `} onClick={handleOpen}>
                <IoIosArrowUp />
            </button>
            <div className='flex  flex-col w-[93%] gap-5 h-[40%]'>
                <h2 className='text-xl font-medium opacity-90 lg:text-xl xsm:text-[8px] sm:text-[10px]'>In game</h2>
                <div className=' flex flex-col overflow-auto gap-5 '>
                    {ChallengeData.ingame.map((item, index) => <Friend gameName={item.gameName} hidden={open} PlayerName={item.name} />)}
                </div>
            </div>
            <ToastContainer autoClose={5000} />
        </div>
    )
}