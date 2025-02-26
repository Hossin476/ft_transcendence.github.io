import { forwardRef, useContext, useEffect, useState } from "react"
import FirstPlayer from "./scoreBar&Header/FirstPlayer"
import SecondPlayer from "./scoreBar&Header/SecondPlayer"
import Timer from "./scoreBar&Header/Timer"
import GameContext from "../../context/gameContext"
import { useAuth } from "../../context/AuthContext"
import { useLocation } from 'react-router-dom';


function ScoreBar({gameid})
{
    const location = useLocation();
    const {score1, score2} = useContext(GameContext)
    const [players, setPlayers] = useState(null)
    const {tokens, customFetch} = useAuth()

    const fetch_game = async ()=>{
        let url = null
        if (location.state.isonline == true)
            url = `/api/pingpong/game/pingpong/${gameid}/`
        else
            url = `/api/pingpong/game/pingpong/offline/${gameid}/`
        try {
          const response = await customFetch(url,{
              headers: {Authorization : "JWT " + tokens.access}
          })
          if (response.ok){
              const data = await response.json()
              setPlayers(data)
          }
        } catch (error) {
        }
    }
    useEffect(()=>{
      if (score1.current && score2.current){
        score1.current.innerText = '00';
        score2.current.innerText = '00';
      }
      fetch_game()
  },[gameid])

    return <>
      {players && (location.state.isonline == true ?(

        <div className=" flex  px-5 mt-5 w-[100%] justify-center items-center  max-w-[1024px] xsm:gap-2 lg:gap-9 ">
          <FirstPlayer name={players.player1.username} level={players.player1.rank} image={`${players.player1.profile_image}`} ref={score1}/>
          <Timer game_id={gameid}/>
          <SecondPlayer name={players.player2.username} level={players.player2.rank} image={`${players.player2.profile_image}`} ref={score2}/>
        </div>
      ):(
        <div className=" flex  px-5 mt-5 w-[100%] justify-center items-center  max-w-[1024px] xsm:gap-2 lg:gap-9 ">
          <FirstPlayer name={players.player1} level={0} image={`/media/main/hamza.jpeg`} ref={score1}/>
          <Timer game_id={gameid}/>
          <SecondPlayer name={players.player2} level={0} image={`/media/main/p1.jpeg`} ref={score2}/>
        </div>)
      )
      }
    </>
}
export default  ScoreBar