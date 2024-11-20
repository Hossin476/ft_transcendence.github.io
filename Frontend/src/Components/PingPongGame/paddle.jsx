import { forwardRef } from "react";

const Paddle = forwardRef((props, ref) => {
    const PaddleColor = JSON.parse(localStorage.getItem("PingSettings")) || { Paddle: "Purple" };
  return (
    <mesh position={props.position} ref={ref}>
      <boxGeometry args={[0.5, 0.1, 0.05]} />
      <meshStandardMaterial color={PaddleColor?.Paddle} roughness={0.1} metalness={0.7} />
    </mesh>
  );
});

export default Paddle;
