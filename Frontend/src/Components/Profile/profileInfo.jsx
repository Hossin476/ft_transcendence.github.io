import React from "react";
import { MdBlock } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";
import { CgUnblock } from "react-icons/cg";
import { RiFileCopy2Line } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Profile_info({ userid }) {
  const [friendshipStatus, setFriendshipStatus] = React.useState({
    exists: false,
    status: null,
    fromUser: null,
    toUser: null,
  });

  const [blockStatus, setBlockStatus] = React.useState({
    block : false,
    blocker : null,
    blocked : null
  })
  const { user, socket, tokens, username, customFetch } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userXp = userid?.xp % 100;
  const xp = 100 - userXp;

  const handleChatRedirect = () => {
    navigate("/chat", {
      state: {
        navigatedUser: userid?.username,
      },
    });
  };

  function sendFriendRequest() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "friend_request",
        receiver: userid?.username,
      });
      socket.send(message);
      setFriendshipStatus({
        exists: true,
        status: "P",
        fromUser: username,
        toUser: userid?.username,
      });
    }
  }

  function acceptFriendRequest() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "friend_accept",
        receiver: userid?.username,
      });
      socket.send(message);
      setFriendshipStatus({
        exists: true,
        status: "A",
        fromUser: username,
        toUser: userid?.username,
      });
    }
  }

  function unfriend_request() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "unfriend_request",
        receiver: userid?.username,
      });
      socket.send(message);
      setFriendshipStatus({
        exists: false,
        status: null,
        fromUser: null,
        toUser: null,
      });
    }
  }

  function block_request() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "block_request",
        receiver: userid?.username,
      });
      socket.send(message);
      setFriendshipStatus({
        exists: false,
        status: null,
        fromUser: null,
        toUser: null,
      });
      setBlockStatus({
        block: true,
        blocker: username,
        blocked: userid?.username,
      });
    }
  }

  function unblock_request() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "unblock_request",
        receiver: userid?.username,
      });
      socket.send(message);
      setBlockStatus({
        block: false,
        blocker: null,
        blocked: null,
      });
    }
  }

  async function checkFriendStatus() {
    try {

      const response = await customFetch(`/api/notification/check_friendship/${userid?.id}/`, {
        method: "GET",
        headers: {
          Authorization: "JWT " + tokens.access,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFriendshipStatus({
          exists: data.friendship_exists,
          status: data.status,
          fromUser: data.from_user,
          toUser: data.to_user,
        });
      }
    } catch (error) {
    }
  }

  async function checkBlockStatus() {
    try {
      const response = await customFetch(`/api/notification/check_blocked/${userid?.id}/`, {
        method: "GET",
        headers: {
          Authorization: "JWT " + tokens.access,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlockStatus({
          block: data.block,
          blocker: data.blocker,
          blocked: data.blocked,
        });
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    if (userid?.id) {
      checkFriendStatus();
      checkBlockStatus();
    }
  }, [userid?.id]);

  const renderFriendButton = () => {
    if (!friendshipStatus.exists) {
      return (
        <button
          onClick={sendFriendRequest}
          className="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36"
        >
          <IoPersonAdd />
          <span className="text-[0.9em]">{t("Add friend")}</span>
        </button>
      );
    }

    if (friendshipStatus.status === "P") {
      if (friendshipStatus.fromUser === username) {
        return (
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-yellow-400 transition-colors xsm:text-sm md:text-base w-36">
            <IoPersonRemove />
            <span className="text-[0.9em]">{t("Pending")}</span>
          </button>
        );
      } else {
        return (
          <button
            onClick={acceptFriendRequest}
            className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-green-400 transition-colors xsm:text-sm md:text-base w-36"
          >
            <IoPersonAdd />
            <span className="text-[0.9em]">{t("Accept")}</span>
          </button>
        );
      }
    }

    if (friendshipStatus.status === "A") {
      return (
        <button
          onClick={unfriend_request}
          className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-400 transition-colors xsm:text-sm md:text-base w-36"
        >
          <IoPersonRemove />
          <span className="text-[0.9em]">{t("Unfriend")}</span>
        </button>
      );
    }
  };

  const renderBlockButton = () => {
    if (blockStatus.block) {
      return (
        <button
          onClick={unblock_request}
          className="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36"
        >
          <CgUnblock className="h-5 w-5" />
          <span className="text-[0.9em]">{t("Unblock")}</span>
        </button>
      );
    }

    if (!blockStatus.block) {
      return (
        <button
          onClick={block_request}
          className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-400 transition-colors xsm:text-sm md:text-base w-36"
        >
          <MdBlock className="h-5 w-5" />
          <span className="text-[0.9em]">{t("Block")}</span>
        </button>
      );
    }
  };


  return (
    <div className="bg-secondaryColor flex flex-col rounded-3xl md:h-96 xsm:h-96 gap-4 overflow-hidden">
      <div className="relative">
        <div className="h-36">
          <img
            src={userid?.background_image}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-6 xsm:w-20 xsm:h-20 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:h-40 xl:w-40 flex items-center justify-center">
          <div className="xsm:text-xs sm:left-1/4 -bottom-2 xsm:w-16 text-center p-1 absolute z-50 bg-gray-300 xsm:rounded-3xl md:rounded-3xl border-black border-2 text-black">
            {t("LEVEL")} {userid?.rank}
          </div>
          <div className="rounded-full border-thirdColor border-[8px] overflow-hidden relative z-20 xsm:w-16 xsm:h-16 md:w-28 md:h-28 lg:w-32 lg:h-32">
            <img
              src={userid?.profile_image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 mt-14 px-6">
        <div className="flex-1 flex xsm:p-1 sm:p-4 flex-col h-full xsm:justify-center md:justify-around gap-y-8 lg:justify-between">
          <div className="flex justify-between">
            <div>
              <h2 className="xsm:text-xs sm:text-sm md:text-lg xl:text-4xl font-semibold">
                {userid?.username}
              </h2>
              <h3 className="font-xs xsm:text-xs lg:text-sm flex gap-x-1 items-center text-gray-300">
                ID {userid?.id}
                <span className="text-sm cursor-pointer hover:text-gray-400">
                  <RiFileCopy2Line
                    onClick={() => navigator.clipboard.writeText(userid?.id)}
                   />
                </span>
              </h3>
            </div>
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

          <div className="relative">
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div
                style={{ width: userXp + "%" }}
                className={` h-2 bg-forthColor rounded-full`}
              ></div>
            </div>
            <span className="absolute xsm:bottom-3 md:bottom-5 left-2 text-sm xsm:text-xs">
              {xp} XP {t("TO GO")}
            </span>
            <span className="absolute text-sm right-3 xsm:bottom-3 md:bottom-5 xsm:text-xs">
              {t("LEVEL")} {userid?.rank + 1}
            </span>
          </div>
        </div>
        {user.user_id == userid?.id ? null : (
          <div className="flex flex-col gap-2">
            {blockStatus.block ? (
              <button
                className="bg-gray-800 text-gray-600 px-6 py-2 rounded-full flex items-center gap-2 xsm:text-sm md:text-base w-36"
                disabled
              >
                <IoPersonAdd />
                <span className="text-[0.9em]">{t("Add friend")}</span>
              </button>
            ) : (
              renderFriendButton()
            )}
            {friendshipStatus.status === "A" ? (
              <button
                onClick={handleChatRedirect}
                className="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36"
              >
                <BsChatDotsFill />
                <span className="text-[0.9em]">{t("Message")}</span>
              </button>
            ) : (
              <button
                className="bg-gray-800 text-gray-600 px-6 py-2 rounded-full flex items-center gap-2 xsm:text-sm md:text-base w-36"
                disabled
              >
                <BsChatDotsFill />
                <span className="text-[0.9em]">{t("Message")}</span>
              </button>
            )}
            {renderBlockButton()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile_info;
