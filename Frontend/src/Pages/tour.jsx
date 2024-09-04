import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Stage,
  OrbitControls,
  Environment,
  KeyboardControls,
  Text
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { HemisphereLight, SphereGeometry, TextureLoader } from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useGLTF } from '@react-three/drei';
import { IoMdExit } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";


// const Model = () => {
//   const gltf = useLoader(GLTFLoader, './golden_trophy.glb');

//   return <primitive object={gltf.scene} dispose={null} />;
// };

const UserBox  = ({username, position, boxcolor})=>{
  const texture = useLoader(TextureLoader, "copper.jpg");
  return (
    <mesh position={position}>
      <mesh position={[-0.4, 0, 0.2]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color={"white"} map={texture} />
        <Text
          position={[0.5, 0, 0]} // Position of the text
          color="white" // Color of the text
          fontSize={0.15} // Font size
          maxWidth={0.1}
          anchorX={'center'}
          fontWeight={1000}
        >
        {username} 
      </Text>
    </mesh>
    <boxGeometry args={[1.3, 0.7, 0.3]} />
    <meshStandardMaterial color={"#B795D0"} roughness={0.1} metalness={0.7}/>
  </mesh>
  )
}

const Tour = () => {
  const texture = useLoader(TextureLoader, "copper.jpg");
  return (
    <div className="h-[100%] w-[100%] flex flex-col relative gap-5">
      <div className=" h-[70%] relative xsm:w-[99%] md:w-[70%] md:h-[70%] max-w-[1300px] rounded-[20px] flex justify-center items-center text-white flex-col bg-secondaryColor border-[2px] border-forthColor">
        <Canvas >
          <ambientLight intensity={0.7} rotation={[Math.PI/2,0,0]}/>
          <pointLight position={[10, 10, 10]} rotation={[0,Math.PI/2,0]}/>
          <OrbitControls />
          <Stage adjustCamera={true} intensity={1}>
            <UserBox position={[1.6,0,0]} username={"hamza"} boxcolor={'blue'}/>
            <UserBox position={[4, 1.3, 0]} username={"hamza"} boxcolor={'green'}/>
            <UserBox position={[4, -1.3, 0]} username={"hamza"} boxcolor={'yellow'}/>
            <UserBox position={[4, -2.3, 0]} username={"hamza"} boxcolor={'cyan'}/>
            <UserBox position={[4, 2.3, 0]} username={"hamza"} boxcolor={'magenta'}/>
            <UserBox position={[2.5, -1.8, 0]} username={"hamza"} boxcolor={'chartreuse'}/>
            <UserBox position={[2.5, 1.8, 0]} username={"hamza"} boxcolor={'blue'}/>
            <UserBox position={[0, 1, 0]} username={"hamza"} boxcolor={'white'}/>
            <UserBox position={[-1.6, 0, 0]} username={"hamza"} boxcolor={'chartreuse'}/>
            <UserBox position={[-4, 1.3, 0]} username={"hamza"} boxcolor={'red'}/>
            <UserBox position={[-4, -1.3, 0]} username={"hamza"} boxcolor={'yellow'}/>
            <UserBox position={[-4, -2.3, 0]} username={"hamza"} boxcolor={'blue'}/>
            <UserBox position={[-4, 2.3, 0]} username={"hamza"} boxcolor={'magenta'}/>
            <UserBox position={[-2.5, -1.8, 0]} username={"hamza"} boxcolor={'cyan'}/>
            <UserBox position={[-2.5, 1.8, 0]} username={"hamza"} boxcolor={'green'}/>
          </Stage>
        </Canvas>
      </div>
      <div className="h-[calc(100%-70%)] xsm:w-[99%] md:w-[70%] gap-2 rounded-[20px] flex-col flex text-white   bg-secondaryColor border-[2px] border-forthColor justify-between font-inter">
        <div className="flex justify-center w-[100%]  min-w-[150px] ">
          <p className="font-Valorax">PLAYER IN TOURNAMENT</p>
        </div>
        <div className=" flex justify-end gap-4 mx-10">
           <button className="border-[2px] border-forthColor rounded-[5px]">START TOURNAMENT</button>
           <GiExitDoor fontSize={30} className=""/>
        </div>
        <div className="flex  w-[100%] h-[70%]  flex-wrap justify-center">
          <div className="flex items-center  w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
             <img src="./silver.jpg" className="rounded-full w-[52px] h-[52px]"/>
             <div className="flex flex-col">
                <p>Hamza Younsi</p>
                <p className="text-[10px] font-inter">RANK 2</p>
             </div>
          </div>
          <div className="flex items-center  w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
             <img src="./silver.jpg" className="rounded-full w-[52px] h-[52px]"/>
             <div className="flex flex-col">
                <p>Hamza Younsi</p>
                <p className="text-[10px] font-inter">RANK 2</p>
             </div>
          </div>
          <div className="flex items-center  w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
             <img src="./silver.jpg" className="rounded-full w-[52px] h-[52px]"/>
             <div className="flex flex-col">
                <p>Hamza Younsi</p>
                <p className="text-[10px] font-inter">RANK 2</p>
             </div>
          </div>
          <div className="flex items-center  w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
             <img src="./silver.jpg" className="rounded-full w-[52px] h-[52px]"/>
             <div className="flex flex-col">
                <p>Hamza Younsi</p>
                <p className="text-[10px] font-inter">RANK 2</p>
             </div>
          </div>
          <div className="flex items-center  w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
             <img src="./silver.jpg" className="rounded-full w-[52px] h-[52px]"/>
             <div className="flex flex-col">
                <p>Hamza Younsi</p>
                <p className="text-[10px] font-inter">RANK 2</p>
             </div>
          </div>
          <div className="flex items-center  w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
             <img src="./silver.jpg" className="rounded-full w-[52px] h-[52px]"/>
             <div className="flex flex-col">
                <p>Hamza Younsi</p>
                <p className="text-[10px] font-inter">RANK 2</p>
             </div>
          </div>
          <div className="flex items-center  w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
             <img src="./silver.jpg" className="rounded-full w-[52px] h-[52px]"/>
             <div className="flex flex-col">
                <p>Hamza Younsi</p>
                <p className="text-[10px] font-inter">RANK 2</p>
             </div>
          </div>
          <div className="flex items-center  w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
             <img src="./silver.jpg" className="rounded-full w-[52px] h-[52px]"/>
             <div className="flex flex-col">
                <p>Hamza Younsi</p>
                <p className="text-[10px] font-inter">RANK 2</p>
             </div>
          </div>
        </div>

              
           
      </div>
    </div>
  );
};

export default Tour;
