import { OrbitControls } from '@react-three/drei';
import React, { useMemo, useRef, useEffect } from 'react'
import { DoubleSide } from 'three';

export default function Custom() {

    const vertices = 30;
    // const positions = new Float32Array(30 * 3);

    const geometryRef = useRef();

    useEffect(() => {
        geometryRef.current.computeVertexNormals();
    }, [])



    const positions = useMemo(() => {
        const positions = new Float32Array(90);
        for (let i = 0; i < 90; i++)
            positions[i] = (Math.random() - 0.5) * 3;

        return positions;
    }, [])
    return (
        <>
            <OrbitControls /> 
            <mesh > 
                {/* <ambientLight intensity={1} /> */}
                {/* <directionalLight intensity={5} position={[0,4,0]}/> */}
                <bufferGeometry ref={geometryRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={vertices}
                        itemSize={3}
                        array={positions}
                    />
                </bufferGeometry>
                <meshStandardMaterial color={"red"} side={DoubleSide} />
            </mesh>
        </>

    )
}
