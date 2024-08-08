import React, { useState, useEffect, forwardRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls, Stage, Sky } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';

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

function Game({ updateScores }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winnerLine, setWinnerLine] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);

    const handleClick = (index) => {
        if (isGameOver || board[index]) return;

        const newBoard = board.slice();
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);

        const winner = calculateWinner(newBoard);
        if (winner) {
            setWinnerLine(winner.line);
            updateScores(winner.player);
            setIsGameOver(true);
        } else if (newBoard.every(cell => cell !== null)) setIsGameOver(true);
    };

    useEffect(() => {
        if (isGameOver) {
            const timer = setTimeout(() => resetGame(), 5000);
            return () => clearTimeout(timer);
        }
    }, [isGameOver]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setWinnerLine(null);
        setIsGameOver(false);
    };

    return (
        <div className="h-[70%] w-full flex items-center justify-evenly">
            <Canvas dpr={window.devicePixelRatio} camera={{ fov: 75, position: [0, 0, -6] }}>
                <Sky mieCoefficient={0.001} mieDirectionalG={6} rayleigh={4} sunPosition={[0, 0, 1]} turbidity={8} />
                <OrbitControls />
                <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} />
                    <Stage contactShadow shadows adjustCamera intensity={1} environment="city">
                        <Physics gravity={[0, 0, 9.81]}>
                            <RigidBody colliders="cuboid" type="kinematicPosition" position={[0, 0, 0.1]}>
                                <mesh>
                                    <boxGeometry args={[3, 3, 0]} />
                                    <meshStandardMaterial attach="material" color="#1A1333" transparent opacity={0} />
                                </mesh>
                            </RigidBody>
                            <TicTacToeGrid />
                            {positions.map((item, index) => (
                                <Holder key={index} position={item} board={board} index={index} handleClick={handleClick} />
                            ))}
                            {winnerLine && <WinnerLine line={winnerLine} />}
                        </Physics>
                    </Stage>
                </Suspense>
            </Canvas>
        </div>
    );
}

const Holder = forwardRef(({ position, board, index, handleClick }, ref) => {
    const value = board[index];

    const onClick = () => {
        if (!value) {
            handleClick(index);
        }
    };

    return (
        <>
            {!value ? (
                <mesh position={position} onClick={onClick}>
                    <boxGeometry args={[0.9, 0.9, 0]} />
                    <meshStandardMaterial attach="material" color="#1A1333" transparent opacity={0} />
                </mesh>
            ) : value === 'X' ? (
                <MeshX position={position} />
            ) : (
                <MeshO position={position} />
            )}
        </>
    );
});

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
            return { player: squares[a], line: [positions[a], positions[b], positions[c]] };
        }
    }
    return null;
};

const MeshX = ({ position }) => (
    <RigidBody position={[position[0], position[1], position[2] - 1]} restitution={0.5}>
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
);

const MeshO = ({ position }) => (
    <RigidBody position={[position[0], position[1], position[2] - 1]} restitution={0.5}>
        <mesh>
            <torusGeometry args={[0.2, 0.07, 16, 48]} />
            <meshStandardMaterial color="red" />
        </mesh>
    </RigidBody>
);

const WinnerLine = ({ line }) => <Line points={line} color="yellow" lineWidth={8} />;

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
