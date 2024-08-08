import React from 'react'

function GoldCard() {
    return (
        <div className='rounded-3xl relative flex flex-col items-center justify-evenly h-[95%] text-center card_gold pb-4'>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <img src='/gold_badge.svg' alt='gold badge' className='' />
                <h5 className='md:text-md sm:text-xs lg:text-lg text-sm  text-white'>Elite</h5>
            </div>
            <h3 className='md:text-md sm:text-xs text-sm lg:text-3xl rank_gold'>Rank #1</h3>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <img src='/gold.png' alt='avatar' className='avatar' />
                <span className='block md:text-md sm:text-xs lg:text-lg text-white'>charles leclerc</span>
            </div>
            <div className='flex justify-evenly w-full items-center'>
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
            <button className='text-white rounded-xl w-3/5 py-2 md:py-3 lg:py-4 text-xs md:text-md lg:text-lg button_gold'>
                View Profile
            </button>
        </div>
    )
}

export default GoldCard