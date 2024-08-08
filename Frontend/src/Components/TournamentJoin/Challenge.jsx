import { useState } from "react";
import Friend from "./Friend";
import { IoIosArrowUp } from "react-icons/io";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";

export default function Challenge({setopen}) {
    const [open, setOpen] = useState(true)
    const [{inLobby, inGame} , setChallengeData] = useState({inLobby: [], inGame: []})
    const handleOpen = ()=>{
        setOpen(!open)
    }
   useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('/api/challenge');
        const data = await response.json();
        setChallengeData(data);
    };
    fetchData();
}, []);
    return (
        <div className='bg-secondaryColor  flex-col xsm:h-[70%] lg:h-[80%] text-white items-center rounded-[40px] justify-evenly  right-2  flex  xsm:absolute lg:relative'>
            <h1 className='font-bold lg:text-xl xsm:text-[8px] sm:text-[10px]'> CHALLENGE</h1>
            <div className='flex  flex-col w-[93%] xsm:gap-2 lg:gap-4 h-[40%]'>
                <h2 className=' font-medium opacity-90 lg:text-xl xsm:text-[8px] sm:text-[10px]'>in lobby</h2>
                <div className='  flex flex-col overflow-auto items-center  lg:gap-4 xsm:gap-2'>
                    {inLobby.map((item, index) => <Friend icon={true} hidden={open} PlayerName={item.name} key={index} image={item.image}/>)}
                </div>
            </div>
            <div className="flex w-[90%]  items-center justify-center">
                <button className={` ${open ? 'rotate-[-90deg]' : 'rotate-[90deg]'} bg-secondaryColor   rounded-full xsm:block lg:hidden  cursor-pointer hover:opacity-70`} onClick={handleOpen}>
                    <IoIosArrowUp/>
                </button>
                <div className="w-[80%]  h-[2px] required bg-gray-400 flex" />
            </div>
            <div className='flex  flex-col w-[93%] xsm:gap-2 lg:gap-4 h-[40%]'>
                <h2 className='text-xl font-medium opacity-90 lg:text-xl xsm:text-[8px] sm:text-[10px]'>In game</h2>
                <div className=' flex flex-col overflow-auto lg:gap-4 xsm:gap-2 '>
                    {inGame.map((item, index) => <Friend key={index} gameName={item.gameName} hidden={open} PlayerName={item.name} image={item.image}/>)}
                </div>
            </div>
            <ToastContainer autoClose={5000} />
        </div>
    )
}