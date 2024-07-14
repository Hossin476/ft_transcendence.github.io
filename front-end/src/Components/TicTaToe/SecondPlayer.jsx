import React from 'react'

function SecondPlayer() {
    return (
        <div className="flex items-center second_player  text-white rounded-md flex-grow">
            <h2 className="font-Plaguard xsm:text-[2vw] lg:text-4xl" >04</h2>
            <div className="flex-1 xsm:mr-1 lg:mr-4 ">
                <h1 className="font-inter  xsm:text-[2vw] lg:text-lg text-right">Player 2</h1>
                <h4 className="font-inter text-right  xsm:text-[1vw] lg:text-[0.7rem]">Level 1</h4>
            </div>
            <img src='lshail.jpeg' alt='avatar' className='xsm:w-[10vw] lg:w-24 xsm:h-[10vw] lg:h-24 object-cover rounded-[50%]' />
        </div>
    )
}

export default SecondPlayer
