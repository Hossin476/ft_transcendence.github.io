import React, { forwardRef } from 'react';

function FirstPlayer({ user_name, level, scores }) {
    return (
        <div className="flex first_player items-center text-white rounded-md flex-grow">
            <img src='/lshail.jpeg' alt='avatar' className='xsm:w-[10vw] lg:w-24 xsm:h-[10vw] lg:h-24 rounded-[50%]' />
            <div className="flex-1 xsm:ml-1 lg:ml-4">
                <h1 className="xsm:text-[2vw] lg:text-lg font-inter">{user_name}</h1>
                <h4 className="xsm:text-[1vw] lg:text-[0.7rem] font-inter">LEVEL {level}</h4>
            </div>
            <h2 className="font-Plaguard xsm:text-[2vw] lg:text-4xl">{scores.X}</h2>
        </div>
    );
}

export default FirstPlayer;

