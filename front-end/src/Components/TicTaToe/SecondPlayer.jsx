import React from 'react';

function SecondPlayer({ user_name, level, scores }) {
    return (
        <div className="flex items-center second_player text-white rounded-md flex-grow">
            <h2 className="font-Plaguard xsm:text-[2vw] lg:text-4xl">{scores.O}</h2>
            <div className="flex-1 xsm:mr-1 lg:mr-4">
                <h1 className="font-inter xsm:text-[2vw] lg:text-lg text-right">{user_name}</h1>
                <h4 className="font-inter text-right xsm:text-[1vw] lg:text-[0.7rem]">LEVEL {level}</h4>
            </div>
            <img src='lshail.jpeg' alt='avatar' className='xsm:w-[10vw] lg:w-24 xsm:h-[10vw] lg:h-24 object-cover rounded-[50%]' />
        </div>
    );
}

export default SecondPlayer;

