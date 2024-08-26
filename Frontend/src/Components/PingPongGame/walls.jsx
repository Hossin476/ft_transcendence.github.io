

export default function Walls() {
  return (
    <>
      <mesh position={[1-1.05, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.2, 4]} />
        <meshStandardMaterial color={"white"} roughness={0.1} metalness={0.7} />
      </mesh>
      <mesh position={[1+1.05, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.2, 4]} />
        <meshStandardMaterial color={"white"}  roughness={0.1} metalness={0.7}/>
      </mesh>
    </>
  );
}
