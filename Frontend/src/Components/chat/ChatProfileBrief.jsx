import React, { use, useContext, useEffect, useMemo } from "react";
import ChatContext from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from 'react-hot-toast'

const FriendHero = () => {
  const { currantUser } = useContext(ChatContext);

  let friend = {
    profilePicture: currantUser.user.profile_image,
    coverPicture: currantUser.user.cover_image,
    name: currantUser && currantUser.user.username,
    id: "LEVEL : " + currantUser.user.rank,
    alt: "alt",
  };


  return (
    <div className="h-[40%]">
      <div className=" w-full flex center  justify-center relative">
        <img
          src={friend.coverPicture}
          alt={friend.alt}
          className="relative flex rounded-t-3xl"
        />
        <img
          src={friend.profilePicture}
          alt={friend.alt}
          className="absolute translate-y-14 w-28 h-28 object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center  mt-20">
        <p className="text-xl text-white">{friend.name}</p>
        <p className="font-thin text-xs text-white opacity-70">{friend.id}</p>
      </div>
    </div>
  );
};
const GameInvite = () => {

  const { t } = useTranslation();
  const { currantUser } = useContext(ChatContext);
  const {socket} = useAuth()
  const handlInvite = (gameType)=> {
    if(socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'game_request',
        receiver: currantUser.user.username,
        game: gameType
      }))
     }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <p className="text-white self-start ml-12 lg:text-2xl font-bold">
        {t("Invite To Play")}
      </p>
      <hr className="w-5/6  bg-white my-1 h-px border-0" />
      <div className="m-5 flex justify-center">
        <div className="grid grid-cols-2 gap-2 place-items-center">
          <button
            onClick={()=>handlInvite('P')}
            type="button"
            className="rounded-full p-3 py-2  border border-1 border-white bg-white bg-opacity-40 lg:text-lg text-white"
          >
            Ping Pong
          </button>
          <button
            type="button"
            onClick={()=>handlInvite('T')}
            className="rounded-full p-3 py-2 border border-1 border-white bg-white bg-opacity-40 lg:text-lg text-white"
          >
            Tic Tac Toe
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageFriendShip = ({user_id}) => {
  const { currantUser } = useContext(ChatContext);
  const { chatsocket, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleFriendClick = () => {
    navigate(`/profile/${user_id}`);
  }

  const handlBlock = () => {
    if (chatsocket) {
      chatsocket.send(
        JSON.stringify({
          type: "block",
          blocker: user.user_id,
          blocked: currantUser.user.id,
          friendship: currantUser.id,
        })
      );
    }
  };
  return (
    <div className="flex flex-col justify-center  items-center mt-2">
      <p className="text-white self-start ml-12 font-bold lg:text-2xl">
        {t("General")}
      </p>
      <hr className="w-5/6 bg-white my-1 h-px border-0" />
      <div className="m-5 flex justify-center">
        <div className="grid grid-rows-2 gap-3 place-items-center">
          <button
            onClick={handleFriendClick}
            type="button"
            className="rounded-full  py-2 w-32 px-2 border border-1 border-white bg-white bg-opacity-40 lg:text-lg text-white"
          >
            {t("view profile")}
          </button>
          <button
            onClick={() => handlBlock()}
            type="button"
            className="rounded-full w-32 py-2 px-8 border border-1 border-white bg-white bg-opacity-40 lg:text-lg text-white"
          >
            {t("Block")}
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatProfileBrief = () => {
  const { currantUser, blocker, conversation } = useContext(ChatContext);
  const { user, chatsocket } = useAuth();
  const handleUnblock = () => {
    if (chatsocket) {
      chatsocket.send(
        JSON.stringify({
          type: "unblock",
          blocked: currantUser.user.id,
          friendship: currantUser.id,
          blockUser: currantUser.block_user,
        })
      );
    }
  };

  return useMemo(() => {
    return (
      currantUser && (
        <div className="xsm:hidden xl:block h-[90%] bg-secondaryColor flex flex-col rounded-3xl w-80">
          <FriendHero />
          {blocker ? (
            blocker.id === user.user_id ? (
              <div className="flex justify-center">
                <button
                  onClick={handleUnblock}
                  className="px-4 py-2 border rounded-full text-lg"
                >
                  unblock{" "}
                </button>
              </div>
            ) : (
              ""
            )
          ) : (
            <div className=" flex-1  gap-y-12 flex flex-col ">
              <GameInvite />
              <ManageFriendShip user_id={currantUser.user.id} />
            </div>
          )}
        </div>
      )
    );
  }, [currantUser, blocker, conversation]);
};

export default ChatProfileBrief;
