import { useAuth } from "../../context/AuthContext"
import imgProfle from "/public/ykhourba.jpeg"
import {useState,useEffect} from 'react'
import { useTranslation } from "react-i18next";

export default function Match({match}) {
    {/*
        bg-defeat : #572a39
        bg-win : #395446
        bg-draw : #645c6b
        
        text-defeat : #d75c5c
        text-draw : #f4f4f4
        text-win:#d1c875

*/}
    const { t } = useTranslation();
    const {user} = useAuth()
    const [bgColor,setBgColor] = useState(null)
    const [textColor,setTextColor] = useState(null)

    useEffect(()=>{
        console.log(match)
        match.winner
            ? (match.winner.id === user.user_id ? setBgColor(()=>'#395446')  : setBgColor(()=>'#572a39') )
            : setBgColor(()=>'#645c6b') 
        match.winner ? (match.winner.id === user.user_id ? setTextColor(()=>'#d1c875') : setTextColor(()=>'#d75c5c') ) : setTextColor(()=>'#f4f4f4')
    },[])

    return (
        (bgColor || textColor) && <div style={{backgroundColor:bgColor}}  className={`flex  items-center justify-between xsm:p-1 xsm:m-2 sm:p-2  rounded-xl`}>
            <hr  className=" xsm:h-[3rem] sm:h-[4rem] lg:ml-2 w-1 bg-gray-200 rounded-full border-none"/>
            <div className="xsm:text-xs lg:text-lg flex flex-col items-center justify-center">
                <div className="xsm:h-8 xsm:w-8 sm:h-16 sm:w-16 bg-red-500 overflow-hidden  rounded-full">
                    <img className="w-full" src={imgProfle} alt="" />
                </div>
                <p>{match.player1.username}</p>
            </div>
            <div className="xsm:text-[10px]  sm:text-lg flex flex-col items-center">
                    <p style={{color:textColor}} >
                        {match.winner ? (match.winner.id === user.user_id ? t("VICTORY") : t("DEFEAT")) : t("DRAW")}
                    </p>
                    <p>{match.score1} - {match.score2}</p>
                    <p className="text-[#d1c875] uppercase">{match.game_type}</p>
            </div>
            <div className="xsm:text-xs lg:text-lg flex flex-col items-center justify-center">
                <div className="xsm:h-8 xsm:w-8 sm:h-16 sm:w-16 bg-red-500 overflow-hidden  rounded-full">
                    <img className="w-full" src={imgProfle} alt="" />
                </div>
                <p>{match.player2.username}</p>
            </div>
            <hr  className="w-[2px] h-[4rem] border-none rounded-full bg-gray-400"/>
            <div className="xsm:text-xs sm:text-lg flex flex-col xsm:w-12 sm:w-24  ">
                <p className="self-start">TI</p>
                <p className="self-center">{match.duration}</p>
                <p className="self-end">ME</p>
            </div>
        </div>
    )
}