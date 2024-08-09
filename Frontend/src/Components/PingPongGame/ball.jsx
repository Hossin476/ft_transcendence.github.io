import { forwardRef } from "react"


const Ball = forwardRef((props,ref)=>{
    return (
        <>
            <mesh position={props.position} ref={ref}>
                <sphereGeometry args={[0.03]}/>
                <meshStandardMaterial color={'red'}/>
            </mesh>
        </>
        
    )
})

export default  Ball;
