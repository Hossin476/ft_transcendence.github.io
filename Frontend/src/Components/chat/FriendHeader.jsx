
import React,{useContext, useMemo} from 'react'
import ChatContext from "../../context/ChatContext";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";

const FriendHeader = () => {

  const {currantUser,setCurrentUser} = useContext(ChatContext)

  return useMemo(()=> {
    return (
      <div className="h-[8rem] gap-2 p-5 rounded-lg">
              <div  className="flex items-center gap-4">
              <HiMiniArrowUturnLeft onClick={()=>setCurrentUser(()=>null)} className="xsm:block md:hidden text-lg text-black" />
              <div className="relative xsm:h-12 xsm:w-12 md:h-20 md:w-20 rounded-full bg-blue-300">
                  <div className="xsm:h-12 xsm:w-12 md:h-20 md:w-20 bg-indigo-500 rounded-full "></div>
                  <div className="xsm:h-2 xsm:w-2 md:h-4 md:w-4 bg-green-500 right-0 top-2 rounded-full absolute"></div>
              </div>
              <div>
                  <h1 className=" md:text-2xl xs:text-sm text-gray-700 font-bold uppercase">{currantUser && currantUser.user.username}</h1>
                  <p className="xsm:text-xs   text-gray-500"> Active Now</p>
              </div>
            </div>
            <hr className="mt-5 border border-gray-400 bg-gray-500"></hr>
      </div>
    )
  },[currantUser])
}

export default FriendHeader