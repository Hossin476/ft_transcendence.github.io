import React from 'react';
import { useTranslation } from 'react-i18next';

function FirstPlayer({ profile_image, username, rank, score }) {
    const { t } = useTranslation();
    return (
        <div className="flex first_player items-center text-white rounded-md flex-grow">
            <img src={profile_image} alt='avatar' className='xsm:w-[10vw] lg:w-[4.5rem] lg:h-[4.5rem] xsm:h-[10vw] object-cover rounded-[50%]' />
            <div className="flex-1 xsm:ml-1 lg:ml-4">
                <h1 className="xsm:text-[2vw] lg:text-lg font-inter">{username}</h1>
                <h4 className="xsm:text-[1vw] lg:text-[0.7rem] font-inter">{t("LEVEL")} {rank}</h4>
            </div>
            <h2 className="font-Plaguard xsm:text-[2vw] lg:text-4xl">{score !== null ? score : '--'}</h2>
        </div>
    );
}

export default FirstPlayer;