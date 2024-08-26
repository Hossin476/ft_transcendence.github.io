import React, { useContext, useMemo } from 'react'
import ChatContext from '../../context/ChatContext'


const ChatProfileBrief = () => {

    const {currantUser} = useContext(ChatContext)
    let friend = {

        profilePicture: "/public/user.jpeg",
        coverPicture: "/public/bg.jpg",
        name: "L9ORAYDISS",
        id: "ID: AD9823X1",
        alt: "alt",
    }

    return useMemo(()=> {
        return (
            <div className="hidden lg:block h-5/6 mx-5 bg-secondaryColor rounded-3xl w-full lg:w-1/4 mt-5 sm:mt-0">
                <div className=" w-full flex center justify-center relative">
                    <img src={friend.coverPicture} alt={friend.alt} className='relative flex rounded-t-3xl'/>
                    <img src={friend.profilePicture} alt={friend.alt} className='absolute translate-y-14 w-28 h-28 rounded-full'/>
                </div>
                <div className="flex flex-col justify-center items-center mt-20">
                    <p className="text-xl text-white">{friend.name}</p>
                    <p className="font-thin text-xs text-white opacity-70">{friend.id}</p>
                </div>
                <div className="flex flex-col justify-center items-center mt-10">
                    <p className='text-white font-bold'>Invite to play</p>
                    <hr className="w-3/4 bg-gray-400 my-1 h-px border-0" />
                    <div className="m-5 flex justify-center">
                    <div className="grid grid-cols-2 gap-2 place-items-center">
                      <button style={{fontSize: '7px'}} type="button" className="rounded-full p-3 py-2  border border-1 border-white bg-white bg-opacity-40 text-white">ping pong</button>
                      <button style={{fontSize: '7px'}} type="button" className="rounded-full p-3 py-2 border border-1 border-white bg-white bg-opacity-40 text-white">Tic Tac Toe</button>
                    </div>
                </div>
                </div>
                <div className="flex flex-col justify-center items-center mt-2">
                    <p className='text-white font-bold'>General</p>
                    <hr className="w-3/4 bg-gray-400 my-1 h-px border-0" />
                    <div className="m-5 flex justify-center">
                    <div className="grid grid-rows-2 gap-3 place-items-center">
                      <button style={{fontSize: '7px'}} type="button" className="rounded-full p-3 py-2 px-8 border border-1 border-white bg-white bg-opacity-40 text-white">view profile</button>
                      <button style={{fontSize: '7px'}} type="button" className="rounded-full p-3 py-2 px-8 border border-1 border-white bg-white bg-opacity-40 text-white">Block</button>
                    </div>
                </div>
                </div>
            </div>
      )
    },
    [currantUser])
}

export default ChatProfileBrief
