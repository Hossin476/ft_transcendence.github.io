import React from 'react'
import { FiCornerUpLeft } from "react-icons/fi";

function Header() {
    return (
        <div className='top_container grid grid-cols-2 justify-center'>
            <button><FiCornerUpLeft className='text-4xl cursor-pointer text-white'/></button> 
            <h1 className='lg:text-4xl md:text-4xl sm:text-md text-center header'>
                TIC TAC TOE
            </h1>
        </div>
    )
}

export default Header