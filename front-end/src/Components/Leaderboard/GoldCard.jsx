import React from 'react'

function GoldCard() {
    return (
        <div className='px-auto rounded-3xl md:h-full lg:h-full my-auto text-center card_gold'>
            <img src='/gold_badge.svg' alt='gold badge' className='mx-auto badge' />
            <h5 className='md:text-md sm:text-xs lg:text-lg  text-white'>Elite</h5>
            <h3 className='md:text-md sm:text-xs lg:text-3xl rank_gold'>Rank #1</h3>
            <img src='/gold.png' alt='avatar' className='avatar' />
            <span className='block md:text-md sm:text-xs lg:text-lg text-white'>charles leclerc</span>
            <div className='flex justify-evenly'>
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
            <button className='text-white rounded-xl button_gold md:text-md sm:text-xs lg:text-lg'>
                View Profile
            </button>
        </div>
    )
}

export default GoldCard