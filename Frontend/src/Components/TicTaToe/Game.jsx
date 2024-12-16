import React, { useState, memo, useEffect, useRef, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls, Sky, Line } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { useTicTacToe } from '../../context/TicTacToeContext';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import Win from './win';
import StartModal from './StartModal'
import ReconnectModal from './ReconnectModal'
import Draw from './Draw';
import useWebSocket from './useWebSocket';
import handleWebSocketMessage from './handleData';

const WS_ONLINE_URL = `wss://${window.location.host}/ws/game/tictactoe`;
const WS_OFFLINE_URL = `wss://${window.location.host}/ws/game/tictactoe/offline`;

const GRID_POSITIONS = [
    [-1, 1, 0], [0, 1, 0], [1, 1, 0],
    [-1, 0, 0], [0, 0, 0], [1, 0, 0],
    [-1, -1, 0], [0, -1, 0], [1, -1, 0],
];

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(0));
    const [winnerLine, setWinnerLine] = useState(null);
    const [finalWinner, setFinalWinner] = useState(null);
    const [showReconnectModal, setShowReconnectModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);
    const [startCountdownValue, setStartCountdownValue] = useState(0);
    const [currentTurn, setCurrentTurn] = useState(null);
    const [draw, setDraw] = useState(false);
    const startModalShownRef = useRef(false);

    const { setScores, setTimer, setPlayerRole, setReconnectTimer, playerRole } = useTicTacToe();
    const { tokens, customFetch } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const gameId = location.state?.gameid;
    const isOnline = location.state?.isonline;

    const fetchGame = useCallback(async () => {
        const fetchUrl = `/api/is_game_over/${gameId}/?type=${isOnline === true ? 'online' : 'offline'}`;
        try {
            const response = await customFetch(fetchUrl, {
                headers: {
                    "Authorization": `JWT ${tokens.access}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (data?.is_end)
                navigate('/game')
        } catch (error) {
            navigate('/game');
        }
    }, [tokens.access, gameId, navigate]);

    const url = `${isOnline === true ? WS_ONLINE_URL : WS_OFFLINE_URL}/${gameId}/?token=${tokens?.access}`;

    useEffect(() => {
        if (gameId) fetchGame();
        else
            navigate('/game');
    }, [gameId, fetchGame]);

    const handleMessage = useCallback((data) => {
        handleWebSocketMessage(
            data,
            setBoard,
            setFinalWinner,
            setDraw,
            setShowReconnectModal,
            setReconnectTimer,
            setStartCountdownValue,
            startModalShownRef,
            setShowStartModal,
            setCurrentTurn,
            setScores,
            setTimer,
            setPlayerRole,
            setWinnerLine
        );
    }, [setScores, setTimer, setPlayerRole, setReconnectTimer, setCurrentTurn]);
    const sendMessage = useWebSocket(url, handleMessage);

    const handleCellClick = useCallback((index) => {
        if (!board[index]) sendMessage({ action: 'move', index });
    }, [board, sendMessage]);

    const TurnIndicator = () => {
        const isYourTurn = currentTurn === playerRole;
        return (
            <div className={`absolute top-1 left-1/2 tranform -translate-x-1/2 p-2 rounded ${isYourTurn ? 'bg-green-500' : 'bg-red-500'} text-white font-bold`}>
                {isYourTurn ? "It's your turn!" : "Opponent's turn"}
            </div>
        );
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
                            <GameBoard />
                            <GamePieces board={board} handleClick={handleCellClick} />
                            {winnerLine && <WinnerLine line={winnerLine} />}
                        </Physics>
                    </Stage>
                </Suspense>
            </Canvas>
            {finalWinner && <Win final_winner={finalWinner} />}
            {!finalWinner && showReconnectModal && !showStartModal && <ReconnectModal />}
            {showStartModal && (
                <StartModal
                    currentPlayer={playerRole}
                    countdownValue={startCountdownValue}
                />
            )}
            {!finalWinner && !showStartModal && isOnline && !winnerLine && !showReconnectModal && !draw && (
                <TurnIndicator />
            )}
            {draw && <Draw />}
        </div>
    );
};

const GameBoard = () => (
    <>
        <RigidBody colliders="cuboid" type="kinematicPosition" position={[0, 0, 0.1]}>
            <mesh>
                <boxGeometry args={[3, 3, 0]} />
                <meshStandardMaterial attach="material" color="#1A1333" transparent opacity={0} />
            </mesh>
        </RigidBody>
        <TicTacToeGrid />
    </>
);

const GamePieces = memo(({ board, handleClick }) => (
    <>
        {GRID_POSITIONS.map((position, index) => (
            <GameCell
                key={index}
                position={position}
                value={board[index]}
                onClick={() => handleClick(index)}
            />
        ))}
    </>
));

const GameCell = memo(({ position, value, onClick }) => (
    value ? (
        value === 'X' ? <MeshX position={position} /> : <MeshO position={position} />
    ) : (
        <mesh position={position} onClick={onClick}>
            <boxGeometry args={[0.9, 0.9, 0]} />
            <meshStandardMaterial attach="material" color="#1A1333" transparent opacity={0} />
        </mesh>
    )
));

const MeshX = ({ position }) => {
    const Xcolor = JSON.parse(localStorage.getItem("TicSettings")) || { X: "green" };
    return (
        <RigidBody position={[position[0], position[1], position[2] - 1]} restitution={0.5}>
            <group>
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <boxGeometry args={[0.6, 0.1, 0.1]} />
                    <meshStandardMaterial color={Xcolor.X} />
                </mesh>
                <mesh rotation={[0, 0, -Math.PI / 4]}>
                    <boxGeometry args={[0.6, 0.1, 0.1]} />
                    <meshStandardMaterial color={Xcolor.X} />
                </mesh>
            </group>
        </RigidBody>
    )
}

const MeshO = ({ position }) => {
    const Ocolor = JSON.parse(localStorage.getItem("TicSettings")) || { O: "red" };
    return (
        <RigidBody position={[position[0], position[1], position[2] - 1]} restitution={0.5}>
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[0.25, 0.08, 16, 48]} />
                <meshStandardMaterial color={Ocolor.O} />
            </mesh>
        </RigidBody>
    )
}

const TicTacToeGrid = () => (
    <>
        <Line points={[[-1.5, 0.5, 0], [1.5, 0.5, 0]]} color="#E5DDC8" lineWidth={10} />
        <Line points={[[-1.5, -0.5, 0], [1.5, -0.5, 0]]} color="#E5DDC8" lineWidth={10} />
        <Line points={[[0.5, 1.5, 0], [0.5, -1.5, 0]]} color="#E5DDC8" lineWidth={10} />
        <Line points={[[-0.5, 1.5, 0], [-0.5, -1.5, 0]]} color="#E5DDC8" lineWidth={10} />
    </>
);

const WinnerLine = ({ line }) => (
    <Line points={line} color="#FFBF00" lineWidth={10} />
);

export default Game;