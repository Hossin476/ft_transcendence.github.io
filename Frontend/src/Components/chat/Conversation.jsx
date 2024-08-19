import React from 'react';

const Conversation = () => {
  let conversation = [
    {
      source: 'user',
      messages: ["Hello There, How are you ?", "Chi Game?", "wla mafikch"],
      time: "9:23 AM"
    },
    {
      source: 'friend',
      messages: ["Hey Wassup ?", "Give me 5 min , I will tell you"],
      time: "9:25 AM"
    },
    {
      source: 'user',
      messages: ["Key", "Tell me when Ready"],
      time: "9:27 AM"
    }
  ];

  let userProfilePicture = "/public/user.jpeg"

  return (
    <div className="h-2/3 flex-grow overflow-y-scroll flex flex-col space-y-2 p-6 text-gray-600">
      {conversation.map((conv, index) => (
        conv.messages.map((message, msgIndex) => (
          <div key={`${index}-${msgIndex}`} 
               className={`shadow-2xl shadow-indigo-700/50 pt-2 ${conv.source === 'user' ? 'self-end bg-gray-200' : 'self-start bg-linkColor'} rounded-2xl px-5 p-2 flex items-center`}>
            <p>{message}</p>
            <p style={{fontSize: '10px'}} className='pl-5 pt-5 opacity-60'>{conv.time}</p>
          </div>
        ))
      ))}
    </div>
  );
}

export default Conversation;