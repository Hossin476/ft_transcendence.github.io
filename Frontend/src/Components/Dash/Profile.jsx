import imgProfle from "/public/ykhourba.jpeg"
import { RiFileCopy2Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export default function Profile({user}) {
    const {t} = useTranslation()
    console.log(user.xp)
    const xp = 100 -  user.xp 
    console.log("this is the fucking xp", xp)
    return(

        <div className=" md:w-[60%] xsm:h-[10em] lg:h-auto flex items-center  sm:gap-x-2 lg:gap-x-4 ">
        <div className="xsm:w-20 xsm:h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-[#3F2D44] flex items-center justify-center relative">
            <div className="h-[80%] w-[80%] overflow-hidden flex items-center justify-center  border-2 border-forthColor rounded-full">
                <img className="w-full h-full object-fill" src={imgProfle} alt="" />
            </div>
            <p className="text-xs absolute -bottom-2  bg-gray-300 text-black p-1 border border-black sm:text-sm lg:text-lg  rounded-2xl">{t("LEVEL")} 2</p>
        </div>
        <div className="xsm:ml-2 sm:ml-0 w-[calc(100%-30%)] h-[50%] flex  flex-col justify-between">
            <div className="xsm:mb-2 sm:mb-4">
                    <h1 className="sm:text-lg lg:text-2xl uppercase font-bold">{user.username}</h1>
                    <p className="flex  text-xs items-center">ID {user.id} <RiFileCopy2Line className="ml-2"/></p>                                       
            </div>
            <div className=" ">
                <div className="flex justify-between xsm:text-xs mb-1">
                    <p>{xp}XP {t('TO GO')}</p>
                    <p>{t('LEVEL')} 3</p>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className={`w-[${user.xp}%] h-2 bg-forthColor rounded-full`}></div>
                </div>
            </div>
        </div>
    </div>
    )
}