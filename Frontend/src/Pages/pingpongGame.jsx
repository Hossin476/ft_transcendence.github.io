import { useContext, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
// import Game from "./components/game";
import {  PerspectiveCamera,Stage,OrbitControls, Environment, KeyboardControls } from "@react-three/drei";
import * as THREE  from 'three'
import Game from "../Components/PingPongGame/game";
import Header from "../Components/PingPongGame/scoreBar&Header/Header";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import Win from "../Components/PingPongGame/win";
import { useMemo } from "react";
import ScoreBar from "../Components/PingPongGame/scoreBar";
import { useLocation } from "react-router";
import React, { Suspense, lazy } from 'react';
import GameContext, { GameProvider } from "../context/gameContext";
import GameCounter from "../Components/PingPongGame/gameCounter";


function PingPongGame() {
  const location = useLocation()
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
  const handleWin = (win,endGame,game_id)=> {
    setStatus(()=>({win:win, endGame:endGame,game_id:game_id  }))
  }
  return (
    <Suspense>
      <GameProvider>
      <div className="h-[100%] w-[100%] flex flex-col items-center justify-center relative">
        <Header gameName={"PING PONG"}/>
        <div className=" h-[70%] relative xsm:w-[96%] md:w-[80%] max-w-[1400px] rounded-[20px] flex justify-center items-center text-white flex-col bg-secondaryColor border-[2px] border-forthColor">
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
                <Game handleWin={handleWin} endGame={status.endGame} handleWaiting={setstop}/>
              </KeyboardControls>
            </Stage>
          </Canvas>
        </div>
      </div>
      </GameProvider>
    </Suspense>
  );
}

export default PingPongGame;