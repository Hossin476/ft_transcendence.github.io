import React, { useEffect, useMemo, useState } from 'react';
import {useContext} from 'react'
import ChatContext from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
const getMessages = async (chatUser,tokens)=> {
  // console.log("in the fetch messages",chatUser)
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
  const {currantUser,messages,setMessages,seen,setSeen} = useContext(ChatContext)

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
  },[currantUser])

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
},
[messages])

  return useMemo(()=> {
    return (
      <div className="h-2/3 flex-grow overflow-y-scroll flex flex-col space-y-2 p-6 text-gray-600">
        {messages && messages.map((conv, index) => (
            <div key={`${index}`} 
                 className={`shadow-2xl shadow-indigo-700/50 pt-2 ${conv.sendId === user.user_id ? 'self-end bg-linkColor' : 'self-start bg-gray'} rounded-2xl px-5 p-2 flex items-center`}>
              <p>{conv.content}</p>
              <p style={{fontSize: '10px'}} className='pl-5 pt-5 opacity-60'>{getFormatedDate(conv.created_at)}</p>
            </div>
        ))}
        {
          seen === true ? <p className="self-end pr-4">seen</p>: ""
        }
      </div>
    );
  }
  ,[messages,currantUser,seen])
}

export default Conversation;