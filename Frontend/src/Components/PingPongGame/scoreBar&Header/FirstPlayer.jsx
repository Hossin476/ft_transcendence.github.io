import React from 'react'
import { forwardRef } from 'react'

function FirstPlayer({name, level, image},ref) {
    return (
        <div className="flex items-center text-white rounded-md flex-grow">
            <img src={image} alt='avatar' className='xsm:w-[10vw] lg:w-24 xsm:h-[10vw] lg:h-24 object-cover rounded-[50%] border-forthColor border-[2px]' />
            <div className="flex-1 xsm:ml-1 lg:ml-4">
            <h1 className="font-inter  xsm:text-[2vw] lg:text-lg ">{name}</h1>
                <h4 className="font-inter   xsm:text-[1vw] lg:text-[0.7rem]">LEVEL {level}</h4>
            </div>
            <h2 className="font-Plaguard xsm:text-[2vw]  lg:text-4xl" ref={ref}>00</h2>
        </div>
    )
}

export default forwardRef(FirstPlayer)
