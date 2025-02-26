import { Canvas } from "@react-three/fiber";
import {
   Stage,
   OrbitControls,
   Text
} from "@react-three/drei";
import { IoMdPersonAdd } from "react-icons/io";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { GiExitDoor } from "react-icons/gi";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom"
import InviteModal from "../Components/Tournament/InviteModal";
import { useTournament } from "../context/TournamentContext";
import { useNavigate } from 'react-router';
import TournamentForm from "../Components/tour/TournamentForm";
import { useTranslation } from "react-i18next";
// const Model = () => {
//   const gltf = useLoader(GLTFLoader, './golden_trophy.glb');

//   return <primitive object={gltf.scene} dispose={null} />;
// };

const UserBox = ({ username, position, image }) => {
   const texture = useLoader(TextureLoader, image ? image : "/media/main/anonym.png");
   return (
      <mesh position={position}>
         <mesh position={[-0.4, 0, 0.2]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial  map={texture} />
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
         <meshStandardMaterial color={"black"} roughness={0.1} metalness={0.7} />
      </mesh>
   )
}
const MatchesRound = ({ player1, player2, position1, position2, gameType }) => {
   let player1T = {name: "", image: ""}
   let player2T = {name: "", image: ""}
   if(gameType == "online") {
      player1T.name = player1?.username
      player1T.image = player1?.profile_image
      player2T.image = player2?.profile_image
      player2T.name = player2?.username
   }else {
      player1T.name = player1 ;
      player2T.name = player2;
   }
   return (
   <>
      <UserBox position={position1} username={player1 ? player1T.name : ""} image={player1 ? player1T.image : ""} />
      <UserBox position={position2} username={player2 ? player2T.name : ""} image={player2 ? player2T.image : ""} />
   </>
   )
}
const DisplayUser = ({ tournament, gameType }) => {
   const position = useMemo(() => {
      const ps = [
      [4, 1.3, 0],
      [4, 2.3, 0],
      [4, -1.3, 0],
      [4, -2.3, 0],
      [-4, -1.3, 0],
      [-4, -2.3, 0],
      [-4, 1.3, 0],
      [-4, 2.3, 0],
      [2.5, 1.8, 0],
      [2.5, -1.8, 0],
      [-2.5, -1.8, 0],
      [-2.5, 1.8, 0],
      [1.6, 0, 0],
      [-1.6, 0, 0],
   ]
   return  gameType=="online" ? ps : ps.slice(8);
},[gameType])

   return (
      <>
         {tournament && tournament.matches && tournament.matches && tournament.matches.map((item, key) => <MatchesRound key={key} gameType={gameType} player1={item.player1} player2={item.player2} position1={position[key * 2]} position2={position[key * 2 + 1]} />)}
         {tournament && gameType=="online" && tournament.winner != null  && <UserBox position={[0, 0.7, 0]} username={tournament.winner.username} image={tournament.winner.profile_image} />}
      </>

   )
}

const Tour = () => {
   const location = useLocation()
   const  {setTournamentSocket } = useTournament() 
   const { tokens, username, customFetch } = useAuth();
   const [tournament, setTournament] = useState(location.state.item)
   const [invite, setInvite] = useState(false)
   const [tour_socker, setTourSocket] = useState(null)
   const navigate = useNavigate();
   const { t } = useTranslation();

   

   function render_invite() {
      setInvite(true)
   }
   const fetch_matches = async () => {
      const url = `/api/tournament/${location.state.status === 'online' ? '' : 'offline/'}${tournament.id}`
      try {
         const response = await customFetch(url, {
            headers: { Authorization: "JWT " + tokens.access }
         })
         if (!response.ok){
            navigate('../');
            return;
         }
   
         const data = await response.json()
         setTournament(data)
      } catch(error) {
         
      }
   }

   useEffect(() => {
      fetch_matches();
      const wsurl = `wss://${window.location.host}/ws/tournament/${location.state.status === 'online' ? '' : 'offline/'}${tournament.id}`
      let ws = new WebSocket(`${wsurl}/?token=${tokens.access}`);
      ws.onopen = () => {
         setTourSocket(ws);
         setTournamentSocket(ws)
      };

      ws.onclose = () => {
         console.log("tournament socket close");
      };

      ws.onmessage = async (e) => {
            const data = await JSON.parse(e.data);
            if (data['type'] == "deleted_tour") {
               navigate('../');
               return;
            }
            fetch_matches();
      };
      return () => {
         if (ws)
               ws.close();
      };
}, []);



   const handleStartTour = ()=>{
      tour_socker.send(JSON.stringify({
         type: 'start_tournament'
      }))
   }

   const handleExit = ()=>{
      tour_socker.send(JSON.stringify({
         type: "exit_tour",
      }))
      navigate('../')
   }
   return (
      tournament && <div className="h-[100%] w-[100%] flex flex-col relative gap-5 justify-center items-center">
         <div className=" h-[70%] relative xsm:w-[99%] md:w-[70%]  max-w-[1300px] md:h-[70%] rounded-[20px] flex justify-center items-center text-white flex-col bg-secondaryColor border-[2px] border-forthColor">
             <Canvas >
               <ambientLight intensity={0.7} rotation={[Math.PI / 2, 0, 0]} />
               <pointLight position={[10, 10, 10]} rotation={[0, Math.PI / 2, 0]} />
               <OrbitControls />
               <Stage adjustCamera={true} intensity={1}>
                  <DisplayUser tournament={tournament} gameType={location.state.status}/>
               </Stage>
            </Canvas>
         </div>
         <div className="h-[calc(100%-80%)] xsm:w-[99%] md:w-[70%]  max-w-[1300px] gap-2 rounded-[20px] flex-col flex text-white bg-secondaryColor border-[2px] border-forthColor justify-between font-inter">
            {location.state.status != 'online' ? <TournamentForm id={tournament.id}/> :(
               <>
                  <div className="flex justify-center w-[100%]  min-w-[150px] ">
                     <p className="font-Valorax">{t("PLAYER IN TOURNAMENT")}</p>
                  </div>
                  <div className=" flex justify-end gap-4 mx-10">
                     {tournament.creator && tournament.creator.username == username && tournament.is_full && !tournament.is_start && <button className="border-[2px] border-forthColor rounded-[5px]" onClick={handleStartTour}>{t("START TOURNAMENT")}</button>}
                     {!tournament.is_start && < GiExitDoor fontSize={30}  onClick={handleExit}/>}
                  </div>
                  <div className="flex  w-[100%] h-[70%]  flex-wrap ">
                     {tournament.players  && tournament.players.map((item, index) =>
                        <div key={index} className="flex items-center  w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
                           <img src={item.profile_image} className="rounded-full w-[52px] h-[52px]" />
                           <div className="flex flex-col">
                              <p>{item.username}</p>
                              <p className="text-[10px] font-inter">{t("Rank")} {item.rank}</p>
                           </div>
                        </div>
                     )}
                     {tournament.creator &&  !tournament.is_full && tournament.creator.username == username && <div className="flex items-center justify-center w-[23%] h-[33%] gap-3 border-[2px] border-forthColor m-1  min-w-[150px] rounded-[20px]">
                        <IoMdPersonAdd size={30} style={{'cursor' : "pointer"}} onClick={render_invite}/>
                     </div>}
                  </div>
               </>
            )
               }
         </div>
         {invite && <InviteModal setInvite={setInvite} tour_id={tournament.id} />}
      </div>
   );
};

export default Tour;