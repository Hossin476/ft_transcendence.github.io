import React from 'react'

function BronzeCard() {
    return (
        <div className='card_bronze rounded-3xl relative flex flex-col justify-between items-center h-[85%] text-center p-4'>
            <img src='/copper_badge.svg' alt='copper badge' className=' badge mx-auto w-[60%] h-[20%]' />
            <h5 className='text-xs md:text-md lg:text-lg font-thin text-white'>Elite</h5>
            <h3 className='text-sm md:text-md lg:text-3xl rank_bronze'>Rank #3</h3>
            <img src='/copper.jpg' alt='avatar' className='avatar rounded-full' />
            <span className='text-sm md:text-md lg:text-lg text-white'>Pretty Guy</span>
            <div className='grid grid-cols-3 gap-4 w-full'>
                <div className='flex flex-col items-center'>
                    <span className='text-xs md:text-md lg:text-lg state'>games</span>
                    <span className='text-xs md:text-md lg:text-lg text-white'>4000</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-xs md:text-md lg:text-lg state'>wins</span>
                    <span className='text-xs md:text-md lg:text-lg text-white'>1000</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-xs md:text-md lg:text-lg state'>loses</span>
                    <span className='text-xs md:text-md lg:text-lg text-white'>500</span>
                </div>
            </div>
            <button className='button_bronze text-white rounded-xl w-3/5 py-2 md:py-3 lg:py-4 text-xs md:text-md lg:text-lg'>
                View Profile
            </button>
        </div>
    )
}

export default BronzeCard
