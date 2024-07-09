import React from 'react';
import "../leaderboard.css";
import GoldCard from '../Components/Leaderboard/GoldCard';
import SilverCard from '../Components/Leaderboard/SilverCard';
import BronzeCard from '../Components/Leaderboard/BronzeCard';
import Rank from '../Components/Leaderboard/Rank';

function Leaderboard() {
  return (
    <div className='m-auto container_all flex flex-col'>
      <h1 className='text-6xl font-bold text-center leader '>LeaderBoard</h1>
      <div className='grid grid-cols-3 gap-10 card_container my-auto mx-10'>
        <SilverCard />
        <GoldCard />
        <BronzeCard />
      </div>
      <Rank />
    </div>
  );
}

export default Leaderboard;