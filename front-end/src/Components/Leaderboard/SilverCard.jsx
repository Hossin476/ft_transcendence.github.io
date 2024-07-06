import React from 'react'

function SilverCard() {
    return (
        <div className='p-4 pt-16 space-y-4 max-h-fit rounded-3xl sm:w-1/3 w-full lg:w-1/4 text-center   card_silver'>
            <img src='/silver_badge.svg' alt='silver badge' className='mx-auto relative bottom-4 badge' />
            <h5 className='text-sm relative bottom-6 text-white font-thin'>Elite</h5>
            <h3 className='text-2xl font-bold relative bottom-6 rank_silver'>Rank #2</h3>
            <img src='/silver.jpg' alt='avatar' className='avatar relative bottom-5' />
            <span className='block text-sm relative bottom-5 text-white'>Funny Guy</span>
            <div className='flex justify-evenly relative bottom-4'>
                <div>
                    <span className='block text-md state'>games</span>
                    <span className='block  text-md text-white'>4000</span>
                </div>
                <div>
                    <span className='block text-md state'>wins</span>
                    <span className='block  text-md text-white'>1000</span>
                </div>
                <div>
                    <span className='block text-md state'>loses</span>
                    <span className='block  text-md text-white'>500</span>
                </div>
            </div>
            <button className='text-white  py-3 px-4 border rounded-xl button_silver text-md'>
                View Profile
            </button>
        </div>
    )
}

export default SilverCard




