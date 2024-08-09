import React from 'react'

function Header() {
    return (
        <div className="header_container h-1/6 flex flex-col justify-center items-center">
            <h1 className='lg:text-6xl md:text-4xl sm:text-md text-center top_title'>PING PONG</h1>
            <h3 className='text-white lg:text-2xl md:text-xl sm:text-md font-bold text-center down_title'>TOURNAMENT</h3>
        </div>
    )
}

export default Header