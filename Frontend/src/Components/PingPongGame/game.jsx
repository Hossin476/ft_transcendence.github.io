import { KeyboardControls, OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";
import Ball from "./ball";
import Table from "./table";
import Walls from "./walls";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE  from 'three'
import Paddle from "./paddle";
import { useKeyboardControls } from "@react-three/drei";
import { forwardRef } from "react";

function Game(props,scoreRef)
{

  const BallRef =  useRef()
  const MyPaddleRef= useRef()
  const  OtherPaddleRef = useRef()
  const positionBall = useRef({vx: 0.05, vz: 0.05, x: 0, z: 0.1 })
  const  [,get] = useKeyboardControls()
  useFrame(()=>{
      if(props.endGame)
          return 
      let move = get()
      const positionPaddle  = MyPaddleRef.current.position
      let x = positionPaddle.x
      if(move.left)
          x -= 0.04
      if (move.right)
          x += 0.04

      if(x >0.25 && x < 1.75)
              MyPaddleRef.current.position.x  = x;
      const positionOtherPaddle = OtherPaddleRef.current.position
      let OtherX = positionOtherPaddle.x
      if(OtherX - positionBall.current.x <=0.1  &&  positionBall.current.z < 0.2)
          OtherX += 0.04
      if(OtherX - positionBall.current.x >=-0.1  &&  positionBall.current.z < 0.2)
          OtherX -= 0.04
      if(move.leftOther)
          OtherX -= 0.04
      if(move.rightOther)
          OtherX += 0.04

      if(OtherX >0.25 && OtherX < 1.75)
          OtherPaddleRef.current.position.x = OtherX
      positionBall.current.x += positionBall.current.vx 
      positionBall.current.z += positionBall.current.vz
      if( positionBall.current.z >= 2.8 || positionBall.current.z <= -2.8 )
          {
              if(positionBall.current.z >= 2.8)
                {
                  let number = Number(scoreRef.current.Score2Ref.current.innerText) + 1
                  if(number == 7)
                    props.handleWin(false,true)
                  if(number >= 10)
                    scoreRef.current.Score2Ref.current.innerText = number
                  else 
                    scoreRef.current.Score2Ref.current.innerText = '0' + number
                }
                if(positionBall.current.z <= -2.8)
                  {
                    let number = Number(scoreRef.current.Score1Ref.current.innerText) + 1
                    if(number == 7)
                      props.handleWin(true,true)
                    if(number >= 10)
                      scoreRef.current.Score1Ref.current.innerText =  number
                    else
                      scoreRef.current.Score1Ref.current.innerText = '0' + number
                  }
              positionBall.current.z = 0
              if(positionBall.current.vz < 0)
                  positionBall.current.vz = 0.05
              else 
                  positionBall.current.vz = -0.05
              if(positionBall.current.vx < 0 )
                  positionBall.current.vx = 0.05 
              else
                  positionBall.current.vx = -0.05 
              positionBall.current.x = 1
          }
      if( positionBall.current.x >= 1.98 || positionBall.current.x <= 0.01 )
          positionBall.current.vx *= -1
      if((positionBall.current.z >= positionPaddle.z -0.05  && positionBall.current.z <= positionPaddle.z  )  &&
       (positionBall.current.x >= positionPaddle.x -0.3  && positionBall.current.x <= positionPaddle.x  + 0.3))
      {
          const collisionPosition =  positionPaddle.x - positionBall.current.x
          positionBall.current.vz *=  -1 
          positionBall.current.vx = collisionPosition * -0.2
      }
      if((positionBall.current.z >= positionOtherPaddle.z -0.05  && positionBall.current.z <= positionOtherPaddle.z  )  &&
       (positionBall.current.x >= positionOtherPaddle.x -0.3  && positionBall.current.x <= positionOtherPaddle.x  + 0.3))
      {
          const collisionPosition =  positionOtherPaddle.x - positionBall.current.x
          positionBall.current.vz *=  -1 
          positionBall.current.vx = collisionPosition * -0.2
      }
      BallRef.current.position.x = positionBall.current.x
      BallRef.current.position.z = positionBall.current.z
  })
    
   
    return (
      <>
        <Table/>
        <Paddle ref={MyPaddleRef} position={[1, 0.1, 1.92]}/>
        <Paddle ref={OtherPaddleRef} position={[1, 0.1, -1.92]}/>
        <Ball ref={BallRef}  position={[0,0.1,0]}/>
        <Walls/>
      </>
    )
}
export default forwardRef(Game)