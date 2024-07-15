

import { Environment, Line, OrbitControls, Stage } from "@react-three/drei";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { forwardRef } from "react";
import { Physics, RigidBody } from "@react-three/rapier";



/* TODO: add the hidden tiles, make them clickable to render either the x or the o meshes, manage state */

//? The positions of the meshes
const positions = [
    [-1, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
    [-1, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [-1, -1, 0],
    [0, -1, 0],
    [1, -1, 0],
];

function Game() {
    const [board, setBoard] = useState(Array(9).fill(null));
    // const [winnerLine, setWinnerLine] = useState(null);

    // const handleClick = (index) => {
    //     const newBoard = board.slice();
    //     if (calculateWinner(board) || newBoard[index]) return;
    //     newBoard[index] = xIsNext ? "X" : "O";
    //     setBoard(newBoard);
    //     setXIsNext(!xIsNext);
    // };

    // const winner = calculateWinner(board);
    // const isBoardFull = board.every(cell => cell !== null);

    // const resetGame = () => {
    //     setBoard(Array(9).fill(null));
    //     setXIsNext(true);
    //     // setWinnerLine(null);
    // };

    // if (winner) {
    //     // setWinnerLine(winner.line);
    //     console.log(`Winner: ${winner.player}`);
    //     setTimeout(() => resetGame(), 4000);
    // }

    // if (!winner && isBoardFull) {
    //     console.log('Draw');
    //     setTimeout(() => resetGame(), 4000);
    // }

    // const renderXO = (value, index) => {
    //     if (value === "X") return <MeshX key={index} position={positions[index]} />;
    //     if (value === "O") return <MeshO key={index} position={positions[index]} />;
    //     return null;
    // };
    const xIsNext = useRef(false)



    return (
        <div className="bottom_layer h-[90%] sm:flex xsm:flex justify-evenly items-center w-full">
            <Canvas dpr={window.devicePixelRatio}  camera={{fov: 75 ,position:[0,0,-6]}}>
                <OrbitControls />
                <Suspense fallback={null}>
                        <ambientLight intensity={0.4} />
                        <pointLight position={[10, 10, 10]} />
                    <Stage contactShadow shadows adjustCamera intensity={1} environment="city">
                        <Physics gravity={[0, 0, 9.8]}>
                            <RigidBody colliders='cuboid' type='kinematicPosition' position={[0,0,0.1]}>
                                <mesh>
                                    <boxGeometry args={[3,3,0]}/>
                                    <meshStandardMaterial attach="material" color={'#1A1333'} transparent opacity={0.2} metalness={0.3} roughness={0.3}/>
                                </mesh>
                            </RigidBody>
                            <TicTacToeGrid />
                            {positions.map((item , index)=> <Holder key={index} position={item}  ref={xIsNext}/>)}
                        </Physics>
                    </Stage>
                </Suspense>
            </Canvas>
        </div>
    );
}


const Holder = forwardRef( ({position},ref) =>{
    const [click, setClick] = useState(false)
    const handleClick = ()=> {
         setClick(true)
         ref.current  = !ref.current
    }
    return (
        <>
        {!click ? 
            <mesh position={position} onClick={handleClick}>
                <boxGeometry args={[0.9,0.9,0]}/>
                <meshStandardMaterial attach="material" color={'#1A1333'} transparent opacity={0} />
            </mesh>: ref.current ?  <MeshX position={position} /> : <MeshO  position={position} />}
        </>
    )
})

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { player: squares[a], line: [positions[a],positions[b], positions[c]] };
        }
    }
    return null;
};

const MeshX = ({ position }) => {

    return (
        <RigidBody position={[position[0],position[1],position[2]-1]} restitution={1}>
            <group>
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <boxGeometry args={[0.6, 0.1, 0.1]} />
                    <meshStandardMaterial color="green" />
                </mesh>
                <mesh rotation={[0, 0, -Math.PI / 4]}>
                    <boxGeometry args={[0.6, 0.1, 0.1]} />
                    <meshStandardMaterial color="green" />
                </mesh>
            </group> 
        </RigidBody>

    )
}

const MeshO = ({ position }) => {

    return (
        <RigidBody position={[position[0],position[1],position[2]-1]} restitution={0.9} >
            <mesh >
                <torusGeometry args={[0.2, 0.07, 16, 100]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    )
    
}

// const WinnerLine = ({ line }) => (
//     <Line
//         points={line}
//         color="yellow"
//         lineWidth={8}
//     />
// );

const TicTacToeGrid = () => {
    const lines = [
        [[-0.5, 1.5, 0], [-0.5, -1.5, 0]],
        [[0.5, 1.5, 0], [0.5, -1.5, 0]],
        [[-1.5, 0.5, 0], [1.5, 0.5, 0]],
        [[-1.5, -0.5, 0], [1.5, -0.5, 0]],
    ];
    return (
        <>
            {lines.map((line, index) => (
                <Line key={index} points={line} color="white" lineWidth={10} />
            ))}
        </>
    );
};

export default Game;
