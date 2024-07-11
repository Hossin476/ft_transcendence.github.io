import React from 'react'

function GoldCard() {
    return (
        <div className='flex flex-col justify-center items-center rounded-3xl md:h-full lg:h-full my-auto text-center card_gold'>
            <img src='/gold_badge.svg' alt='gold badge' className='mx-auto mt-auto badge' />
            <h5 className='md:text-md sm:text-xs lg:text-lg  text-white mb-6'>Elite</h5>
            <h3 className='md:text-md sm:text-xs lg:text-3xl rank_gold mb-6'>Rank #1</h3>
            <img src='/gold.png' alt='avatar' className='avatar mb-2' />
            <span className='block md:text-md sm:text-xs lg:text-lg text-white mb-4'>charles leclerc</span>
            <div className='flex justify-evenly w-full items-center mt-10'>
                <div>
                    <span className='block md:text-md sm:text-xs lg:text-lg state'>games</span>
                    <span className='block md:text-md sm:text-xs lg:text-lg text-white'>5000</span>
                </div>
                <div>
                    <span className='block md:text-md sm:text-xs lg:text-lg state'>wins</span>
                    <span className='block md:text-md sm:text-xs lg:text-lg text-white'>1000</span>
                </div>
                <div>
                    <span className='block md:text-md sm:text-xs lg:text-lg state'>loses</span>
                    <span className='block md:text-md sm:text-xs lg:text-lg text-white'>500</span>
                </div>
            </div>
            <button className='text-white rounded-xl sm:w-3/5 py-5 button_gold md:text-md sm:text-xs lg:text-lg mx-auto my-auto'>
                View Profile
            </button>
        </div>
    )
}

export default GoldCard