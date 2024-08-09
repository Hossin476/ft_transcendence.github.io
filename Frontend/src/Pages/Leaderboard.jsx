import React from 'react';
import "../leaderboard.css";
import GoldCard from '../Components/Leaderboard/GoldCard';
import SilverCard from '../Components/Leaderboard/SilverCard';
import BronzeCard from '../Components/Leaderboard/BronzeCard';
import Rank from '../Components/Leaderboard/Rank';

function Leaderboard({ data }) {
  return (
    <div className="container_tournament bg-primaryColor w-full grid grid-rows-1 justify-items-center items-center">
      <div className="flex items-center justify-center w-11/12 h-full ">
        <div className='border border-forthColor lg:w-11/12 md:w-11/12  w-full text-white flex flex-col items-center justify-center h-5/6 bg-secondaryColor rounded-3xl'>
          <h1 className='lg:text-4xl md:text-4xl sm:text-2xl xsm:text-2xl text-center leader w-full flex justify-center items-center h-[15%]'>LEADERBOARD</h1>
          <div className="flex justify-center items-center h-[70%] w-full flex-col">
            <div className=" w-full flex h-full flex-col items-center justify-center">
              <div className="grid grid-cols-3 h-full max-h-[60vh] w-[90%] gap-5 items-center justify-center">
                <SilverCard data={data} />
                <GoldCard />
                <BronzeCard />
              </div>
            </div>
          </div>
          <Rank />
        </div>
      </div>
    </div >
  );
}

export default Leaderboard;