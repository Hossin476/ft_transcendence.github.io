

export default function Table() {
  return (<>
      <mesh position={[1,0,0]}>
        <boxGeometry args={[2, 0.1, 4]} />
        <meshStandardMaterial roughness={0.1} metalness={0.7}/>
      </mesh>
      <mesh rotation={[0,-Math.PI/2,0]} position={[1,0,0]}>
        <boxGeometry args={[0.03, 0.101, 2]}  />
        <meshStandardMaterial color={'black'} roughness={0.1} metalness={0.7}/>
      </mesh>
  </>
  );
}
