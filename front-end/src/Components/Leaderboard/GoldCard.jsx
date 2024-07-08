import React from 'react'

function GoldCard() {
    return (
        <div className='rounded-3xl w-full text-center card_gold'>
            <img src='/gold_badge.svg' alt='gold badge' className='mx-auto relative bottom-6 badge' />
            <h5 className='text-md relative bottom-8 text-white'>Elite</h5>
            <h3 className='text-3xl relative bottom-8 rank_gold'>Rank #1</h3>
            <img src='/gold.png' alt='avatar' className='avatar relative bottom-7' />
            <span className='block text-md relative bottom-5 text-white'>charles leclerc</span>
            <div className='flex justify-evenly relative bottom-4'>
                <div>
                    <span className='block text-md state'>games</span>
                    <span className='block text-md text-white'>5000</span>
                </div>
                <div>
                    <span className='block text-md state'>wins</span>
                    <span className='block text-md text-white'>1000</span>
                </div>
                <div>
                    <span className='block text-md state'>loses</span>
                    <span className='block text-md text-white'>500</span>
                </div>
            </div>
            <button className='text-white relative bottom- py-3 px-4 border rounded-xl button_gold text-md'>
                View Profile
            </button>
        </div>
    )
}

export default GoldCard