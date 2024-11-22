import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Profile_info from "../Components/Profile/profileInfo";
import Profile_history from "../Components/Profile/profileHistory";
import Profile_friends from "../Components/Profile/profileFriends";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

async function getProfileData(tokens, userId, customFetch) {
  const response = await customFetch(`/api/users/profile/${userId}/`, {
    method: "GET",
    headers: {
      Authorization: "JWT " + tokens.access,
    },
  });

  if (response.status !== 200) {
    throw new Error("User not found");
  }

  let data = await response.json();
  if (response.ok) return data;
  return null;
}

function Profile() {
  const navigate = useNavigate();
  let user_id = useParams();
  user_id = user_id.id;
  const { tokens, customFetch } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await getProfileData(tokens, user_id, customFetch);
        setProfileData(() => data);
      } catch (error) {
        navigate("/notfound");
      }
    };
    fetchData();
  }, [user_id, tokens, navigate]);

  return (
    <div className="h-full flex justify-center xsm:pl-2 xsm:py-2 xsm:gap-2  sm:pl-4  sm:gap-4 ">
      <div className="flex flex-col flex-1  md:pl-12  gap-y-4 gap-x-16 xsm:p-`2">
        {<Profile_info userid={profileData} />}
        <div className="flex lg:flex-1  xsm:h-1/2 md:h-3/5 lg:h-2/4 gap-x-8 ">
          <Profile_history user={user_id} />
        </div>
      </div>
      <Profile_friends user={user_id} />
    </div>
  );
}

export default Profile;
