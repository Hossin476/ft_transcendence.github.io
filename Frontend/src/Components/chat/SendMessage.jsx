import React, { useContext, useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import ChatContext from "../../context/ChatContext";
import {debounce} from 'lodash'
import { useTranslation } from "react-i18next";

const SendMessage = () => {

  const [message,setMessages] = useState("")
  const {chatsocket,user} = useAuth()
  const {currantUser, setTyping, typing}  = useContext(ChatContext)
  const {t} = useTranslation()

  const handleMessage = () => {
    chatsocket && ( message.trim() && chatsocket.send(JSON.stringify({
      "type" : "new_messgaes",
      "content" :message,
      "senderId" :JSON.stringify({ "id":user.user_id,"username":user.username}),
      "friendshipId": currantUser.id,
      "receiver": currantUser.user.id,
      "sender":user.user_id
    })))
    setMessages((prevMessage)=>prevMessage = "")
  }

  const handleTyping = () => {
    chatsocket && chatsocket.send(JSON.stringify({
      "type": "typing",
      "senderId": user.user_id,
      "reciever": currantUser.user.id,
    }));
  };

  const handlecount = () => {
    chatsocket && chatsocket.send(JSON.stringify({
      "type": "count",
      "senderId": user.user_id,
      "reciever": currantUser.user.id
    }));
  }

  const handeInput = (e) => {
    setMessages(e.target.value)
    handleTyping()
  }
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleMessage()
      handlecount()
    }
  } 

  const handleSendMessage = () => {
    handleMessage();
    handlecount();
  };

  return (
    <div className=" xsm:h-[5rem] md:h-[7rem]   flex items-center relative">
      <hr className="bg-gray-400 h-1 w-full absolute top-0 rounded" />
      <div className="relative flex-1 flex">
        <div className="relative px-4 justify-between items-center   flex w-full">
          <button className=" xsm:w-8 xsm:h-8  md:w-12 md:h-12 flex items-center rounded-full justify-center bg-gray-400 ">
            <MdEmojiEmotions  className="xsm:text-lg md:text-2xl text-gray-500"/>
          </button>
          <input
            value = {message}
            onChange={handeInput}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder={t("Type your message")}
            className="w-[90%] text-gray-600 px-4 placeholder-gray-500 bg-transparent  bg-gray-100   py-3 outline-none focus:outline-none"
          />
          <button onClick={handleSendMessage} className="  xsm:w-8 xsm:h-8  md:w-12 md:h-12 flex items-center rounded-full justify-center bg-gray-400">
            <RiSendPlaneFill   className="xsm:text-lg md:text-2xl text-gray-500"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;