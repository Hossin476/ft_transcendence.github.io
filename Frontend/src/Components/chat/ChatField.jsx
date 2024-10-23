import {useContext} from 'react'
import FriendHeader from "./FriendHeader.jsx"
import Conversation from "./Conversation.jsx"
import SendMessage from "./SendMessage"
import ChatContext from "../../context/ChatContext.jsx"
import { useAuth } from '../../context/AuthContext.jsx'

export default function ChatField(){

    const { currantUser,blocker} = useContext(ChatContext)
    const {user} = useAuth()
    console.log(blocker)
    return(
        <div className={`xsm:${currantUser ? 'flex' : 'hidden'} h-[90%] md:flex   flex-1  flex-col h-[90%] bg-gray-300  sm:px-4 xl:px-8 rounded-3xl`}>
            <FriendHeader  />
            <Conversation />
            {blocker 
                ?(blocker.id ===user.user_id 
                    ?<p className="h-12 bg-gray-400 rounded-xl mb-2 text-lg flex items-center justify-center text-gray-600">you blocked {currantUser.user.username}</p>
                    :<p className="h-12 bg-gray-400 rounded-xl mb-2 text-lg flex items-center justify-center text-gray-600">you have been blocked by {blocker.username}</p> )
                :<SendMessage />}
        </div>
    )
}