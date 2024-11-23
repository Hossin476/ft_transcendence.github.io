
import React,{useContext, useMemo} from 'react'
import ChatContext from "../../context/ChatContext";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const FriendHeader = () => {

  const {currantUser,setCurrentUser} = useContext(ChatContext)
  const {t} = useTranslation()

  return useMemo(()=> {
    return (
      <div className="h-[8rem] gap-2 p-5 rounded-lg">
              <div  className="flex items-center gap-4">
              <HiMiniArrowUturnLeft onClick={()=>setCurrentUser(()=>null)} className="xsm:block md:hidden text-lg text-black" />
              <div className="relative xsm:h-12 xsm:w-12 md:h-20 md:w-20 rounded-full bg-blue-300">
                  <div className="xsm:h-12 xsm:w-12 md:h-20 md:w-20 bg-indigo-500 overflow-hidden rounded-full ">
                    <img className='w-full h-full object-cover' src={currantUser.user.profile_image} alt="" />
                  </div>
                  <div className={`xsm:h-2 xsm:w-2 md:h-4 md:w-4 ${currantUser.user.is_online ? "bg-green-500" : "bg-red-500"} right-0 top-2 rounded-full absolute`}></div>
              </div>
              <div>
                  <h1 className=" md:text-2xl xs:text-sm text-gray-700 font-bold uppercase">{currantUser.user.username}</h1>
                  {
                    currantUser.user.is_online
                    ? <p className="xsm:text-xs text-green-500"> {t("Active Now")}</p>
                    : <p className="xsm:text-xs text-red-500"> {t("offline")}</p>
                  }
              </div>
            </div>
            <hr className="mt-5 border border-gray-400 bg-gray-500"></hr>
      </div>
    )
  },[currantUser, t])
}

export default FriendHeader