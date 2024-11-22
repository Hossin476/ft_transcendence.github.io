import React from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
    const { t } = useTranslation()
    return (
        <div className="header_container h-1/6 flex flex-col justify-center items-center">
            <h1 className='lg:text-6xl md:text-4xl sm:text-md text-center top_title'>PING PONG</h1>
            <h3 className='text-white lg:text-2xl md:text-xl sm:text-md font-bold text-center down_title'>{t("TOURNAMENT")}</h3>
        </div>
    )
}

export default Header