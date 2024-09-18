import React from 'react';

function StartModal({ currentPlayer, countdownValue }) {

    return (
        <div className='w-full h-full blurHelp absolute top-1/2 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='w-3/5 h-1/5 min-h-[550px] min-w-[350px] max-w-[600px] absolute border-3 flex flex-col items-center z-10 gap-6 border border-thirdColor rounded-md bg-secondaryColor shadow-lg transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='flex relative w-full justify-center items-center h-1/6'>
                    <h1 className='font-Plaguard text-3.5vw lg:text-2xl text-white'> Game Rules : </h1>
                </div>
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <ul className='text-white text-lg px-4 leading-relaxed h-full flex flex-col justify-start'>
                        <li className='my-3 text-center font-poppins'>
                            Each player takes turns to place their mark (X or O) on the grid.
                        </li>
                        <li className='my-3 text-center font-poppins'>
                            The game ends when a player reaches a score of 5 or the 2-minute timer reaches 0.
                        </li>
                        <li className='my-3 text-center font-poppins'>
                            The player who aligns 3 of their marks vertically, horizontally, or diagonally first wins the round and gets a point.
                        </li>
                        <li className='my-3 text-center font-poppins'>
                            If no player aligns 3 of their marks when the timer reaches 0, the game is a draw.
                        </li>
                    </ul>
                    <div className='h-[40%] flex flex-col justify-start items-center'>
                        <p className='font-Plaguard text-3.5vw lg:text-2xl'>
                            Current player : <span className={`font-Plaguard text-4vw lg:text-3xl ${currentPlayer === 'X' ? 'text-green-500' : 'text-red-500'}`}>
                                {currentPlayer}
                            </span>
                        </p>
                        <span className='my-auto font-poppins text-red-500'>
                            the game starts in: {countdownValue} seconds
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StartModal;