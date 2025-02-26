// src/PingPong.jsx
import React, { useCallback } from "react";
import { PiArrowUUpLeftBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { HiX } from "react-icons/hi";

import "./Pvpgame.css";
import "./Matchmaking.css";
import avatar from "/avatar/anonym.png";
import { useLocation } from "react-router-dom";

import "ldrs/dotPulse";
import { useNavigate } from "react-router";
import Challenge from "../Challenge/Challenge";
import { useAuth } from "../../context/AuthContext";
import { RiWifiOffLine } from "react-icons/ri";
import { IoWifiSharp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

import  CustomizePing from "./PingCustomize";
import  CustomizeTic from "./TicCustomize";

function Header({ title }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  function togglePopup() {
    setIsPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
  }

  function navigateToGame() {
    navigate("/game");
  }

  return (
    <header className="header">
      <div className="back-div">
        <button onClick={navigateToGame} className="back-button">
          <PiArrowUUpLeftBold style={{ fontSize: "2rem", color: "white" }} />
        </button>
      </div>
      <div className="tittle-div ">
        <h1 className="text-border">{title}</h1>
      </div>
      <div className="pr-6">
        <button onClick={togglePopup}>
          <MdOutlineSettingsSuggest
            style={{ fontSize: "2rem", color: "white" }}
          />
        </button>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-[#21162C] border border-[#C77DFF] rounded-lg shadow-lg p-6 w-4/5 max-w-lg">
            <HiX
              className="absolute top-4 right-4 cursor-pointer"
              onClick={togglePopup}
              style={{ fontSize: "1.6rem", color: "white" }}
            />
            <h2 className="text-xl font-bold mb-4">{t("Customize Game")}</h2>
            {
              title === "PING PONG" ? <CustomizePing setIsPopupOpen={setIsPopupOpen} /> : <CustomizeTic setIsPopupOpen={setIsPopupOpen} />
            }
          </div>
        </div>
      )}
    </header>
  );
}

function Mycard({ image, playerName }) {
  const { t } = useTranslation();
  return (
    <div className="player-card h-[90%] xsm:w-[50%] lg:w-[25%]">
        <div className="mt-8 rounded-full w-32 h-32 overflow-hidden">
          <img src={image} alt="Avatar" className="object-cover w-full h-full" />
        </div>
      <div className="player-info">
        <h2>{playerName}</h2>
        <p>{t("LEVEL")} 2</p>
      </div>
    </div>
  );
}

function Wait_card() {
  const { t } = useTranslation();
  return (
    <div className="add-player-card h-[90%]xsm:w-[50%]  lg:w-[25%]">
      <img src={avatar} alt="Avatar" className="anonymous" />
      <div className="add-player-info">
        <h2>{t("WAITING")}</h2>
        <l-dot-pulse size="30" speed="1.3" color="white"></l-dot-pulse>
      </div>
    </div>
  );
}

function Vsplayer_card({ player }) {
  const { t } = useTranslation();
  return (
    <div className="add-player-card  h-[90%]xsm:w-[50%] lg:w-[25%]]">
      <div className="mt-8 rounded-full w-32 h-32 overflow-hidden">
        <img src={player.profile_image} alt="Avatar" className=" w-full h-full object-cover" />
      </div>
      <div className="player-info">
        <h2>{player.username}</h2>
        <p>{t("level")} {player.rank}</p>
      </div>
    </div>
  );
}

function Matchmaking_button({ onClick }) {
  const { t } = useTranslation();
  return (
    <div className="matchmaking">
      <p>{t("MATCHMAKING")} ...</p>
      <button onClick={onClick} className="cancel-button">
        {t("CANCEL")}
      </button>
    </div>
  );
}

function Add_card() {
  const { t } = useTranslation();
  return (
    <div className="add-player-card  h-[90%]xsm:w-[50%] lg:w-[25%]">
      <img src={avatar} alt="Avatar" className="anonymous" />
      <p className="add-player-info">{t("No_Name")}</p>
    </div>
  );
}

function Start_button({ onClick }) {
  const { t } = useTranslation();
  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      <button onClick={onClick} className="start-button">
        {t("START")}
      </button>
    </div>
  );
}



function ReconnectButton({ data, gameType, navigate }) {
  const { t } = useTranslation();

  const handleClick = () => {
    if (data?.isMatch)
      navigate(`/game/${gameType === 'P' ? "pingpong" : "tictactoe"}/pvpgame/match`, { state: { gameid: data.id, isonline: true } })
  };

  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      <button onClick={handleClick} className="start-button">
        {t("RECONNECT")}
      </button>
    </div>
  );
}

function Started_button({ onClick }) {
  const { t } = useTranslation();
  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      <button onClick={onClick} className="started-button">
        {t("STARTED")}
      </button>
    </div>
  );
}
function LocalButton({ onClick, players }) {
  const { t } = useTranslation();
  let error = '';
  if (players.player1 === "" || players.player2 === "") error = 'empty';
  if(players.player1 === players.player2) error = 'duplicate'
  return (
    <div className="start-button_div">
      <div className="empty_start"></div>
      {error === 'empty' ? <p className="text-red-500"> {t("press done first or it's invalide inputs")}</p> : ""}
      {error === 'duplicate' ? <p className="text-red-500"> {t("you can't insert the same name")}</p> : ""}
      <button
        onClick={error ? (e) => e.preventDefault() : onClick}
        className="started-button"
      >
        {t("STARTED")}
      </button>
    </div>
  );
}

const fetchData = async (gameType, players, tokens, customFetch) => {
  let url = "";

    if (gameType === "P") url = "/api/pingpong/game/pingpong/offline/create";
    else url = "/api/game/tictactoe/offline/create_local_game";
    try {
      const response = await customFetch(url, {
        method: "POST",
        headers: {
          Authorization: "JWT " + tokens.access,
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          player1: players.player1,
          player2: players.player2,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return null;
    } catch (error) {
      return null;
    }
};

function LocalPvp({ player, setPlayers }) {
  const [edit, setEdit] = useState(true);
  const [name, setName] = useState("");
  const [error, setEror] = useState(false);
  const {user} = useAuth()
  let regex = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$");
  const { t } = useTranslation();

  const handleInpute = (e) => {
    setName(() => e.target.value);
    if (e.target.value.length > 10 || !regex.test(e.target.value))
      setEror(() => true);
    else setEror(() => false);
  };
  const handleClick = () => {
    if (name.length > 10 || !regex.test(name)) setEror(() => true);
    else {
      setEror(() => false);
      setEdit((prevEdit) => !prevEdit);
      setPlayers((prevState) => {
        return { ...prevState, [player]: name };
      });
    }
  };
  return (
    <div className="player-card  h-[90%] xsm:w-[50%]">
      <div className="my-4 w-32 h-32 overflow-hidden rounded-full">
          <img src={user.profile_image} alt="Avatar" className="object-cover w-full h-full" />
      </div>
      <div className="player-info items-center flex flex-col">
        {edit ? (
          <input
            className="bg-secondaryColor w-[95%] p-2 outline-none rounded border border-forthColor"
            type="text"
            value={name}
            onChange={handleInpute}
          />
        ) : (
          <h2>{name}</h2>
        )}
        {error ? <p className="text-red-500">{t("invalid name")}</p> : ""}
        <button
          disabled={error ? true : false}
          onClick={handleClick}
          className="p-2 w-24 mt-4 border rounded border-forthColor"
        >
          {edit ? t("Done") : t("Edit")}
        </button>
      </div>
    </div>
  );
}

function OnlinePvp({isstarted,counter,isstart,pvpUser}) {

  const { t } = useTranslation();
  const {user,username} = useAuth();
  return (
    <>
      <Mycard playerName={username} image={user.profile_image}/>
      { counter && 
          <div>
            <h3>{t("match will start in")} </h3>
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
  );
}

function PvpGame({ title }) {
  const [isstart, setStart] = React.useState(false);
  const [isstarted, setStarted] = React.useState(false);
  const [pvpUser, setPvpUser] = useState(null)
  const [counter, setCounter] = useState(null)
  const [mode, setMode] = useState(true)
  const [matchData, setMatchData] = useState({})
  const locations = useLocation()
  const navigate = useNavigate()
  const { socket, socketMessage, tokens, customFetch } = useAuth()
  const { t } = useTranslation();
  const [players, setPlayers] = useState({
    player1: "",
    player2: "",
  });
  const gameType = title === "PING PONG" ? "P" : "T";
  function startGame() {
    let gameType = title === "PING PONG" ? "P" : "T";
    setStart(true);
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "pvpmatch_request",
        gameType: gameType,
      });
      socket.send(message);
    }
  }

  function stopGame() {
    let gameType = title === "PING PONG" ? "P" : "T";
    setStart(false);
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "cancel_pvp",
        gameType: gameType,
      });
      socket.send(message);
    }
  }

  async function creatLocalGame() {
    const gameType = title === "PING PONG" ? "P" : "T";

    if (players.player1 === "" || players.player1 === "") return;
    let type = gameType === "P" ? "pingpong" : "tictactoe";
    const data = await fetchData(gameType, players, tokens, customFetch);
    if (data)
      navigate(`/game/${type}/pvpgame/match`, {
        state: { gameid: data.game_id, isonline: false },
      });
  }

  const fetch_matches = useCallback(async () => {
    const fetchUrl = `/api/notification/${gameType === 'P' ? 'pingpong_unfinished_match' : 'tictactoe_unfinished_match'}`;
    try {
      const response = await customFetch(fetchUrl, {
        headers: {
          "Authorization": `JWT ${tokens.access}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMatchData(data);
    } catch (error) {
      console.error('Fetch failed: ', error);
      setMatchData({})
    }
  }, [gameType, setMatchData])

  useEffect(() => {
    if (socketMessage && socketMessage.type === "game.counter")
      setCounter(socketMessage.counter);
    if (socketMessage && socketMessage.type === "game.player_info") {
      setStarted(true);
      setPvpUser(socketMessage.player);
    }

    fetch_matches()

  }, [socketMessage, fetch_matches]);

  useEffect(() => {
    return () => {
      let gameType = title === "PING PONG" ? "P" : "T";
      if (socket && socket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({
          type: "cancel_pvp",
          gameType: gameType,
        });
        socket.send(message);
      }
    };
  }, []);

  return (
    <div className="bg-primaryColor w-full flex items-center justify-between px-7 relative h-[100%]">
      <div className="h-[100%] flex  justify-center flex-col items-center xsm:w-[90%] lg:w-[80%] ">
        <div className="holder">
          <div className="ping-pong-container xsm:h-[50rem] bg-secondaryColor">
            <Header title={title} />
            <div className=" w-full h-[90%] ">
              <div className=" flex gap-10 justify-center items-center mt-12">
                <div
                  onClick={() => setMode(() => false)}
                  className={`flex gap-2 p-2 items-center ${mode === false
                    ? "bg-[#412e55] rounded-full border border-forthColor"
                    : ""
                    }`}
                >
                  <RiWifiOffLine />
                  <p>{t("offline")}</p>
                </div>
                <div
                  onClick={() => setMode(() => true)}
                  className={`flex gap-2 p-2 items-center ${mode === true
                    ? "bg-[#412e55] rounded-full border border-forthColor"
                    : ""
                    }`}
                >
                  <IoWifiSharp />
                  <p>{t("online")}</p>
                </div>
              </div>
              <div className="flex w-full items-center px-4 justify-evenly gap-12 h-[90%]">
                {!mode ? (
                  <>
                    {" "}
                    <LocalPvp player={"player1"} setPlayers={setPlayers} />{" "}
                    <LocalPvp player={"player2"} setPlayers={setPlayers} />
                  </>
                ) : (
                  <OnlinePvp
                    isstart={isstart}
                    counter={counter}
                    pvpUser={pvpUser}
                    isstarted={isstarted}
                  />
                )}
              </div>
            </div>
            {
              mode === true ? (
                isstarted ? (
                  <Started_button />
                ) : (
                  isstart ? <Matchmaking_button onClick={stopGame} /> :
                    (
                      <div className='flex justify-center items-center w-1/2'>
                        {
                          matchData && !matchData?.isMatch ?
                            <Start_button onClick={startGame} /> :
                            <ReconnectButton data={matchData} gameType={gameType} navigate={navigate} />
                        }
                      </div>
                    )
                )) : <LocalButton players={players} onClick={creatLocalGame} />
            }
          </div>
        </div>
      </div>
      <Challenge gameType={gameType} />
    </div>
  );
}

export default PvpGame;

