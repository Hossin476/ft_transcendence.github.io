import React from 'react';
import "../leaderboard.css";
import GoldCard from '../Components/Leaderboard/GoldCard';
import SilverCard from '../Components/Leaderboard/SilverCard';
import BronzeCard from '../Components/Leaderboard/BronzeCard';
import Rank from '../Components/Leaderboard/Rank';

function Leaderboard() {
  return (
    <div className='mx-auto p-4 container_all'>
      <h1 className='text-6xl font-bold text-center relative top-6 leader '>LeaderBoard</h1>
      <div className='flex flex-wrap justify-evenly relative top-36 card_container'>
        <SilverCard />
        <GoldCard />
        <BronzeCard />
      </div>
      <Rank />
    </div>
  );
}

export default Leaderboard;

