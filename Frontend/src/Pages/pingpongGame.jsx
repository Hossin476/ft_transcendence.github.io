import { useContext, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
// import Game from "./components/game";
import {  PerspectiveCamera,Stage,OrbitControls, Environment, KeyboardControls } from "@react-three/drei";
import * as THREE  from 'three'
import Game from "../Components/PingPongGame/game";
import Header from "../Components/PingPongGame/scoreBar&Header/Header";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import Win from "../Components/PingPongGame/win";
import { useMemo, useEffect } from "react";
import ScoreBar from "../Components/PingPongGame/scoreBar";
import { useLocation } from "react-router";
import React, { Suspense, lazy } from 'react';
import GameContext, { GameProvider } from "../context/gameContext";
import GameCounter from "../Components/PingPongGame/gameCounter";
import { useNavigate } from 'react-router-dom';



import { Gamepad2, Clock, Pause, Camera, Trophy } from "lucide-react";

function PingPongGameInstructions() {
  const {beforeStart} = useContext(GameContext)
  return (
    <div className="w-[50%] h-[100%]flex flex-col space-y-2 bg-secondaryColor p-10 rounded-lg border-[2px]">
       <div className="w-full text-center ">PINGPONG INSTRACTION</div>
        <div className="flex  space-x-2">
          <Gamepad2 className="text-yellow-400 w-[10%]"/>
          <p><span className="font-semibold">Control : </span>AWDS</p>
        </div>
        <div className="flex space-x-2 ">
          <Clock className="text-yellow-400 w-[10%]" />
          <p><span className="font-semibold">time to reconnect : </span>You have 60 seconds to reconnect if you disconnect</p>
        </div>
        <div className="flex space-x-2 ">
          <Pause className="text-yellow-400 w-[10%]"/>
          <p><span className="font-semibold">Pause : </span>You have three pauses, each pause 15 seconds</p>
        </div>
        <div className="flex space-x-2 ">
          <Camera className="text-yellow-400 w-[10%]"/>
          <p><span className="font-semibold">Camera : </span>You can change the camera view using the mouse or the camera button on the top</p>
        </div>
        <div className="flex space-x-2 ">
          <Trophy className="text-yellow-400 w-[10%]"/>
          <p><span className="font-semibold">Winner : </span>To win, you should score 7 goals</p>
        </div>
        <p className="w-full text-center text-red-500" ref={beforeStart}></p>
    </div>
  )
}


function PingPongGame() {
  const location = useLocation()
  const navigate = useNavigate()
  const ref = useRef()
  const currentCamera = useRef(0)
  const cameraPositions = useMemo(()=>[
    {rotation: {x: -Math.PI/2, y: Math.PI, z: -Math.PI/2}, position: {x:0,y:2,z:-2.8}},
    {rotation: {x: 0, y: 0, z: 0}, position: {x:0,y:2,z:3.5}},
    {rotation: {x: -Math.PI/2, y: -1, z: -Math.PI/2}, position: {x:-2,y:2,z:0}},
    {rotation: {x: -Math.PI/2, y: 0, z: -Math.PI/2}, position: {x:0,y:7,z:0}},
  ]
  )
  const handleCamera = (e)=>{
    e.preventDefault()
    const { rotation, position } = cameraPositions[currentCamera.current];
    const vr = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
    const vp = new THREE.Vector3(position.x, position.y, position.z);
    ref.current.rotation.set(...vr)
    ref.current.position.set(...vp)
    currentCamera.current += 1
    if (currentCamera.current >= cameraPositions.length)
      currentCamera.current = 0 
    console.log(ref.current)
  }
  const map = useMemo(()=>[
    { name: 'leftOther', keys: ['ArrowLeft'] },
    { name: 'rightOther', keys: ['ArrowRight'] },
    { name: 'upOther', keys: ['ArrowUp'] },
    { name: 'downOther', keys: ['ArrowDown'] },
    { name: 'left', keys: [ 'KeyA'] },
    { name: 'right', keys: ['KeyD'] },
    { name: 'up', keys: ['KeyW'] },
    { name: 'down', keys: ['KeyS'] },
    { name: 'start', keys: ['Space'] },
    { name: 'pause', keys: ['KeyP'] },
  ], [])
  const [status , setStatus] = useState({win:false,endGame:false})
  const [stop , setstop] = useState(false)
  const [beforeStart , selBeforeStart] = useState(false)
  const handleWin = (win,endGame,game_id)=> {
    setStatus(()=>({win:win, endGame:endGame,game_id:game_id  }))
  }
  useEffect(()=>{
    if(location.state?.gameid == undefined)
      navigate('../')
  },[location.state])
  const handleBefore = (state)=>{
    selBeforeStart(state)
  }
  return (
    location.state?.gameid && <>
        <div className="h-[100%] w-[100%] flex flex-col items-center justify-center relative fade-in">
          <Header gameName={"PING PONG"}/>
        <div className=" h-[70%] relative xsm:w-[96%] md:w-[80%] max-w-[1400px] rounded-[20px] flex justify-center items-center text-white flex-col bg-secondaryColor border-[2px] border-forthColor">
          {beforeStart&& <div className="w-[99%] h-[99%]  absolute z-20 backdrop-blur-lg  flex flex-col justify-center items-center xsm:text-[10px] lg:text-2xl rounded-lg">
            <PingPongGameInstructions/>
        </div>}
        {status.endGame && <Win iswin={status.win} game_id={status.game_id} />}
        {stop && <GameCounter/>}
          <ScoreBar gameid={location.state.gameid}/>
          <button className=" lg:h-[40px] lg:w-[60px] xsm:h-[20px] xsm:w-[40px]" onClick={handleCamera}> <VscDeviceCameraVideo className="h-[100%] w-[100%]" style={{color: 'white'}} /></button>
          <hr className="h-[2px] xsm:w-[95%] lg:w-[90%] max-w-[1400px] bg-thirdColor my-6"/>
          <Canvas >
            <PerspectiveCamera ref={ref} makeDefault rotation={Object.values(cameraPositions[2].rotation)} fov={75} position={Object.values(cameraPositions[2].position)}/>
            <OrbitControls/>
            <ambientLight />
            {/* <Environment preset='lobby'  background/> */}
            <Stage   adjustCamera={true} intensity={1}  environment="city" >
              <KeyboardControls map={map}>
                <Game handleWin={handleWin} endGame={status.endGame} handleWaiting={setstop} beforeStartState={beforeStart} handleBefore={handleBefore} />
              </KeyboardControls>
            </Stage>
          </Canvas>
          </div>
        </div>
    </>
  );
}

export default PingPongGame;