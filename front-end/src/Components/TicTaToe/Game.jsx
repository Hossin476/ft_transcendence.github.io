import React from 'react'

function Game({ renderCell }) {
    return (
        <div className="bottom_layer md:grid lg:grid h-5/6 justify-center items-center px-10 w-full" >
            <div className='sm:hidden xsm:hidden md:block lg:block'>
                <img src="/x_sign.png" alt="x_sign" className='border rounded-2xl p-6 mx-auto' />
            </div>
            <div className="game_board grid justify-center  border-white border-4 w-full h-[80%]">
                {renderCell(0, 'text-white border-t-0  border-l-0 right-border bottom-border')}
                {renderCell(1, 'cell text-white border-t-0 right-border bottom-border')}
                {renderCell(2, 'cell text-white border-t-0 border-r-0 bottom-border')}
                {renderCell(3, 'cell text-white border-l-0 right-border bottom-border')}
                {renderCell(4, 'cell text-white right-border bottom-border')}
                {renderCell(5, 'cell text-white border-r-0 bottom-border')}
                {renderCell(6, 'cell text-white border-b-0 border-l-0 right-border')}
                {renderCell(7, 'cell text-white border-b-0 right-border')}
                {renderCell(8, 'cell text-white border-b-0 border-r-0')}
            </div>
            <div className="sm:hidden xsm:hidden md:block lg:block">
            <img src="/o_sign.png" alt="x_sign" className='border rounded-2xl p-6  mx-auto' />
            </div>
        </div>
    )
}

export default Game