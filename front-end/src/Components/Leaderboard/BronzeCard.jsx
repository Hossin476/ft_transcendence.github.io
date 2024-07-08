import React from 'react'

function BronzeCard() {
    return (
        <div className='p-4 rounded-3xl w-full text-center pt-16 space-y-4 card_bronze'>
            <img src='/copper_badge.svg' alt='copper badge' className='mx-auto relative bottom-4 badge' />
            <h5 className='text-md relative bottom-6 font-thin text-white'>Elite</h5>
            <h3 className='text-3xl  relative bottom-6 sm-text-sm rank_copper'>Rank #3</h3>
            <img src='/copper.jpg' alt='avatar' className='avatar relative bottom-5' />
            <span className='block text-md relative bottom-5 text-white'>Pretty Guy</span>
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
            <button className='text-white  py-3 px-4 border rounded-xl button_copper text-md'>
                View Profile
            </button>
        </div>
    )
}

export default BronzeCard