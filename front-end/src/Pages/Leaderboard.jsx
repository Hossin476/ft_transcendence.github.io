import React from 'react';
import "../leaderboard.css";
import GoldCard from '../Components/Leaderboard/GoldCard';
import SilverCard from '../Components/Leaderboard/SilverCard';
import BronzeCard from '../Components/Leaderboard/BronzeCard';
import Rank from '../Components/Leaderboard/Rank';

function Leaderboard() {
  return (
    <div className='mx-auto container_all flex flex-col justify-items-center m-auto'>
      <h1 className='text-6xl font-bold text-center relative leader '>LeaderBoard</h1>
      <div className='grid grid-cols-3 gap-10 relative card_container my-auto mx-auto'>
        <SilverCard />
        <GoldCard />
        <BronzeCard />
      </div>
      <Rank />
    </div>
  );
}

export default Leaderboard;

