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

function handleTyping(typing, setTyping, sender) {
    if (typing.timer) {
        clearTimeout(typing.timer)
    }

    setTyping({ typing: true, timer: typing.timer, sender: sender })

    const newTimer = setTimeout(() => {
        setTyping({ typing: false, timer: null, sender: sender })
    }, 2000)

    setTyping(prev => ({ ...prev, timer: newTimer }))
}

const ChatPage = () => {
    const { chatsocket, user } = useAuth()
    const { currantUser, setMessages,setSeen} = useContext(ChatContext)
    const {typing, setTyping} = useContext(ChatContext)
    const {count, setCount} = useContext(ChatContext)

    useEffect(() => {
        if (chatsocket) {
            (chatsocket.onmessage = (e) => {
                const data = JSON.parse(e.data)
                const { type,reciever, sender } = data.event
                if (type === "chat.message") {
                    setSeen(()=>false)
                    handleDirectMessaging(data.event, currantUser, user, setMessages)
                }
                if(type == "message.seen" && user.user_id === reciever) {
                    if (data.event.reciever === user.user_id)
                        setSeen(()=>true)
                }
                if (type === "typing" && user.user_id === reciever) {
                    handleTyping(typing, setTyping, sender)
                }
                if (type === "count" && user.user_id === reciever) {
                    setCount((prevCount) => {
                      const obj = prevCount.find(item => item.id === sender) || {id: sender, count: 0};
                      obj.count = obj.count + 1;
                      return [...prevCount.filter(item => item.id !== sender), obj];
                    });
                }
            })
        }
    }, [chatsocket, currantUser, user, setMessages, setSeen, typing, setTyping])

    return (
        <div className="flex-1 h-[90%] relative flex items-center p-4 gap-4 ">
            <ChatList />
            <ChatField />
            <ChatProfileBrief />
        </div>
    );
}

export default ChatPage;