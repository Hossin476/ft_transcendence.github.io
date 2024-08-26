
import React,{useContext, useMemo} from 'react'
import ChatContext from "../../context/ChatContext";


const FriendHeader = () => {

  const {currantUser} = useContext(ChatContext)
  return useMemo(()=> {

    return (
      <div className="h-1/5 gap-2 p-5 rounded-lg">
          <div className="block">
            <h1 className="text-5xl xs:text-sm text-gray-500 ">{currantUser && currantUser.user.username}</h1>
            <div className="flex items-center space-x-2 pt-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Active now</span>
            </div>
            <hr className="mt-5 border border-gray-400 bg-gray-500"></hr>
          </div>
      </div>
    )
  },[currantUser])
}

export default FriendHeader