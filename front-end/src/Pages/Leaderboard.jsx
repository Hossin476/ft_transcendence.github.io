import React from 'react';
import "../leaderboard.css";
import GoldCard from '../Components/Leaderboard/GoldCard';
import SilverCard from '../Components/Leaderboard/SilverCard';
import BronzeCard from '../Components/Leaderboard/BronzeCard';
import Rank from '../Components/Leaderboard/Rank';

function Leaderboard() {
  return (
    <div className='m-auto container_all flex flex-col '>
      <h1 className='lg:text-6xl md:text-3xl sm:text-xs font-bold text-center leader'>LeaderBoard</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-3 gap-5 card_container my-auto mx-20'>
        <SilverCard />
        <GoldCard />
        <BronzeCard />
      </div>
      <Rank />
    </div>
  );
}

export default Leaderboard;