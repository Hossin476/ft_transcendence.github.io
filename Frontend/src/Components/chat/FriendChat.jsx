import React, { useState } from 'react';
import { friends } from './data.js';
import img from "/user.jpeg";

export default function FriendChat() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <>
      {friends.map((friend, index) => (
        <span key={index} 
              className={`flex justify-between text-shadow-2xl my-2 items-center p-3 ${selectedChat === index ? 'bg-gradient-to-r from-linkColor' : ''} hover:bg-white hover:bg-opacity-20`}
              onClick={() => setSelectedChat(index)}
              style={{ cursor: 'pointer' }}>
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full relative">
              <img className="w-full rounded-full" src={img} alt="" />
              <span className={`w-4 h-4 right-0 bottom-0 rounded-full ${friend.isConnected ? 'bg-green-500' : 'bg-gray-500'} absolute`}></span>
            </div>
            <div>
              <p className="text-base">{friend.name}</p>
              <p className="text-sm font-thin opacity-70">{friend.messages} new messages</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {friend.lastSeen}
          </div>
        </span>
      ))}
    </>
  );
}