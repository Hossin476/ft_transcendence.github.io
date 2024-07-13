import React from 'react';
import "../leaderboard.css";
import GoldCard from '../Components/Leaderboard/GoldCard';
import SilverCard from '../Components/Leaderboard/SilverCard';
import BronzeCard from '../Components/Leaderboard/BronzeCard';
import Rank from '../Components/Leaderboard/Rank';
import data from "../test.json";

function Leaderboard({ data}) {
  return (
    <div className=' container_leaderboard flex flex-col w-11/12 mx-auto h-11/12 my-auto'>
      <h1 className='lg:text-4xl md:text-4xl sm:text-md text-center h-1/6 leader flex justify-center items-center'>LeaderBoard</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-3 gap-5 card_container my-auto mx-20 sm:overflow-auto md:overflow-hidden lg:overflow-hidden'>
        <SilverCard  data={data} />
        <GoldCard />
        <BronzeCard />
      </div>
      <Rank />
    </div>
  );
}

export default Leaderboard;