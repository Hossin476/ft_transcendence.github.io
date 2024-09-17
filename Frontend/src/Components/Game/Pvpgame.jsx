// src/PingPong.jsx
import React from 'react';
import { PiArrowUUpLeftBold } from 'react-icons/pi';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect,useState } from 'react';

import './Pvpgame.css';
import './Matchmaking.css';

import mypic from '/avatar/sbzizal.jpeg';
import vs_avatar from '/avatar/lshail.jpeg';
import avatar from '/avatar/anonym.png';
import {useLocation} from 'react-router-dom'

import 'ldrs/dotPulse';
import { useNavigate } from 'react-router';
import Challenge from '../Challenge/Challenge';
import { useAuth } from '../../context/AuthContext';


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

function Vsplayer_card({player}) {
  return (
    <div className="player-card">
      <img src={vs_avatar} alt="Avatar" className="avatar-ping" />
      <div className="player-info">
        <h2>{player.username}</h2>
        <p>{player.rank}</p>
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
  const [pvpUser,setPvpUser] = useState()
  const [counter,setCounter] = useState(null)
  const nav = useNavigate()
  const locations = useLocation()
  const {socket,socketMessage, username} = useAuth()

  function startGame() {
    let gameType = title === "PING PONG" ? "P" : "T"
    setStart(true);
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'pvpmatch_request',
        gameType:gameType
      });
      socket.send(message);
    }
    console.log(locations)
  }

  function stopGame() {
    let gameType = title === "PING PONG" ? "P" : "T"
    setStart(false);
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'cancel_pvp',
        gameType:gameType
      });
      socket.send(message);
    }
  }



  useEffect(() => {
    
    if(socketMessage && socketMessage.type === 'game.counter')
        setCounter(socketMessage.counter)
    if(socketMessage && socketMessage.type === 'game.player_info') {
      console.log("print event shit",socketMessage.player)
      setStarted(true);
      setPvpUser(socketMessage.player)
    }
  }, [socketMessage]);

  useEffect(()=>{
    return ()=> {
      let gameType = title === "PING PONG" ? "P" : "T"
      if (socket && socket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({
          type: 'cancel_pvp',
          gameType:gameType
        });
        socket.send(message);
      }
    }
  },[])
  console.log("i guess u r here successfully!",title)
  return (

    <div className='bg-primaryColor w-full flex items-center justify-between px-7 relative h-[100%]'>
            <div className="h-[100%] flex  justify-center flex-col items-center xsm:w-[90%] lg:w-[80%] ">
                <div className='holder'>
                  <div className="ping-pong-container">
                    <Header title={title}/>
                    <div className="player-cards">
                      <Mycard />
                     { counter && 
                        <div>
                          <h3>match will start in </h3>
                          <p className="text-center text-2xl">{counter}</p>
                        </div>
                      }
                      {
                        isstarted ? (
                          <Vsplayer_card player={pvpUser} />
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
