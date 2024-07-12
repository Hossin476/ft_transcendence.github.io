import React from 'react'
import { FiCornerUpLeft } from "react-icons/fi";

function Header() {
    return (
        <div className='top_container flex mx-auto justify-center'>
            <button><FiCornerUpLeft className=' text-4xl m-4 cursor-pointer text-white'/></button> 
            <h1 className='flex-1 lg:text-4xl md:text-4xl sm:text-md font-bold text-center leader flex justify-center items-center header'>
                TIC TAC TOE
            </h1>
        </div>
    )
}

export default Header