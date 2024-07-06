// src/PingPong.jsx
import React from 'react';
import { PiArrowUUpLeftBold } from 'react-icons/pi';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect } from 'react';

import '../Components/Game/Pvpgame.css';
import '../Components/Game/Matchmaking.css';

import mypic from '/avatar/sbzizal.jpeg';
import vs_avatar from '/avatar/lshail.jpeg';
import avatar from '/avatar/anonym.png';


function Header() {
  return (
    <header className="header">
      <button className="back-button">
        <PiArrowUUpLeftBold style={{ fontSize: '2rem', color: 'white' }} />
      </button>
      <h1>PING PONG</h1>
    </header>
  )
}

function Mycard() {
  return (
    <div className="player-card">
      <img src={mypic} alt="Avatar" className="avatar" />
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
        <p>. . .</p>
      </div>
    </div>
  );
}

function Vsplayer_card() {
  return (
    <div className="player-card">
      <img src={vs_avatar} alt="Avatar" className="avatar" />
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
      <p className="add-player-info">. . .</p>
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

function PingPong() {

  const [isstart, setStart] = React.useState(false);
  const [isstarted, setStarted] = React.useState(false);


  function startGame() {
    setStart(true);
  }

  function stopGame() {
    setStart(false);
  }

  useEffect(() => {
    if (isstart) {
      const timer = setTimeout(() => {
        setStarted(true);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isstart]);


  return (
    <div className="ping-pong-container">
      <Header />
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
  );
};

export default PingPong;
