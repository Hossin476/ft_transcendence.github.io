import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
// import Game from "./components/game";
import {  PerspectiveCamera,Stage,OrbitControls, Environment, KeyboardControls } from "@react-three/drei";
import * as THREE  from 'three'
import Game from "../Components/PingPongGame/game";
import FirstPlayer from "../Components/PingPongGame/scoreBar&Header/FirstPlayer";
import SecondPlayer from "../Components/PingPongGame/scoreBar&Header/SecondPlayer";
import Timer from "../Components/PingPongGame/scoreBar&Header/Timer";
import Header from "../Components/PingPongGame/scoreBar&Header/Header";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import Win from "../Components/PingPongGame/win";
import { useMemo } from "react";
import ScoreBar from "../Components/PingPongGame/scoreBar";



function PingPongGame() {
  const ref =useRef()
  const currentCamera = useRef(0)
  const cameraPositions = useRef([
    {rotation: {x: -Math.PI/2, y: 0, z: -Math.PI/2}, position: {x:0,y:7,z:0}},
    {rotation: {x: -Math.PI/2, y: -1, z: -Math.PI/2}, position: {x:-4,y:7,z:0}},
    {rotation: {x: 0, y: 0, z: 0}, position: {x:0,y:1,z:3.5}},
  ])
  const handleCamera = (e)=>{
    e.preventDefault()
    const { rotation, position } = cameraPositions.current[currentCamera.current];
    const vr = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
    const vp = new THREE.Vector3(position.x, position.y, position.z);
    ref.current.rotation.set(...vr)
    ref.current.position.set(...vp)
    currentCamera.current += 1
    if (currentCamera.current >= cameraPositions.current.length)
      currentCamera.current = 0 
    console.log(ref.current)
  }
  const score = useRef()
  const map = useMemo(()=>[
    { name: 'leftOther', keys: ['ArrowLeft'] },
    { name: 'rightOther', keys: ['ArrowRight'] },
    { name: 'left', keys: [ 'KeyA'] },
    { name: 'right', keys: ['KeyD'] }
  ], [])
  const [status , setStatus] = useState({win:false,endGame:false})
  const handleWin = (win,endGame)=> {
    setStatus(()=>({win:win, endGame:endGame}))
  }
  return (
    <>
      <div className="h-[100%] w-[100%] flex flex-col items-center justify-center ">
        <Header gameName={"PING PONG"}/>
        <div className=" h-[70%] relative xsm:w-[96%] md:w-[80%] max-w-[1400px] rounded-[20px] flex justify-center items-center text-white flex-col bg-secondaryColor border-[2px] border-forthColor">
        {status.endGame && <Win iswin={status.win}/>}
        <ScoreBar ref={score}/>
          <button className=" lg:h-[40px] lg:w-[60px] xsm:h-[20px] xsm:w-[40px]" onClick={handleCamera}> <VscDeviceCameraVideo className="h-[100%] w-[100%]" style={{color: 'white'}} /></button>
        <hr className="h-[2px] xsm:w-[95%] lg:w-[90%] max-w-[1400px] bg-thirdColor my-6"/>
          <Canvas >
            <PerspectiveCamera ref={ref} makeDefault rotation={[0, 0 , 0]} fov={75} position={[0, 1,3.5]}/>
            <OrbitControls/>
            <ambientLight />
            {/* <Environment preset='sunset'  background/> */}
            <Stage   adjustCamera={true} intensity={1}  environment="city" >
              <KeyboardControls map={map}>
                <Game ref={score} handleWin={handleWin} endGame={status.endGame}/>
              </KeyboardControls>
            </Stage>
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default PingPongGame;