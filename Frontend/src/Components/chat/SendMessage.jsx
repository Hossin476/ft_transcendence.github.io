import React from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const SendMessage = () => {
  return (
    <div className="flex-none p-5">
      <div className="relative flex">
        <div className="relative flex w-full">
          <button className="absolute pl-3 inset-y-0 left-8 flex items-center">
            <MdEmojiEmotions size="24px" color="#BC9FD1"/>
          </button>
          <button className="absolute pl-3 inset-y-0 left-0 flex items-center">
            <MdOutlineAddPhotoAlternate size="24px" color="#BC9FD1"/>
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full text-gray-600 placeholder-linkColor pl-20 bg-gray-100 rounded-full py-3 pr-5 focus:ring-2 focus:ring-linkColor"
          />
          <button className="absolute inset-y-0 right-6 flex items-center pl-3">
            <RiSendPlaneFill size="28px" color="#BC9FD1"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;