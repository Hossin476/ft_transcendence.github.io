import React from 'react'

function SilverCard({ data }) {


    // const [items, setItems] = React.useState([]);

    // React.useEffect(() => {
    //     setItems(data);
    // }, []);

    // {
    //     items.map((item, index) => (
    //         <div key={index}>
    //             <h1>{item.name}</h1>
    //         </div>
    //     ))
    // }
    return (
        <div className='rounded-3xl text-center card_silver flex flex-col justify-center items-center my-auto md:h-5/6 lg:h-5/6 relative'>
            <img src='/silver_badge.svg' alt='silver badge' className='mx-auto mt-auto badge' />
            <h5 className='md:text-md sm:text-xs lg:text-lg relative text-white font-thin mb-6'>Elite</h5>
            <h3 className='md:text-md sm:text-xs lg:text-3xl font-bold relative rank_silver mb-6'>Rank #2</h3>
            <img src='/silver.jpg' alt='avatar' className='avatar mb-4' />
            <span className='block md:text-md sm:text-xs lg:text-lg relative  text-white mb-2'>Funny Guy</span>
            <div className='grid grid-cols-3 py-auto'>
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
                    <span className='block md:text-md sm:text-xs lg:text-lg text-white'>{data}</span>
                </div>
            </div>
            <button className='text-white rounded-xl sm:w-3/5 py-5 button_silver md:text-md sm:text-xs lg:text-lg mx-auto my-auto'>
                View Profile
            </button>
        </div>
    )
}

export default SilverCard;