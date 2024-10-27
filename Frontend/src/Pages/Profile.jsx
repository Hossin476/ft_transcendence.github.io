import React from "react";
import { RiFileCopy2Line } from "react-icons/ri";
import imgProfile from "/public/avatar/sbzizal.jpeg";
import imgBanner from "/public/cover.jpg";
import imgYns from "/public/lshail.jpeg";
import { MdBlock } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";
import { CgUnblock } from "react-icons/cg";
import { AiOutlineUserAdd } from "react-icons/ai";
// import Friend from "../Components/Dashboard/Friend";

function Profile_info() {

  const [IsFriend, setIsFriend] = React.useState(false);
  const [IsBlocked, setIsBlocked] = React.useState(false);

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
            <button 
              onClick={() => setIsFriend(!IsFriend)}
              className={IsFriend ? "bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-400 transition-colors xsm:text-sm md:text-base w-36"
              : "bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36"}>
              {IsFriend ? <IoPersonRemove/> : <IoPersonAdd/>}
              <span className="text-[0.9em]">
                {IsFriend ? "Unfriend" : "Add friend"}
              </span>
            </button>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36">
            <BsChatDotsFill />
            <span className="text-[0.9em]">
              Message
            </span>
            </button>
            <button 
            onClick={() => setIsBlocked(!IsBlocked)}
            className={IsBlocked ? "bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36"
             : "bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-red-400 transition-colors xsm:text-sm md:text-base w-36"}>
            {/* className="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors xsm:text-sm md:text-base w-36"> */}
            {IsBlocked ? <CgUnblock className="h-5 w-5"/> : <MdBlock className="h-5 w-5"/>}
            <span className="text-[0.9em]">
              {IsBlocked ? "Unblock" : "Block"}
            </span>
            </button>
          </div>
      </div>
    </div>
  );
}

function Match_victory() {
  return (
    <div className=" xsm:h-24 sm:h-36 flex xsm:px-2 sm:px-3  rounded-xl my-4 items-center xsm:gap-x-2 sm:gap-x-8 justify-between w-full bg-MatchVictory opacity-90 bg-green-800">
        <hr  className=" xsm:h-12 sm:h-24 w-2 rounded-2xl  bg-green-400"/>
        <div className="flex justify-between xsm:gap-x-4 grow xsm:px-0.5 items-center sm:flex-1 ">
            <div className="flex flex-col items-center">
                <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20 ">
                    <img
                    src={imgProfile}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <h3 className="xsm:text-xs sm:text-lg">KIRAZIZI</h3>
            </div>
            <div className="flex flex-col sm:gap-y-2">
                <h2 className=" xsm:text-xs sm:text-lg font-light  text-MatchText">VICTORY</h2>
                <p className="xsm:text-xs sm:text-md">08 - 05</p>
                <h2 className="xsm:text-xs sm:text-lg font-light text-MatchText">PING PONG</h2>
            </div>
            <div className="flex flex-col items-center">
                <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20">
                <img
                    src={imgYns}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                />
                </div>
                <h3 className="xsm:text-xs sm:text-lg">KIRAZIZI</h3>
            </div>
        </div>
    </div>
  );
}

function Match_defeat() {
  return (
    <div className=" xsm:h-24 sm:h-36 flex xsm:px-2 sm:px-3  rounded-xl my-4 items-center xsm:gap-x-2 sm:gap-x-8 justify-between w-full bg-MatchVictory opacity-90 bg-red-800">
        <hr  className=" xsm:h-12 sm:h-24 w-2 rounded-2xl  bg-red-400"/>
        <div className="flex justify-between xsm:gap-x-4 grow xsm:px-0.5 items-center sm:flex-1 ">
            <div className="flex flex-col items-center">
                <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20">
                    <img
                    src={imgProfile}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="xsm:text-xs sm:text-lg">KIRAZIZI</h3>
            </div>
            <div className="flex flex-col sm:gap-y-2">
                <h2 className=" xsm:text-xs sm:text-lg font-light  text-MatchText">DEFEAT</h2>
                <p className="xsm:text-xs sm:text-md">08 - 05</p>
                <h2 className="xsm:text-xs sm:text-lg font-light text-MatchText">PING PONG</h2>
            </div>
            <div className="flex flex-col items-center">
                <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20">
                    <img
                    src={imgYns}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="xsm:text-xs sm:text-lg">KIRAZIZI</h3>
            </div>
        </div>
    </div>
  );
}

function Profile_history() {
  return (
    <div className="bg-secondaryColor text-center p-6  rounded-3xl grow">
        <h2 className="text-4xl font-semibold mb-8">Match History</h2>
        <div className="h-5/6 overflow-scroll ">
            <Match_victory/>
            <Match_victory/>
            <Match_defeat/>
            <Match_defeat/>
            <Match_victory/>

        </div>
    </div>
  );
}

function Friend() {
  return (
    <div  className="flex justify-between my-2 center">
        <div className="flex xsm:gap-0 xl:gap-4 center">
            <div className=" xsm:w-6 xsm:h-6 w-8 h-8 xl:w-16 xl:h-16 rounded-full border relative ">
                <img className="w-full rounded-full " src={imgYns} alt="" />
                <span className=" w-2 h-2 xl:w-4 xl:h-4 right-0 top-0 rounded-full bg-green-500 absolute"></span>
            </div>
            <div className=" xsm:hidden xl:block self-center">
                <p className="text-xl">solahfaat</p>
                <p className="text-xs font-thin">level 3</p>
            </div>
        </div>
        <div className=" xsm:hidden xl:block self-center text-xl">
           <AiOutlineUserAdd />
        </div>
    </div>
  );
}

function Profile_friends() {
    return (
        <div className="bg-secondaryColor rounded-3xl xsm:w-12 sm:w-16 xl:w-4/5 h-2/5 xl:h-full xl:p-5">
            <h3 className=" xsm:hidden xl:block text-center text-2xl">Friends</h3>
            <hr className="w-4/5 center mx-auto my-4 xl:my-8"/>
            <div className=" xsm:1/5 xsm:h-1/3 sm:h-2/5 pt-4 xsm:px-1 xl:px-4">
                <div className="h-full xsm:flex xsm:flex-col xl:block xsm:items-center overflow-y-scroll">
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                    <Friend />
                </div>
            </div>

        </div>
    );
}

function Profile() {
  return (
    <div className="text-white flex flex-1">
      <div className="flex flex-col flex-1  lg:pb-8 md:pl-12  gap-y-4 gap-x-16 xsm:p-`2 ">
        <Profile_info />
        <div className="flex lg:flex-1  xsm:h-1/2 md:h-3/5 lg:h-2/4 gap-x-8 ">
          <Profile_history />
        </div>
      </div>
      <div className="xsm:w-16 lg:w-74 xl:w-96  sm:w-28 md:w-32  xsm:items-end   py-8 flex xsm:flex-col  xsm:pr-2  xl:flex-row xl:justify-end sm:pr-4 xl:items-center  2xl:w-96 fade-in">
        <Profile_friends />
      </div>
    </div>
  );
}

export default Profile;
