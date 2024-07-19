// src/PingPong.jsx
import React from 'react';
import { PiArrowUUpLeftBold } from 'react-icons/pi';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect } from 'react';

import './Pvpgame.css';
import './Matchmaking.css';

import mypic from '/avatar/sbzizal.jpeg';
import vs_avatar from '/avatar/lshail.jpeg';
import avatar from '/avatar/anonym.png';
import {useLocation} from 'react-router-dom'

import 'ldrs/dotPulse';
import { useNavigate } from 'react-router';
import Challenge from '../TournamentJoin/Challenge';


function Header({ title}) {

  const navigate = useNavigate();

  function navigateToGame() {
    navigate('/game');
  }

  return (
    <header className="header">
      <div className='back-div'>
        <button onClick={navigateToGame} className="back-button">
          <PiArrowUUpLeftBold style={{ fontSize: '2rem', color: 'white' }} />
        </button>
      </div>
      <div className='tittle-div '>
        <h1 className='text-border'>{title}</h1>
      </div>
    </header>
  )
}

function Mycard() {
  return (
    <div className="player-card">
      <img src={mypic} alt="Avatar" className="avatar-ping" />
      <div className="player-info">
        <h2>KIRAZIZI</h2>
        <p>LEVEL 2</p>
      </div>
    </div>
  );
}

function Wait_card() {
  return (
    <div className="add-player-card">
      <img src={avatar} alt="Avatar" className="anonymous" />
      <div className="add-player-info">
        <h2>WAITING</h2>
        <l-dot-pulse size="30" speed="1.3" color="white"></l-dot-pulse>
      </div>
    </div>
  );
}

function Vsplayer_card() {
  return (
    <div className="player-card">
      <img src={vs_avatar} alt="Avatar" className="avatar-ping" />
      <div className="player-info">
        <h2>LAHOUCINE</h2>
        <p>LEVEL 1</p>
      </div>
    </div>
  );
}

function Matchmaking_button({onClick}) {

  return (
    <div className="matchmaking">
      <p>MATCHMAKING ...</p>
      <button onClick={onClick} className="cancel-button">CANCEL</button>
    </div>
  );
}

function Add_card() {
  return (
    <div className="add-player-card">
      <img src={avatar} alt="Avatar" className="anonymous" />
      <p className="add-player-info">No_Name</p>
    </div>
  );
}

function Start_button({onClick}) {
  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      <button onClick={onClick} className="start-button">START</button>
    </div>
  );
}

function Started_button({onClick}) {
  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      <button onClick={onClick} className="started-button">STARTED</button>
    </div>
  );

}

function PvpGame({ title}) {

  const [isstart, setStart] = React.useState(false);
  const [isstarted, setStarted] = React.useState(false);
  const nav = useNavigate()
  const locations = useLocation()

  function startGame() {
    setStart(true);
    console.log(locations)
  }

  function stopGame() {
    setStart(false);
  }

  useEffect(() => {
    if (isstart) {
      const timer = setTimeout(() => {
        setStarted(true);
        // nav(locations.pathname+'/match')
      }, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [isstart]);


  return (

    <div className='bg-primaryColor w-full flex items-center justify-between px-7 relative h-[100%]'>
            <div className="h-[100%] flex  justify-center flex-col items-center xsm:w-[90%] lg:w-[80%] ">
                <div className='holder'>
                  <div className="ping-pong-container">
                    <Header title={title}/>
                    <div className="player-cards">
                      <Mycard />
                      {
                        isstarted ? (
                          <Vsplayer_card />
                        ) : (
                          isstart ? <Wait_card /> : <Add_card />
                        )
                      }
                    </div>
                      {
                        isstarted ? (
                          <Started_button />
                        ) : (
                          isstart ? <Matchmaking_button onClick={stopGame} /> : <Start_button onClick={startGame} />
                        )
                      }
                  </div>
                </div>
            </div>
            <Challenge/>
        </div>
  );
};

export default PvpGame;
