import React, { useEffect, useMemo, useRef } from 'react';
import {useContext} from 'react'
import ChatContext from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import Lottie from 'react-lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import typing_animation from '../../../public/typing.json';


const Typing_render = () => {
    return (
      <div className="self-start bg-gray-400  border-linkColor border-[2px] rounded-xl w-20 h-10">
        <DotLottieReact
            src="https://lottie.host/b2bb6c89-5bae-4a2e-98e8-3acf68655ca0/zXc9PPXQHf.json"
            loop
            autoplay
            style={{width: '100%', height: '100%'}}
          />
        </div>
    )
} 


const getMessages = async (chatUser,tokens)=> {

  const respons = await fetch("http://127.0.0.1:8000/chat/messages",{
      method:"POST",
      headers :{
              'Content-Type':"application/json",
              'Authorization': 'JWT ' + tokens.access
      },
      body:JSON.stringify({
              "friendship" : chatUser.id
      })
  })

  let data = await respons.json()
  if(respons.ok)
    return data
  return null
}

function getFormatedDate(messageTime) {

  let date = new Date(messageTime)
  let givenTime = new Intl.DateTimeFormat('en-US',{
    hour:'numeric',
    minute:'numeric',
    hour12:true
  }).format(date)
  return givenTime
}

const Conversation = () => {

  const {user,tokens,chatsocket} = useAuth()
  const {currantUser,messages,setMessages,seen,setSeen, typing} = useContext(ChatContext)
  const elementRef = useRef(null)

  useEffect(()=> {
    const fetchMessages = async ()=> {
      const data = await getMessages(currantUser,tokens)
      setSeen(()=> {
        if(!data)
            return false
        let last_msg = data.at(-1)
        return ( last_msg.sendId === user.user_id && last_msg.seen === true)
      })
      setMessages(()=>data)
      console.log(data)
    }
    if(currantUser)
      fetchMessages()
  }, [currantUser])

  useEffect(()=> {
    let _message
    messages && (_message = messages.at(-1))
    if(messages  && user.user_id != _message.sendId) {
      chatsocket && chatsocket.send(
            JSON.stringify({
                "type" : "seen_message",
                "msg_id" :_message.id,
                "reciever":_message.sendId  === user.user_id ? user.user_id :  currantUser.user.id
            })
        )
    }
    elementRef.current.scrollIntoView({behavior:"smooth",block: 'end'})
    console.log("hello world",elementRef.current)
}, [messages])

  return useMemo(()=> {
    return (
      <div  className="flex-1 overflow-y-scroll flex flex-col space-y-4 px-4  text-gray-600">
        {messages && messages.map((conv, index) => (
            <div key={`${index}`} className="w-full  flex flex-col mt-4">
              <div className={`w-fit rounded-xl  ${conv.sendId === user.user_id ? 'self-end bg-linkColor  border-forthColor' : 'self-start bg-gray-400  border-linkColor'} border-[2px]  relative`}>
                <div 
                    className={` pt-2 w-fit  px-5 p-2 flex items-center `}>
                    <p className="text-gray-600">{conv.content}</p>
                </div>
                <p style={{fontSize: '10px'}} className={`absolute right-2  opacity-60`}>{getFormatedDate(conv.created_at)}</p>
              </div>
            </div>
        ))}
        {
          seen === true ? <p className="self-end pr-4">seen</p>: ""
        }
        {
          currantUser && currantUser.user.id === typing.sender &&
          // typing.typing === true ? <p className="self-start"> typing...</p> : ""
          typing.typing === true ? <Typing_render /> : ""
        }
        <div ref={elementRef}></div>
      </div>
    );
  }
  ,[messages,currantUser,seen, typing])
}

export default Conversation;