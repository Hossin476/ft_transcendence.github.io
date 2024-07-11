import React from 'react'

function BronzeCard() {
    return (
        <div className='rounded-3xl my-auto text-center card_bronze md:h-11/12 lg:h-11/12 flex flex-col justify-center items-center'>
            <img src='/copper_badge.svg' alt='copper badge' className='mx-auto mt-auto badge ' />
            <h5 className='md:text-md sm:text-xs lg:text-lg font-thin text-white mb-6'>Elite</h5>
            <h3 className='md:text-md sm:text-xs lg:text-3xl sm-text-sm rank_bronze mb-6'>Rank #3</h3>
            <img src='/copper.jpg' alt='avatar' className='avatar mb-2' />
            <span className='block text-md text-white mb-4'>Pretty Guy</span>
            <div className='flex justify-evenly w-full items-center mt-10'>
                <div>
                    <span className='block md:text-md sm:text-xs lg:text-lg state'>games</span>
                    <span className='block  md:text-md sm:text-xs lg:text-lg text-white'>4000</span>
                </div>
                <div>
                    <span className='block md:text-md sm:text-xs lg:text-lg state'>wins</span>
                    <span className='block  md:md:text-md  sm:text-xs lg:text-lg text-white'>1000</span>
                </div>
                <div>
                    <span className='block md:text-md sm:text-xs lg:text-lg state'>loses</span>
                    <span className='block  md:text-md sm:text-xs lg:text-lg text-white'>500</span>
                </div>
            </div>
            <button className='button_bronze text-white rounded-xl sm:w-3/5 py-5 button_silver md:text-md sm:text-xs lg:text-lg mx-auto my-auto'>
                View Profile
            </button>
        </div>
    )
}

export default BronzeCard