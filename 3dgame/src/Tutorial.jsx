import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls, StatsGl, TransformControls } from '@react-three/drei';
// import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Custom from './Custom';
import { Euler } from 'three';
// import { euler } from '@react-three/rapier';
// import { CineonToneMapping } from 'three';

// extend({ OrbitControls })

function Container() {

    const cube = useRef();
    const sphereRef = useRef();
    const groupRef = useRef();

    // const { camera, gl } = useThree();
    let euler = new Euler(0, Math.PI / 2, 0,);

    useFrame((state, delta) => {
        
        // console.log(state.camera.position);

        // state.camera.position.x = Math.sin(state.clock.elapsedTime);
        // state.camera.position.z = Math.cos(state.clock.elapsedTime) ;
        // state.camera.lookAt(0,0,5);
        // state.camera = {position:[Math.sin(state.clock.elapsedTime), 0, Math.cos(state.clock.elapsedTime)]};
        // console.log(state)
        // cube.current.rotation = euler;
        // sphereRef.current.rotation.y += 0.001;
        // console.log("test");
        groupRef.current.rotation.y += 0.01;
        // state.camera.position.z += 0.01;
    })

    return (
        <>
             {/* <orbitControls args={[camera, gl.domElement]} />  */}
            <StatsGl />
            {/* <spotLight position={[0,5,0]} intensity={50}/>
             */}
             <OrbitControls makeDefault />
            <TransformControls object={cube} mode='rotate' />
            <directionalLight position={[0, 1, 4]} intensity={2} />
            <ambientLight intensity={1}/>
            <group ref={groupRef}>
                <mesh position-x={-1.5} position-z={1} rotation-y={Math.PI * 0.25} ref={cube}>
                    <boxGeometry />
                    <meshStandardMaterial color={'cyan'} />
                </mesh>
                <mesh position-x={2} ref={sphereRef} >
                    <sphereGeometry />
                    <meshStandardMaterial color={'coral'} />
                </mesh>
            </group>

            <mesh scale={10} position-y={-1} rotation-x={- Math.PI * 0.5}>
                <planeGeometry />
                <meshStandardMaterial color={'chartreuse'} />
            </mesh>
        </>
    )

}

function Tutorial() {

    // const [count, setCounter] = useState(0);

    // useEffect(() => {
        // document.body.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    // }, [count])

    // const [name, setname] = useState('');

    return (
        <div className='container'>
            {/* <h1>Count:{count}</h1> */}
            {/* <button onClick={() => setCounter(count + 1)}>inc</button> */}
            <Canvas camera={
                {
                    fov:75,
                    near:0.1,
                    far:200
                }
            }
             >
                <Container />
                {/* <Custom/> */}
            </Canvas>
        </div>
    )
}

export default Tutorial;