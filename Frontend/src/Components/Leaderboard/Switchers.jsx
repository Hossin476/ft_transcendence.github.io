import React from 'react'

function Switchers({setActiveGame, activeGame}) {
    return (
        <div className='flex justify-evenly items-center w-full pb-10 pt-6'>
            <button
                onClick={() => setActiveGame('Tic Tac Toe')}
                className={`game-button font-poppins text-xl border border-forthColor p-2 rounded-md transition-colors duration-300 ${activeGame === 'Tic Tac Toe' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
            >
                Tic Tac Toe
            </button>
            <button
                onClick={() => setActiveGame('Ping Pong')}
                className={`game-button font-poppins text-xl border border-forthColor p-2 rounded-md transition-colors duration-300 ${activeGame === 'Ping Pong' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
            >
                Ping Pong
            </button>
        </div>
    )
}

export default Switchers