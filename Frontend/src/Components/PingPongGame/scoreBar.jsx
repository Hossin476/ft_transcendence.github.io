import { forwardRef, useContext } from "react"
import FirstPlayer from "./scoreBar&Header/FirstPlayer"
import SecondPlayer from "./scoreBar&Header/SecondPlayer"
import Timer from "./scoreBar&Header/Timer"
import GameContext from "../../context/gameContext"

function ScoreBar()
{
    const {score1, score2} = useContext(GameContext)
    return <>
        <div className=" flex  px-5 mt-5 w-[100%] justify-center items-center  max-w-[1024px] xsm:gap-2 lg:gap-9 ">
          <FirstPlayer name="hamza" level="6" image="/hyounsi.png" score={2} ref={score1}/>
          <Timer />
          <SecondPlayer name="hyounsi" level="3" image="/ykhourba.jpeg" score={7} ref={score2}/>
        </div>
    </>
}
export default  ScoreBar