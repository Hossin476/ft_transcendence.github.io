import React, { useContext, useEffect,useState } from 'react';
import ChatList from '../Components/chat/ChatList';
// import ChatList from '../Components/chat/ChatList';
import ChatField from '../Components/chat/ChatField';
import ChatProfileBrief from '../Components/chat/ChatProfileBrief';
import { useAuth } from '../context/AuthContext';
import ChatContext, { ChatProvider } from '../context/ChatContext';


function handleDirectMessaging({ convo, sender, receiver }, currentContact, user, setMessages) {
    const { message, friendship } = convo
    const { user:chatUser } = currentContact
    const result = (sender == user.user_id && receiver == chatUser.id)
    const resultTwo = (sender == chatUser.id && receiver == user.user_id)

    if (result || resultTwo) {
        setMessages((prevMessages) => [...prevMessages, message])
    }

}


const ChatPage = () => {
    const { chatsocket, user } = useAuth()
    const { currantUser, setMessages,setSeen } = useContext(ChatContext)
    if (chatsocket) {
        (chatsocket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            const { type,reciever } = data.event
            // console.log(data)
            if (type === "chat.message") {
                setSeen(()=>false)
                handleDirectMessaging(data.event, currantUser, user, setMessages)
            }
            if(type == "message.seen" && user.user_id === reciever) {
                console.log("check the seeen ----------")
                if (data.event.reciever === user.user_id)
                    setSeen(()=>true)
            }
            if (type === "typing") {
                console.log("typing...")
            }
        })
    }

    console.log(user)
    return (
        <div className="flex-1 h-[90%] relative flex items-center p-4 gap-4 ">
            <ChatList />
            <ChatField />
            <ChatProfileBrief />
        </div>
    );
}

export default ChatPage;