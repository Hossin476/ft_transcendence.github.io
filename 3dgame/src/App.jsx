import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Sky } from '@react-three/drei';
import './style.css';
import Ball from './Ball'

const Model = ({ path, mousePosition }) => {
  const gltf = useGLTF(path);
  const modelRef = useRef();

  const { size, viewport } = useThree();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.x = ((mousePosition.current.x / size.width) * viewport.width - viewport.width / 2) / 2;
      modelRef.current.position.y = (-(mousePosition.current.y / size.height) * viewport.height + viewport.height / 2) / 2;
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} />;
};

const GLBViewer = ({ path, mousePosition }) => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model path={path} mousePosition={mousePosition} />
    </Suspense>
  );
};

const App = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current.x = event.clientX;
      mousePosition.current.y = event.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="container">
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 80] }}>
        <Sky
          mieCoefficient={0.001}
          mieDirectionalG={6}
          rayleigh={4}
          sunPosition={[
            1,
            0,
            0
          ]}
          turbidity={8} />
        <OrbitControls />
        {/* <Ball/> */}
        <GLBViewer path={"./pingpong.glb"} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default App;


