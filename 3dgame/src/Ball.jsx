import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Helper, OrbitControls, PivotControls, Sky, Stars, StatsGl, Text3D, TransformControls } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';

function Ball_mesh({ mousePosition }) {
  const ballRef = useRef();

  useFrame(() => {
    if (ballRef.current) {
      ballRef.current.setTranslation({
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        z: 0
      }, true);
    }
  });

  return (
    <RigidBody type='dynamic' mass={100} restitution={1} linearDamping={0} linearVelocity={[0, 10, 0]} colliders="ball" onContactForce={(payload) => {
      console.log(`The total force generated was: ${payload.totalForce.y}`);
    }}>
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </RigidBody>
  );
}

function Plane() {
  return (
    <RigidBody type="dynamic" restitution={1} >
      <mesh rotation-x={-Math.PI / 2} position={[0, -2, 0]} scale={[10, 10, 1]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </RigidBody>
  );
}

function Scene({ mousePosition }) {
  return (
    <Canvas camera={{ position: [0, 5, 20], fov: 75 }}>
      {/* <Environment background blur={0} preset="night" /> */}
      <Suspense fallback={null}>
        <StatsGl />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Physics gravity={[0, -9.81, 0]} debug>
          <Ball_mesh mousePosition={mousePosition} />
          <Plane />
        </Physics>
        {/* <OrbitControls /> */}
      </Suspense>
    </Canvas>

  );
}

function Ball() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 10 - 5;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 10 + 5;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='container' style={{ width: '100vw', height: '100vh' }}>
      <Scene mousePosition={mousePosition} />
    </div>
  );
}

export default Ball;