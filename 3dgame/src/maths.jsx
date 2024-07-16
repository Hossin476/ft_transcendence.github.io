import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Euler } from 'three';

function SpinningBox() {
  const meshRef = useRef(null);
  const euler = new Euler(0, Math.PI * 0.5, 0); // Initial rotations

  useFrame(() => {
    euler.x += 0.01; // Update rotations over time
    euler.y += 0.02;
    // meshRef.current.rotation = euler; // Apply using quaternion
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

function Maths() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 1]} />
      <SpinningBox />
    </Canvas>
  );
}

export default Maths;