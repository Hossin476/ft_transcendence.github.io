import React from 'react'
import { useTranslation } from 'react-i18next'

function User({ className }) {
    const { t } = useTranslation()
    return (
        <div className={`${className}`}>
            <div className="img_container w-[50%] h-[50%] mx-auto my-auto">
                <img src="lshail.jpeg" alt="Avatar" className="rounded-full" />
            </div>
            <p className="text-white relative md:text-md lg:text-xl sm:text-sm">{t("Username")}</p>
        </div>
    )
}

export default User