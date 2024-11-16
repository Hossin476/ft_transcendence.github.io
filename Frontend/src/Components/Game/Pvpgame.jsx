// src/PingPong.jsx
import React from 'react';
import { PiArrowUUpLeftBold } from 'react-icons/pi';
import { MdDashboardCustomize } from "react-icons/md";
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
import { RiWifiOffLine } from "react-icons/ri";
import { IoWifiSharp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

import { FaCheck } from "react-icons/fa";

function Costumize() {

  const [Paddle, setPaddle] = React.useState("white");
  const [Ball, setBall] = React.useState("white");


  const colorOptions = [
   "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
  ]

  return (
    <div className="grid gap-4 py-4">
      <div className="bg-[#1C1A27] border border-[#2A2833] rounded-lg p-6">
        <div className="space-y-6">
          {/* Paddle Customization */}
          <div className="space-y-4">
            <span className="text-white">Paddle Color</span>
            <div className="flex gap-3 flex-wrap" id="paddle-color">
              {colorOptions.map((color) => (
                <button
                  key={`paddle-${color}`}
                  className="w-10 h-10 rounded-lg relative"
                  style={{ backgroundColor: color }}
                  onClick={() => setPaddle(color)}
                  aria-label={`Select ${color} for paddle color`}
                >
                  {Paddle === color && (
                    <FaCheck className="absolute inset-0 m-auto text-black" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Ball Customization */}
          <div className="space-y-4">
            <span className="text-white">Ball Color</span>
            <div className="flex gap-3 flex-wrap" id="ball-color">
              {colorOptions.map((color) => (
                <button
                  key={`ball-${color}`}
                  className="w-10 h-10 rounded-lg relative"
                  style={{ backgroundColor: color }}
                  onClick={() => setBall(color)}
                  aria-label={`Select ${color} for ball color`}
                >
                  {Ball === color && (
                    <FaCheck className="absolute inset-0 m-auto text-black" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mt-8">
            <h3 className="text-white">Preview</h3>
            <div className="bg-[#13111C] rounded-lg p-6 mt-2">
              <div className="relative h-40 border border-[#2A2833] rounded">
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-16 rounded"
                  style={{ backgroundColor: Paddle }}
                />
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-16 rounded"
                  style={{ backgroundColor: Paddle }}
                />
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                  style={{ backgroundColor: Ball }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Header({ title}) {

  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  function togglePopup() {
    setIsPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
  }

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
      <div className="pr-6">
        <button onClick={togglePopup}>
          <MdDashboardCustomize style={{ fontSize: '2rem', color: 'white' }} />
        </button>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1C1A27] rounded-lg shadow-lg p-6 w-4/5 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Customize Game</h2>
            <Costumize />
            <button
              onClick={togglePopup}
              className="w-full mt-4 px-4 py-2 bg-white text-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Save
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

function Mycard({image, playerName}) {
  const { t } = useTranslation();
  return (
    <div className="player-card h-[90%] xsm:w-[50%] lg:w-[25%]">
      <img src={mypic} alt="Avatar" className="avatar-ping" />
      <div className="player-info">
        <h2>KIRAZIZI</h2>
        <p>{t("LEVEL")} 2</p>
      </div>
    </div>
  );
}

function Wait_card() {
  const { t } = useTranslation();
  return (
    <div className="add-player-card h-[90%]xsm:w-[50%] lg:w-[25%]">
      <img src={avatar} alt="Avatar" className="anonymous" />
      <div className="add-player-info">
        <h2>{t("WAITING")}</h2>
        <l-dot-pulse size="30" speed="1.3" color="white"></l-dot-pulse>
      </div>
    </div>
  );
}

function Vsplayer_card({player}) {
  return (
    <div className="player-card h-[90%] xsm:w-[50%] lg:w-[25%]">
      <img src={vs_avatar} alt="Avatar" className="avatar-ping" />
      <div className="player-info">
        <h2>{player.username}</h2>
        <p>{player.rank}</p>
      </div>
    </div>
  );
}

function Matchmaking_button({onClick}) {
  const { t } = useTranslation();
  return (
    <div className="matchmaking">
      <p>{t("MATCHMAKING")} ...</p>
      <button onClick={onClick} className="cancel-button">{t("CANCEL")}</button>
    </div>
  );
}

function Add_card() {
  const { t } = useTranslation();
  return (
    <div className="add-player-card h-[90%] xsm:w-[50%] lg:w-[25%]">
      <img src={avatar} alt="Avatar" className="anonymous" />
      <p className="add-player-info">{t("No_Name")}</p>
    </div>
  );
}

function Start_button({onClick}) {
  const { t } = useTranslation();
  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      <button onClick={onClick} className="start-button">{t("START")}</button>
    </div>
  );
}

function Started_button({onClick}) {
  const { t } = useTranslation();
  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      <button onClick={onClick} className="started-button">{t('STARTED')}</button>
    </div>
  );

}
function LocalButton({onClick,players}){
  const { t } = useTranslation();
  let error = false
  console.log("this is the shit here :",players)
  if(players.player1 === "" || players.player2 === "")
      error = true
  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      {error ? <p className="text-red-500"> {t("press done first")}t</p> :''} 
      <button onClick={ error ? (e)=>e.preventDefault()  : onClick} className="started-button">{t("STARTED")}</button>
    </div>
  );

}



const fetchData = async (gameType,players,tokens)=> {

  let url = ''

  if(gameType === 'P')
    url = '/api/pingpong/game/pingpong/offline/create'
  else
    url = '/api/game/tictactoe/offline/create_local_game'
  const response = await fetch(url,{
    method:"POST",
    headers:{
      Authorization: 'JWT ' + tokens.access,
      "content-Type": "application/json"
    },
    body:JSON.stringify({
        player1: players.player1,
        player2: players.player2
    })
  })
  const data = await response.json()
  console.log("the data after fetch is ", data)

  if(response.ok)
      return data
  return null
}

function LocalPvp({player,setPlayers}) {

  const [edit,setEdit] = useState(true)
  const [name,setName] = useState('')
  const [error,setEror] = useState(false)
  let regex = new RegExp("^[a-z][a-zA-Z0-9]*$")
  const { t } = useTranslation();

  const handleInpute =(e)=> {
      setName(()=>e.target.value)
      if (e.target.value.length > 10 || !regex.test(e.target.value))
          setEror(()=>true)
      else
        setEror(()=>false)
  }
  const handleClick = ()=> {
    if (name.length > 10 || !regex.test(name))
        setEror(()=>true)
    else
      {
        setEror(()=>false)
        setEdit((prevEdit)=>!prevEdit)
        setPlayers((prevState)=>{
           return {...prevState, [player]:name}
          })
          console.log("DATA RAH DKHLAT")
      }
  }
  return (
    <div className="player-card  h-[90%] xsm:w-[50%]">
      <img src={mypic} alt="Avatar" className="avatar-ping" />
      <div className="player-info items-center flex flex-col">
        {
          edit ? <input className='bg-secondaryColor w-[95%] p-2 outline-none rounded border border-forthColor' type="text" value={ name} onChange={handleInpute} /> :<h2>{name}</h2>
        }
        {
          error ? <p className='text-red-500'>{t("invalid name")}</p> : ''
        }
        <button disabled={error ? true : false} onClick={handleClick} className="p-2 w-24 mt-4 border rounded border-forthColor">
          {
            edit ? t("Done") : t("Edit")
          }
        </button>
      </div>
    </div>
  )
}

function OnlinePvp({isstarted,counter,isstart,pvpUser}) {

  return (
    <>
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
    </>
  )
}

function PvpGame({ title}) {

  const [isstart, setStart] = React.useState(false);
  const [isstarted, setStarted] = React.useState(false);
  const [pvpUser,setPvpUser] = useState()
  const [counter,setCounter] = useState(null)
  const [mode,setMode] = useState(true)
  const locations = useLocation()
  const navigate = useNavigate()
  const {socket,socketMessage, tokens} = useAuth()
  const { t } = useTranslation();
  const [players, setPlayers] = useState({
    player1:'',
    player2:''
  })
  const gameType = title === "PING PONG" ? "P" : "T"
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

  async function creatLocalGame() {

  const gameType = title === "PING PONG" ? "P" : "T"

    console.log("the players are ", players)
    if(players.player1 === '' || players.player1 === '')
        return
    let type = gameType === "P" ? 'pingpong' : 'tictactoe'
    const data = await fetchData(gameType,players,tokens)
    console.log("the data is ", data)
    if(data)
      navigate(`/game/${type}/pvpgame/match`, { state: { gameid: data.game_id, isonline:false } })
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
                  <div className="ping-pong-container xsm:h-[50rem] bg-secondaryColor">
                    <Header title={title}/>
                    <div className=" w-full h-[90%] ">
                        <div className=" flex gap-10 justify-center items-center mt-12">
                            <div onClick={()=>setMode(()=>false)} className={`flex gap-2 p-2 items-center ${mode ===false ? 'bg-[#412e55] rounded-full border border-forthColor' : ''}`}>
                                <RiWifiOffLine />
                                <p>{t("offline")}</p>
                            </div>
                            <div onClick={()=>setMode(()=>true)} className={`flex gap-2 p-2 items-center ${mode === true ? 'bg-[#412e55] rounded-full border border-forthColor' : ''}`}>
                                <IoWifiSharp />
                                <p>{t("online")}</p>
                            </div>
                        </div>
                        <div className="flex w-full items-center px-4 justify-evenly gap-12 h-[90%]">
                          {
                            !mode ? <> <LocalPvp player={"player1"} setPlayers={setPlayers} /> <LocalPvp player={"player2"} setPlayers={setPlayers} /></> : <OnlinePvp isstart={isstart} counter={counter} pvpUser={pvpUser} isstarted={isstarted}/>}
                        </div>
                    </div>
                      {
                       mode === true ? isstarted ? (
                          <Started_button />
                        ) : (
                          isstart ? <Matchmaking_button onClick={stopGame} /> : <Start_button onClick={startGame} />
                        ) :  <LocalButton players = {players} onClick={creatLocalGame}/>
                      }
                  </div>
                </div>
            </div>
            <Challenge gameType={gameType}/>
        </div>
  );
};

export default PvpGame;
