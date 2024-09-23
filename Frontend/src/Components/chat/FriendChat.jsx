import React, { useState, useContext } from "react";
import img from "/user.jpeg";
import ChatContext from "../../context/ChatContext";
import { useEffect } from "react";

export default function FriendChat({ contacts, handleOnClick, selected }) {
  const { count, setCount } = useContext(ChatContext);
  function timeConverter(timestamp) {
    const a = new Date(timestamp);
    const hour = a.getHours();
    const min = a.getMinutes();

    if (hour < 12) {
      return hour + ":" + min + " AM";
    }
    const Newhour = hour - 12;
    return Newhour + ":" + min + " PM";
  }

  const contactCount = count.find((item) => item.id === contacts.user.id);
  return (
    <>
      <span
        onClick={() => handleOnClick(contacts)}
        className={`flex justify-between text-shadow-2xl my-2 items-center p-3 ${
          contacts.id === selected ? "bg-gradient-to-r from-linkColor" : ""
        } hover:bg-white hover:bg-opacity-20`}
        style={{ cursor: "pointer" }}
      >
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 rounded-full relative">
            <img className="w-full rounded-full" src={img} alt="" />
            <span
              className={`w-4 h-4 right-0 bottom-0 rounded-full ${
                contacts.id ? "bg-green-500" : "bg-gray-500"
              } absolute`}
            ></span>
          </div>
          <div>
            <p className="text-base">{contacts.user.username}</p>
            <p className="text-sm font-thin opacity-70">
              {contacts.last_msg.content}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {timeConverter(contacts.last_msg.created_at)
          }
          {contacts.last_msg.sendId === contacts.user.id &&
            (contactCount && contactCount.count > 0 ? (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-6 mt-1">
                {contactCount.count + contacts.count}
              </span>
            ) : contacts.count > 0 ? (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-6 mt-1">
                {contacts.count}
              </span>
            ) : (
              ""
            ))}
        </div>
      </span>
    </>
  );
}
