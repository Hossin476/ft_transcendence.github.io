import React from 'react'
import { useTranslation } from 'react-i18next'

const styles = {
    progress:{
        fill: "none",
        stroke: "#C77DFF",
        strokeLinecap: "round",
        transition: "stroke-dashoffset 1s ease"
    },
    circle:
    {
        fill: "none",
        stroke: "#eee",
    },
    perc: {
        fontFamily: "Arial, sans-serif",
        fontSize: "24px",
        fill: "#fff",
    }
}

export default function Statistics({user}) {
    const {t} = useTranslation()
    const circumference = 2 * Math.PI * 45;
    const dashOffset = circumference - (user.win_rate / 100 * circumference);
    return (
       <div className="md:w-[40%] p-2 ">
            <h1 className="text-2xl font-bold mb-2 h-[2rem] text-center">{t('STATISTICS')}</h1>
            <div className="w-full h-[calc(100%-2rem)] flex justify-between items-center ">
                <div className="w-1/2">
                    <div className="my-2 flex items-center justify-between w-full">
                        <p>{t('total wins')}</p>
                        <p>{user.total_wins}</p>
                    </div>                                        
                    <div className="my-2 flex items-center justify-between w-full">
                        <p>{t('total losses')}</p>
                        <p>{user.total_loses}</p>
                    </div>                                        
                    <div className="my-2 flex items-center justify-between w-full">
                        <p>{t('total games')}</p>
                        <p>{user.total_games}</p>
                    </div>                                        
                </div>
                <div className="w-1/2  flex flex-col  items-center">
                    <div className="w-20 h-20">
                        <svg  viewBox="0 0 100 100">
                            <circle style={styles.circle} cx="50" cy="50" r="45" strokeWidth="1"></circle>
                            <circle style={styles.progress} cx="50" cy="50" r="45" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={dashOffset}></circle>
                            <text  style={styles.perc} x="50" y="50" textAnchor="middle" dominantBaseline="central">{user.win_rate}%</text>
                        </svg>
                    </div>
                    <p>{t('Winrate')}</p>
                </div>
            </div>
        </div>
    )
}