import React from 'react'

function BronzeCard() {
    return (
        <div className='rounded-3xl my-auto text-center card_bronze md:h-5/6 lg:h-5/6 flex flex-col justify-center items-center'>
            <img src='/copper_badge.svg' alt='copper badge' className='mx-auto badge my-auto ' />
            <h5 className='md:text-md sm:text-xs lg:text-lg font-thin text-white'>Elite</h5>
            <h3 className='md:text-md sm:text-xs lg:text-3xl sm-text-sm rank_copper'>Rank #3</h3>
            <img src='/copper.jpg' alt='avatar' className='avatar' />
            <span className='block text-md text-white'>Pretty Guy</span>
            <div className='flex justify-evenly'>
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
            <button className='text-white rounded-xl button_copper md:text-md sm:text-xs lg:text-lg my-auto'>
                View Profile
            </button>
        </div>
    )
}

export default BronzeCard