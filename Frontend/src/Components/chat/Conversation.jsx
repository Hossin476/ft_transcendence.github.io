import React, { useEffect, useMemo, useRef } from 'react';
import {useContext} from 'react'
import ChatContext from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTranslation } from 'react-i18next';

const Typing_render = () => {
    return (
      <div className="self-start bg-gray-400 border-linkColor border-[2px] rounded-xl w-20">
        <DotLottieReact
            src="https://lottie.host/0c9dffbe-e667-45cd-be77-9bd29512c886/CpM7tDcwmk.json"
            loop
            autoplay
            style={{width: '100%', height: '100%'}}
          />
        </div>
    )
} 

const getMessages = async (chatUser,tokens, customFetch)=> {
 try {
    const respons = await customFetch("/api/chat/messages",{
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

 } catch (error) {
    return null
 }
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

  const {t} = useTranslation()
  const {user,tokens,chatsocket, customFetch} = useAuth()
  const {currantUser,messages,setMessages,seen,setSeen, typing,setBlocker,blocker} = useContext(ChatContext)
  const elementRef = useRef(null)
  

  useEffect(()=> {
    const fetchMessages = async ()=> {
      const data = await getMessages(currantUser,tokens, customFetch)
      setSeen(()=> {
        if(!data || data.length === 0)
            return false
        let last_msg = data.at(-1)
        return (last_msg.sendId === user.user_id && last_msg.seen === true)
      })
      setMessages(()=>data)
    }
    if(currantUser)
      fetchMessages()
  }, [currantUser])

  useEffect(()=> {
    let lasts;

    if (messages && messages.length > 0) {
      lasts = messages.at(-1)
    }

    if (lasts && lasts.sendId !== user.user_id) {
      chatsocket && chatsocket.send(
        JSON.stringify({
          type: "seen_message",
          msg_id: lasts.id,
          reciever: currantUser.user.id,
          friendship: currantUser.id
        })
      )
    }
    elementRef.current.scrollIntoView({behavior:"smooth",block: 'end'})

}, [messages])

  return useMemo(()=> {
    return (
      <div  className="flex-1 overflow-y-scroll flex flex-col space-y-4 px-4 bg-gray-300 ">
        {messages && messages.map((conv, index) => (
            <div key={`${index}`} className="w-full   flex flex-col mt-4">
              <div className={`w-fit rounded-xl  ${conv.sendId === user.user_id ? 'self-end bg-linkColor  border-forthColor' : 'self-start bg-gray-400  border-linkColor'} max-w-[50%]  border-[2px]  relative`}>
                <div 
                    className={` pt-2 w-fit  px-5 p-2 flex items-center `}>
                    <p className="text-gray-600 break-all text-wrap ">
                        {conv.content}
                      </p>
                </div>
                <p style={{fontSize: '10px'}} className={`absolute right-2  text-black opacity-60`}>{getFormatedDate(conv.created_at)}</p>
              </div>
            </div>
        ))}
        {
          seen === true ? <p className="self-end text-black pr-4">{t("seen")}</p>: ""
        }
        {
          currantUser && currantUser.user.id === typing.sender &&
          typing.typing === true ? <Typing_render /> : ""
        }
        <div ref={elementRef}></div>
      </div>
    );
  }
  ,[messages,currantUser,seen, typing,blocker])
}

export default Conversation;