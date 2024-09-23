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
import { RiWifiOffLine } from "react-icons/ri";
import { IoWifiSharp } from "react-icons/io5";

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
    <div className="player-card h-[90%] xsm:w-[50%] lg:w-[25%]">
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
    <div className="add-player-card h-[90%]xsm:w-[50%] lg:w-[25%]">
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

  return (
    <div className="matchmaking">
      <p>MATCHMAKING ...</p>
      <button onClick={onClick} className="cancel-button">CANCEL</button>
    </div>
  );
}

function Add_card() {
  return (
    <div className="add-player-card h-[90%] xsm:w-[50%] lg:w-[25%]">
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
function LocalButton({onClick}) {
  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      <button onClick={onClick} className="started-button">STARTed</button>
    </div>
  );

}

function LocalPvp({player,setPlayers}) {

  const [edit,setEdit] = useState(true)
  const [name,setName] = useState('')
  const [error,setEror] = useState(false)
  let regex = new RegExp("^[a-z][a-zA-Z0-9]*$")

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
      }
  }
  return (
    <div className="player-card h-[90%] xsm:w-[50%] lg:w-[25%]">
      <img src={mypic} alt="Avatar" className="avatar-ping" />
      <div className="player-info items-center flex flex-col">
        {
          edit ? <input className='bg-secondaryColor p-2 outline-none rounded border border-forthColor' type="text" value={name} onChange={handleInpute} /> :<h2>{name}</h2>
        }
        {
          error ? <p className='text-red-500'>invalid name please a valid name</p> : ''
        }
        <button disabled={error ? true : false} onClick={handleClick} className="p-2 w-24 mt-4 border rounded border-forthColor">
          {
            edit ? 'Done' : 'Edit'
          }
        </button>
      </div>
    </div>
  )
}

function OnlinePvp({isstarted,counter,isstart}) {
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

const fetchData = async (gameType,players,tokens)=> {

  let url = ''

  if(gameType === 'P')
    url = `http://${import.meta.env.VITE_BACKEND_URL}/api/pingpong/game/pingpong/offline/craete`
  else
    url = `http://${import.meta.env.VITE_BACKEND_URL}/api/game/tictactoe/offline/create_local_game`
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

  if(response.ok)
      return data
  return null
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
  const [players, setPlayers] = useState({
    player1:'',
    player2:''
  })
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

    let gameType = title === "PING PONG" ? "P" : "T"

    if(players.player1 === '' || players.player1 === '')
        return
    let type = gameType === "P" ? 'pingpong' : 'tictactoe'
    const data = await fetchData(gameType,players,tokens)
    if(data)
      navigate(`/game/${type}/pvpgame/match`, { state: { gameid: data.game_id, isonline:false } })
  }

  useEffect(() => {
    
    if(socketMessage && socketMessage.type === 'game.counter')
        setCounter(socketMessage.counter)
    if(socketMessage && socketMessage.type === 'game.player_info') {
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
                                <p>offline</p>
                            </div>
                            <div onClick={()=>setMode(()=>true)} className={`flex gap-2 p-2 items-center ${mode === true ? 'bg-[#412e55] rounded-full border border-forthColor' : ''}`}>
                                <IoWifiSharp />
                                <p>online</p>
                            </div>
                        </div>
                        <div className="flex w-full items-center px-4 justify-evenly gap-12 h-[90%]">
                          {
                            !mode ? <> <LocalPvp player={"player1"} setPlayers={setPlayers} /> <LocalPvp player={"player2"} setPlayers={setPlayers} /></> : <OnlinePvp isstart={isstart} counter={counter} isstarted={isstarted}/>}
                        </div>
                    </div>
                      {
                       mode === true ? isstarted ? (
                          <Started_button />
                        ) : (
                          isstart ? <Matchmaking_button onClick={stopGame} /> : <Start_button onClick={startGame} />
                        ) :  <LocalButton onClick={creatLocalGame}/>
                      }
                  </div>
                </div>
            </div>
            <Challenge/>
        </div>
  );
};

export default PvpGame;
