import React from 'react'

function GoldCard() {
    return (
        <div className='rounded-3xl relative my-auto text-center card_gold'>
            <img src='/gold_badge.svg' alt='gold badge' className='mx-auto relative bottom-6 badge' />
            <h5 className='md:text-md sm:text-xs lg:text-lg relative bottom-8 text-white'>Elite</h5>
            <h3 className='md:text-md sm:text-xs lg:text-3xl relative bottom-8 rank_gold'>Rank #1</h3>
            <img src='/gold.png' alt='avatar' className='avatar relative bottom-7' />
            <span className='block md:text-md sm:text-xs lg:text-lg relative bottom-5 text-white'>charles leclerc</span>
            <div className='flex justify-evenly relative bottom-4'>
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
            <button className='text-white relative bottom- py-3 px-4 border rounded-xl button_gold md:text-md sm:text-xs lg:text-lg'>
                View Profile
            </button>
        </div>
    )
}

export default GoldCard