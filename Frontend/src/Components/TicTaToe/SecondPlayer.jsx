import React from 'react';

function SecondPlayer({ profile_image, username, rank, score }) {
    return (
        <div className="flex items-center second_player text-white rounded-md flex-grow">
            <h2 className="font-Plaguard xsm:text-[2vw] lg:text-4xl">{score !== null ? score : '--'}</h2>
            <div className="flex-1 xsm:mr-1 lg:mr-4">
                <h1 className="font-inter xsm:text-[2vw] lg:text-lg text-right">{username}</h1>
                <h4 className="font-inter text-right xsm:text-[1vw] lg:text-[0.7rem]">LEVEL {rank}</h4>
            </div>
            <img src={profile_image} alt='avatar' className='xsm:w-[10vw] lg:w-[4.5rem] lg:h-[4.5rem] xsm:h-[10vw] object-cover rounded-[50%]' />
        </div>
    );
}

export default SecondPlayer;