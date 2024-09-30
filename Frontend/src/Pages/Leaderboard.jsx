import React, { useState, useEffect } from 'react'
import Leaders from '../Components/Leaderboard/Leaders'
import { useAuth } from '../context/AuthContext'
import FullLeaderboard from '../Components/Leaderboard/FullLeaderboard'
import Switchers from '../Components/Leaderboard/Switchers'

export default function Leaderboard() {
  const [activeGame, setActiveGame] = useState('Tic Tac Toe')
  const [leaderboardData, setLeaderboardData] = useState([])
  const { tokens } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8000/api/notification/leaderboard/?game=${activeGame}`, {
          headers: {
            "Authorization": "JWT " + tokens.access,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setLeaderboardData(data);

      } catch (error) {
        console.error('Fetch failed: ', error);
      }
    }
    fetchData();
  }, [activeGame, tokens?.access])

  return (
    <div className="bg-primaryColor w-full grid grid-rows-1 justify-items-center items-center">
      <div className="flex items-center justify-center w-11/12 h-full ">
        <div className='border border-forthColor overflow-auto lg:w-11/12 md:w-full sm:w-full bg-gray-800 text-white p-6 w-full text-white flex flex-col h-5/6 bg-secondaryColor rounded-3xl'>
          <h1 className="text-4xl font-bold text-center font-Plaguard">LEADERBOARD</h1>
          <Switchers setActiveGame={setActiveGame} activeGame={activeGame} />
          <Leaders leaderboardData={leaderboardData} />
          <FullLeaderboard leaderboardData={leaderboardData} />
        </div >
      </div >
    </div >
  )
}