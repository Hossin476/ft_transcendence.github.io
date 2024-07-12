import React from 'react'

function FirstPlayer() {
    return (
        <div className="first_player flex items-center text-white rounded-md">
            <img src='/lshail.jpeg' alt='avatar' className='user md:w-20 lg:w-24 md:h-20 lg:h-24' />
            <div className="player_info flex-1 ml-4">
                <h1 className="username text-lg ">Player 1</h1>
                <h4 className="level ">Level 2</h4>
            </div>
            <h2 className="score mr-5 text-sm lg:text-6xl md:text-4xl">05</h2>
        </div>
    )
}

export default FirstPlayer
