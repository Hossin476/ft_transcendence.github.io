import {useContext} from 'react'
import FriendHeader from "./FriendHeader.jsx"
import Conversation from "./Conversation.jsx"
import SendMessage from "./SendMessage"
import ChatContext from "../../context/ChatContext.jsx"

export default function ChatField(){

    const { currantUser} = useContext(ChatContext)
    return(
        <div className={`xsm:${currantUser ? 'flex' : 'hidden'} h-[90%] md:flex   flex-1  flex-col h-[90%] bg-gray-300  sm:px-4 xl:px-8 rounded-3xl`}>
            <FriendHeader  />
            <Conversation />
            <SendMessage />
        </div>
    )
}