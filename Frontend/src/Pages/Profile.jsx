import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Profile_info from "../Components/Profile/profileInfo";
import Profile_history from "../Components/Profile/profileHistory";
import Profile_friends from "../Components/Profile/profileFriends";
import { useParams } from "react-router-dom";

async function getProfileData(tokens, userId){
  const response = await fetch(`http://localhost/api/users/profile/${userId}/`,{
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

function Profile() {
  let user_id = useParams();
  user_id = user_id.id;
  const {tokens} = useAuth()
  const [profileData,setProfileData] = useState(null)
  const D404 = {
    username: "404",
    rank: "1",
    xp: 40400,
  };
  useEffect(()=>{
      const fetchData = async ()=> {
          try {
            let data = await getProfileData(tokens, user_id)
            setProfileData(()=>data)
          }
          catch (e) {
            console.log("Failed to fetch profile data:", e)
            setProfileData(D404)
          }
      }
      fetchData()
  } ,[user_id])

  return (
    <div className="h-screen w-full flex justify-center xsm:pl-2 xsm:py-2 xsm:gap-2  sm:pl-4  sm:gap-4 ">
      <div className="flex flex-col flex-1  md:pl-12  gap-y-4 gap-x-16 xsm:p-`2">
        {
          <Profile_info userid={profileData} />
        }
        <div className="flex lg:flex-1  xsm:h-1/2 md:h-3/5 lg:h-2/4 gap-x-8 ">
          <Profile_history user={user_id} />
        </div>
      </div>
        <Profile_friends user={user_id} />
    </div>
  );
}

export default Profile;
