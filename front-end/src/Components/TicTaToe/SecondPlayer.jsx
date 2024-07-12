import React from 'react'

function SecondPlayer() {
    return (
        <div className="second_player flex items-center   text-white rounded-md">
            <h2 className="score  flex-1 ml-5 text-sm lg:text-6xl md:text-4xl">04</h2>
            <div className="player_info mr-4">
                <h1 className="username text-lg w-full">Player 2</h1>
                <h4 className="level text-right">Level 1</h4>
            </div>
            <img src='/lshail.jpeg' alt='avatar' className='user md:w-20 lg:w-24 md:h-20 lg:h-24 m-0' />
        </div>
    )
}

export default SecondPlayer
