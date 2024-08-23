import React, { useState, useEffect, useRef, Suspense, useCallback, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Line, Stage, OrbitControls, Sky } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { useTicTacToe } from '../../context/TicTacToeContext';
import { useAuth } from '../../context/AuthContext';
import Win from './win';
import ReconnectModal from './ReconnectModal';


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

const Game = ({ room }) => {
    const socket = useRef(null);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [winnerLine, setWinnerLine] = useState(null);
    const [final_winner, setFinalWinner] = useState(null);
    const [reconnectModal, setReconnectModal] = useState(false)

    const { setScores, setTimer, setPlayerRole } = useTicTacToe();
    const { tokens } = useAuth();
    useEffect(() => {

        const online_url = `ws://localhost:8000/ws/game/${room}/?token=${tokens.access}`;
        // const online_url = `ws://localhost:8000/ws/game/${room}/?token=1`;
        // const local_url = `ws://localhost:8000/ws/game/local/room/${room}/?token=${tok}`;
        socket.current = new WebSocket(online_url);

        socket.current.onopen = () => {
            console.log('WebSocket connected');
            socket.current.onmessage = (e) => {
                const data = JSON.parse(e.data);
                if (data.state)
                    setBoard(data.state);
                if (data.winner_line) {
                    const winnerLinePoints = data.winner_line.map(index => positions[index]);
                    setWinnerLine(winnerLinePoints);
                }
                setScores({ X: data.score_x, O: data.score_o });
                if (!data.winner)
                    setWinnerLine(null);
                if (data.countdown !== undefined)
                    setTimer(data.countdown)
                if (data.player_role)
                    setPlayerRole(data.player_role)
                if (data.final_winner)
                    setFinalWinner(data.final_winner);
                if (data.reconnect_countdown !== undefined) {
                    setReconnectTimer(data.reconnect_countdown)
                    setReconnectModal(true);
                }
                else
                    setReconnectModal(false);
            };
        };

        socket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, []);

    const handleClick = useCallback((index) => {
        if (!board[index] && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({
                'action': 'move',
                'index': index
            }));
        }
    }, [board]);

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
            {final_winner && <Win final_winner={final_winner} />}
            {reconnectModal && <ReconnectModal/>}
        </div>
    );
};

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
        <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[0.25, 0.08, 16, 48]} />
            <meshStandardMaterial color="red" />
        </mesh>
    </RigidBody>
);

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
