import React from 'react'

function BronzeCard() {
    return (
        <div className='p-4 rounded-3xl my-auto text-center card_bronze'>
            <img src='/copper_badge.svg' alt='copper badge' className='mx-auto relative bottom-4 badge' />
            <h5 className='md:text-md sm:text-xs lg:text-lg relative bottom-6 font-thin text-white'>Elite</h5>
            <h3 className='md:text-md sm:text-xs lg:text-3xl  relative bottom-6 sm-text-sm rank_copper'>Rank #3</h3>
            <img src='/copper.jpg' alt='avatar' className='avatar relative bottom-5' />
            <span className='block text-md relative bottom-5 text-white'>Pretty Guy</span>
            <div className='flex justify-evenly relative bottom-4'>
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
            <button className='text-white  py-3 px-4 border rounded-xl button_copper md:text-md sm:text-xs lg:text-lg'>
                View Profile
            </button>
        </div>
    )
}

export default BronzeCard