import React from 'react'

function SilverCard({ data }) {
    return (
        <div className='card_silver relative flex flex-col justify-between items-center rounded-3xl h-[85%] text-center pb-4'>
            <div className="flex flex-col gap-2 justify-center items-center">
            <img src='/silver_badge.svg' alt='silver badge' className='' />
            <h5 className='text-xs xsm:text-xs md:text-md lg:text-lg text-white'>Elite</h5>
            </div>
            <h3 className='text-sm md:text-md lg:text-3xl font-bold rank_silver'>Rank #2</h3>
            <div className="flex flex-col gap-2 justify-center items-center">
            <img src='/silver.jpg' alt='avatar' className='avatar rounded-full' />
            <span className='text-xs md:text-md lg:text-lg text-white'>Funny Guy</span>
            </div>
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
                    <span className='text-xs md:text-md lg:text-lg text-white'>100</span>
                </div>
            </div> 
            <button className=' button_silver text-white rounded-xl w-[60%] py-2 md:py-3 lg:py-4 text-xs md:text-md lg:text-lg'>
                View Profile
            </button>
        </div>
    )
}

export default SilverCard;
