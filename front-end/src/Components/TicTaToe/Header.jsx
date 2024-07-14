import React from 'react'
import { FiCornerUpLeft } from "react-icons/fi";
import { PiArrowUUpLeftBold } from 'react-icons/pi';

function Header() {
    return (
        <div className='flex justify-center w-[80%] items-center'>
            <button className='border-white border-2 bg-secondaryColor'><PiArrowUUpLeftBold style={{  color: 'white' }} /></button> 
            <h1 className='flex-1 text-center leader'>
                TIC TAC TOE
            </h1>
        </div>
    )
}

export default Header