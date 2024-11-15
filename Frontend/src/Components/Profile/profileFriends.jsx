import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import imgYns from "/public/lshail.jpeg";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Friend({ friend }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleFriendClick = () => {
        navigate(`/profile/${friend.id}`);
    }

  return (
    <div className="flex items-center self-center xl:self-auto justify-between">
      <div className="flex  items-center  lg:gap-4">
        <div className=" xsm:h-[2rem] xsm:w-[2rem] sm:w-[4rem] sm:h-[4rem] relative rounded-full">
          <img
            onClick={handleFriendClick}
            src={imgYns}
            alt="profile"
            className="w-full h-full object-cover rounded-full cursor-pointer"
          />
        </div>
        <div className="xsm:hidden xl:block">
          <h1 className="font-semibold">{friend.username} </h1>
          <p className="font-thin">{t("LEVEL")} {friend.xp / 100}</p>
        </div>
      </div>
      <div className="xsm:hidden xl:block">
        <AiOutlineUserAdd className="text-xl cursor-pointer" />
      </div>
    </div>
  );
}

async function getProfileData(tokens, userId){
    const response = await fetch(`/api/users/profile/friends/${userId}/`,{
        method : "GET",
        headers:{
            "Authorization": "JWT " + tokens.access,
            'Content-Type':'application/json',
        }
    })

    let data = await response.json()
    if(response.ok)
        return data
    return null
}

function Profile_friends({ user }) {
    const { t } = useTranslation();
    const { tokens, } = useAuth();
    const [friends, setFriends] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getProfileData(tokens, user);
            setFriends(() => data);
        };
        fetchData();
    }, [user]);
    
    return (
        <div className=" xsm:w-12 lg:w-74 xl:w-80 sm:w-28 md:w-32 lg:px-4 bg-secondaryColor rounded-3xl ">
        <div className="flex h-[5rem] xsm:justify-center items-center lg:justify-between">
            <h1 className="xsm:text-xsm  sm:text-xl sm:self-center">{t("Friends")}</h1>
            {/* <IoMdPersonAdd className="text-xl xsm:hidden lg:block" /> */}
        </div>
        <div className=" h-[calc(100%-5rem)] sm:items-center lg:items-stretch gap-y-4 flex flex-col overflow-scroll">
            {
                friends && friends.map((friend, index) => {
                    return <Friend key={index} friend={friend} />;
                })
            }
        </div>
        </div>
    );
}

export default Profile_friends;
