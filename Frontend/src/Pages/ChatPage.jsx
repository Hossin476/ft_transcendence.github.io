import React, { useContext, useEffect,useState } from 'react';
import ChatList from '../Components/chat/ChatList';
import {useLocation} from 'react-router-dom'
// import ChatList from '../Components/chat/ChatList';
import ChatField from '../Components/chat/ChatField';
import ChatProfileBrief from '../Components/chat/ChatProfileBrief';
import { useAuth } from '../context/AuthContext';
import ChatContext, { ChatProvider } from '../context/ChatContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function handleDirectMessaging({convo}, currentContact, setMessages) {
    const { message, friendship } = convo
    if(!currentContact)
            return
    if (friendship.id === currentContact.id)
        setMessages((prevMessages) => [...prevMessages, message])
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

function updateconversation(data , conversation, setConversation, ) {
    const message = data.convo.message
    conversation.map((convo) => {
        if (convo.user.id === data.sender || convo.user.id === data.receiver) {
            convo.last_msg = message
        }
    }
    )
    conversation.sort((a, b) => {
        return new Date(b.last_msg.created_at) - new Date(a.last_msg.created_at)
    })
    setConversation([...conversation])
}

const ChatPage = () => {

    const location = useLocation()
    const { chatsocket, user } = useAuth()
    const { currantUser, setMessages,setSeen,setBlocker,setCurrentUser} = useContext(ChatContext)
    const {typing, setTyping} = useContext(ChatContext)
    const {count, setCount} = useContext(ChatContext)
    const {navigatedUser} = location.state || {}
    const {conversation, setConversation} = useContext(ChatContext)
    /* filter the contacts and update the state of contact  */
    const manageBlock = (data,currentUser)=> {

        const {blocker} = data.event
        
        if (blocker) {
            setConversation((prevConv)=> {
                return prevConv.filter(item=>item.id !== blocker)
            })
            if(currantUser && currantUser.id === blocker)
                setCurrentUser(()=>null)
        }
    }

    useEffect(()=> {
        console.log("heloooo this is the navigated user:",navigatedUser)
        console.log("conversations", conversation)
        if(conversation && navigatedUser) {
            const contact = conversation.find(item=> item.user.username === navigatedUser)
            setCurrentUser(()=>contact)
        }
    },[conversation])

    useEffect(() => {
        if (chatsocket) {
            (chatsocket.onmessage = (e) => {
                const data = JSON.parse(e.data)
                const { type,reciever, sender} = data.event
                if (type === "chat.message") {
                    setSeen(()=>false)
                    handleDirectMessaging(data.event, currantUser, setMessages)
                    updateconversation(data.event, conversation, setConversation)
                }
                if(type == "message.seen" && user.user_id === reciever) {
                    const {friendship} = data.event
                    if (data.event.reciever === user.user_id && friendship === currantUser.id )
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
                if(type == "block") {
                    manageBlock(data,currantUser)
                }
            })
        }
    }, [chatsocket, currantUser, user, setMessages, setSeen, typing, setTyping])
    console.log(currantUser)
    return (
        <div className="flex-1 h-[90%] relative flex items-center p-4 gap-4 ">
            <ChatList />
            {
                currantUser ? <>
                    <ChatField />
                    <ChatProfileBrief />
                </>:
                <div className={`xsm:${currantUser ? 'flex' : 'hidden'} h-[90%] md:flex  items-center justify-center flex-1 h-[90%] bg-secondaryColor  sm:px-4 xl:px-8 rounded-3xl`}>
                        <div className = "w-[100%]">
                            <DotLottieReact className="w-full"
                                src="https://lottie.host/8f87b14d-6455-4905-b9f9-487381b36012/WxT65lnrr0.json"
                                style={{width: '60vw', height: '60vw'}}
                                loop
                                autoplay
                            />
                        </div>
                </div>
            }
        </div>
    );
}

export default ChatPage;