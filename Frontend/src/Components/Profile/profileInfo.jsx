import React from "react";
import { MdBlock } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";
import { CgUnblock } from "react-icons/cg";
import { RiFileCopy2Line } from "react-icons/ri";
import imgBanner from "/public/cover.jpg";
import imgProfile from "/public/avatar/sbzizal.jpeg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Profile_info({ userid }) {
  const [IsFriend, setIsFriend] = React.useState(false);
  const [IsBlocked, setIsBlocked] = React.useState(false);
  const { user, socket } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const handleChatRedirect = () => {
    navigate("/chat", {
      state: {
        navigatedUser: userid?.username
      }
    })
  }

  function request_friendship() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        "type": "friend_request",
        "receiver": userid?.username
      })
      socket.send(message);
    }
  }

  return (
    <div className="bg-secondaryColor flex flex-col rounded-3xl md:h-96 xsm:h-96 gap-4 overflow-hidden">
      {/* Banner Section with Overlapping Profile */}
      <div className="relative">
        {/* Banner Image */}
        <div className="h-36">
          <img
            src={imgBanner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Profile Picture - Positioned to overlap */}
        <div className="absolute -bottom-16 left-6 xsm:w-20 xsm:h-20 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:h-40 xl:w-40 flex items-center justify-center">
          <div className="xsm:text-xs sm:left-1/4 -bottom-2 xsm:w-16 text-center p-1 absolute z-50 bg-gray-300 xsm:rounded-3xl md:rounded-3xl border-black border-2 text-black">
            {t("LEVEL")} {userid?.xp / 100}
          </div>
          <div className="rounded-full border-thirdColor border-[8px] overflow-hidden relative z-20 xsm:w-16 xsm:h-16 md:w-28 md:h-28 lg:w-32 lg:h-32">
            <img
              src={imgProfile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Section - Adjusted spacing to account for overlapping profile */}
      <div className="flex flex-1 mt-14 px-6">
        <div className="flex-1 flex xsm:p-1 sm:p-4 flex-col h-full xsm:justify-center md:justify-around gap-y-8 lg:justify-between">
          {/* Profile name */}
          <div className="flex justify-between">
            <div>
              <h2 className="xsm:text-xs sm:text-sm md:text-lg xl:text-4xl font-semibold">
                {userid?.username}
              </h2>
              <h3 className="font-xs xsm:text-xs lg:text-sm flex gap-x-1 items-center text-gray-300">
                ID {userid?.id}
                <span className="text-sm cursor-pointer hover:text-gray-400">
                  <RiFileCopy2Line />
                </span>
              </h3>
            </div>
            {/* 1st */}
            <div>
              <h2 className="text-center xsm:text-sm md:text-lg lg:text-2xl xl:text-4xl font-semibold relative">
                {userid?.rank}
                <span className="absolute top-0 xsm:text-xs md:text-xs lg:text-sm xl:text-lg">
                  ST
                </span>
              </h2>
              <p className="md:text-xs lg:text-xl xsm:text-xs xl:text-2xl font-semibold">
                {t("season")} 1
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div
                className={`w-[${userid?.xp}%] h-2 bg-forthColor rounded-full`}
              ></div>
            </div>
            <span className="absolute xsm:bottom-3 md:bottom-5 left-2 text-sm xsm:text-xs">
              {100 - userid?.xp} XP {t("TO GO")}
            </span>
            <span className="absolute text-sm right-3 xsm:bottom-3 md:bottom-5 xsm:text-xs">
              {t("LEVEL")} 3
            </span>
          </div>
        </div>
        {/* Add friend and Message buttons */}
        {
          user.user_id === userid?.id ? null :
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setIsFriend(!IsFriend)}
                className={
                  IsFriend
                    ? "bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-400 transition-colors xsm:text-sm md:text-base w-36"
                    : "bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36"
                }
              >
                {IsFriend ? <IoPersonRemove /> : <IoPersonAdd />}
                <span className="text-[0.9em]">
                  {IsFriend ? "Unfriend" : "Add friend"}
                </span>
              </button>
              <button onClick={handleChatRedirect} className="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36">
                <BsChatDotsFill />
                <span className="text-[0.9em]">{t("Message")}</span>
              </button>
              <button
                onClick={() => setIsBlocked(!IsBlocked)}
                className={
                  IsBlocked
                    ? "bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36"
                    : "bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-400 transition-colors xsm:text-sm md:text-base w-36"
                }
              >
                {IsBlocked ? (
                  <CgUnblock className="h-5 w-5" />
                ) : (
                  <MdBlock className="h-5 w-5" />
                )}
                <span className="text-[0.9em]">
                  {IsBlocked ? t("Unblock") : t("Block")}
                </span>
              </button>
            </div>
        }
      </div>
    </div>
  );
}

export default Profile_info;
