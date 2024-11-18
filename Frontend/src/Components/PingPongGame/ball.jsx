import { forwardRef } from "react"


const Ball = forwardRef((props,ref)=>{

    const BallColor = JSON.parse(localStorage.getItem("PingSettings")) || {Ball: "Red"};
    return (
        <>
            <mesh position={props.position} ref={ref}>
                <sphereGeometry args={[0.03]}/>
                <meshStandardMaterial color={BallColor?.Ball}/>
            </mesh>
        </>
        
    )
})

export default  Ball;
