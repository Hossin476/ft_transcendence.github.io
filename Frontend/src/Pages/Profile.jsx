import React from "react";
import "./Profile.css";
import FriendsBar from "../Components/Dashboard/FriendsBar";
import MatchHistory from "../Components/Dashboard/MatchHistory";
import { RiFileCopy2Line } from "react-icons/ri";
import imgProfle from "/public/avatar/sbzizal.jpeg";
import imgBanner from "/public/cover.jpg";

function Profile_info() {
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
          <div className="xsm:text-xs lg:left-1/4 -bottom-2 xsm:w-16 text-center p-1 absolute z-50 bg-gray-300 xsm:rounded-3xl md:rounded-3xl border-black border-2 text-black">
            LEVEL 3
          </div>
          <div className="rounded-full border-thirdColor border-[8px] overflow-hidden relative z-20 xsm:w-16 xsm:h-16 md:w-28 md:h-28 lg:w-32 lg:h-32">
            <img
              src={imgProfle}
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
                KIRA
              </h2>
              <h3 className="font-xs xsm:text-xs lg:text-sm flex gap-x-1 items-center text-gray-300">
                ID 55101312312
                <span className="text-sm cursor-pointer hover:text-gray-400">
                  <RiFileCopy2Line />
                </span>
              </h3>
            </div>
            {/* 1st */}
            <div>
              <h2 className="text-center xsm:text-sm md:text-lg lg:text-2xl xl:text-4xl font-semibold relative">
                1
                <span className="absolute top-0 xsm:text-xs md:text-xs lg:text-sm xl:text-lg">
                  ST
                </span>
              </h2>
              <p className="md:text-xs lg:text-xl xsm:text-xs xl:text-2xl font-semibold">
                season 3
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="w-full h-4 xsm:h-2 bg-white rounded-full">
              <div className="h-full w-5/6 bg-thirdColor rounded-full"></div>
            </div>
            <span className="absolute xsm:bottom-3 md:bottom-5 left-2 text-sm xsm:text-xs">
              20XP TO GO
            </span>
            <span className="absolute text-sm right-3 xsm:bottom-3 md:bottom-5 xsm:text-xs">
              LEVEL 3
            </span>
          </div>
        </div>
        {/* Add friend and Message buttons */}
        <div className="flex flex-col gap-2">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              Add friend
            </button>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              Message
            </button>
          </div>
      </div>
    </div>
  );
}

function Profile_history() {
  return (
    <>
      <div className="profile_history"></div>
    </>
  );
}

function Profile_friends() {
  return (
    <>
      <div className="profile_friends"></div>
    </>
  );
}

function Profile() {
  return (
    <div className="text-white flex flex-1">
      <div className="flex flex-col flex-1  lg:pb-8 md:pl-12  gap-y-4 gap-x-16 xsm:p-2 ">
        <Profile_info />
        <div className="flex lg:flex-1  xsm:h-1/2 md:h-3/5 lg:h-2/4 gap-x-8 ">
          <MatchHistory />
        </div>
      </div>
      <div className="xsm:w-16 lg:w-74 xl:w-96  sm:w-28 md:w-32  xsm:items-end   py-8 flex xsm:flex-col  xsm:pr-2  xl:flex-row xl:justify-end sm:pr-4 xl:items-center  2xl:w-96 fade-in">
        <FriendsBar />
      </div>
    </div>
  );
}

export default Profile;
