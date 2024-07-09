import React from 'react'

function SilverCard() {
    return (
        <div className='rounded-3xl my-auto flex flex-col text-center card_silver'>
            <img src='/silver_badge.svg' alt='silver badge' className='mx-auto relative  badge' />
            <h5 className='md:text-md sm:text-xs lg:text-lg relative text-white font-thin'>Elite</h5>
            <h3 className='md:text-md sm:text-xs lg:text-3xl font-bold relative rank_silver'>Rank #2</h3>
            <img src='/silver.jpg' alt='avatar' className='avatar relative ' />
            <span className='block md:text-md sm:text-xs lg:text-lg relative  text-white'>Funny Guy</span>
            <div className='flex justify-evenly relative'>
                <div>
                    <span className='block md:text-md sm:text-xs lg:text-lg state'>games</span>
                    <span className='block  md:text-md sm:text-xs lg:text-lg text-white'>4000</span>
                </div>
                <div>
                    <span className='block md:text-md sm:text-xs lg:text-lg state'>wins</span>
                    <span className='block  md:text-md sm:text-xs lg:text-lg text-white'>1000</span>
                </div>
                <div>
                    <span className='block md:text-md sm:text-xs lg:text-lg state'>loses</span>
                    <span className='block md:text-md sm:text-xs lg:text-lg text-white'>500</span>
                </div>
            </div>
            <button className='text-white p-5 my-auto rounded-xl button_silver md:text-md sm:text-xs lg:text-lg'>
                View Profile
            </button>
        </div>
    )
}

export default SilverCard




