import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t } =  useTranslation();
    return (
        <div className="">
            <h2 className=" xsm:text-[2.5rem] md:text-[4rem] text-center font-bold font-Valorax">Ping Pong</h2>
            <h3 className="xsm:text-[1.5rem] text-center md:text-[2rem] font-Valorax">{t("TOURNAMENT")}</h3>
        </div>
    )
}