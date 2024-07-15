/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import React, { Suspense, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Line, OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";

extend({ BoxBufferGeometry: THREE.BoxGeometry, TorusBufferGeometry: THREE.TorusGeometry });

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
    const [xIsNext, setXIsNext] = useState(true);
    // const [winnerLine, setWinnerLine] = useState(null);

    const handleClick = (index) => {
        const newBoard = board.slice();
        if (calculateWinner(board) || newBoard[index]) return;
        newBoard[index] = xIsNext ? "X" : "O";
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const winner = calculateWinner(board);
    const isBoardFull = board.every(cell => cell !== null);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        // setWinnerLine(null);
    };

    if (winner) {
        // setWinnerLine(winner.line);
        console.log(`Winner: ${winner.player}`);
        setTimeout(() => resetGame(), 4000);
    }

    if (!winner && isBoardFull) {
        console.log('Draw');
        setTimeout(() => resetGame(), 4000);
    }

    const renderXO = (value, index) => {
        if (value === "X") return <MeshX key={index} position={positions[index]} />;
        if (value === "O") return <MeshO key={index} position={positions[index]} />;
        return null;
    };

    return (
        <div className="bottom_layer h-[90%] sm:flex xsm:flex justify-evenly items-center w-full">
            <Canvas dpr={window.devicePixelRatio}>
                <OrbitControls />
                <Suspense fallback={null}>
                    <Stage contactShadow shadows adjustCamera intensity={1} environment="city">
                        <ambientLight intensity={0.4} />
                        <pointLight position={[10, 10, 10]} />
                        <TicTacToeGrid />
                        <MeshX key={0} position={positions[0]} />;
                        <MeshX key={1} position={positions[1]} />;
                        <MeshO key={2} position={positions[2]} />;
                        <MeshX key={3} position={positions[3]} />;
                        <MeshX key={4} position={positions[4]} />;
                        <MeshO key={5} position={positions[5]} />;
                        <MeshX key={6} position={positions[6]} />;
                        <MeshX key={7} position={positions[7]} />;
                        <MeshO key={8} position={positions[8]} />;
                        {/* {board.map((value, index) => renderXO(value, index))} */}
                        {/* <WinnerLine line={[[-1,1,0], [0,1,0], [1,1,0]]} /> */}
                    </Stage>
                </Suspense>
            </Canvas>
        </div>
    );
}

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

const MeshX = ({ position }) => (
    <mesh position={position} >
        <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxBufferGeometry args={[0.6, 0.1, 0.1]} />
            <meshStandardMaterial color="green" />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
            <boxBufferGeometry args={[0.6, 0.1, 0.1]} />
            <meshStandardMaterial color="green" />
        </mesh>
    </mesh>
);

const MeshO = ({ position }) => (
    <mesh position={position}>
        <torusBufferGeometry args={[0.2, 0.07, 16, 100]} />
        <meshStandardMaterial color="red" />
    </mesh>
);

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
