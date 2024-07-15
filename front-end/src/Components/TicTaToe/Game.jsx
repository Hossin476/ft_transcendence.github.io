import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls, Stage } from "@react-three/drei";
import { Vector3 } from "three";

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

function Game({ renderCell }) {


    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (index) => {
        const newBoard = board.slice();
        // if (calculateWinner(board) || newBoard[index]) return;
        newBoard[index] = xIsNext ? "X" : "O";
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const winner = calculateWinner(board);
    const isBoardFull = board.every(cell => cell !== null);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    if (winner) {
        resetGame();
        console.log(`Winner: ${winner}`);
    }

    if (!winner && isBoardFull) {
        resetGame();
        console.log('Draw');
    }

    const renderBox = (value, index) => (
        <Box
            key={index}
            position={positions[index]}
            args={[0.8, 0.8, 1]}
            onClick={() => handleClick(index)}
        >
            <meshStandardMaterial color={value === "X" ? "green" : value === "O" ? "red" : "white"} />
        </Box>
    );

    return (
        <div className="bottom_layer md:grid lg:grid sm:flex xsm:flex h-5/6 justify-center items-center px-10 w-full" >
            <Canvas>
                <Suspense fallback={null}>
                    <Stage contactShadow shadows adjustCamera intensity={1} environment="city" >
                        <OrbitControls />
                        <ambientLight intensity={0.4} />
                        <pointLight position={[10, 10, 10]} />
                        {board.map((value, index) => renderBox(value, index))}
                    </Stage>
                </Suspense>
            </Canvas>
        </div>
    )
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
            return squares[a];
        }
    }
    return null;
};

export default Game;