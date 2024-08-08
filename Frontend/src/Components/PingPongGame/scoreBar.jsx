import { forwardRef } from "react"
import FirstPlayer from "./scoreBar&Header/FirstPlayer"
import SecondPlayer from "./scoreBar&Header/SecondPlayer"
import Timer from "./scoreBar&Header/Timer"
import { useImperativeHandle } from "react"
import { useRef } from "react"

function ScoreBar({},ref)
{
    const Score1Ref = useRef()
    const Score2Ref = useRef()
    useImperativeHandle(ref,()=>({
        Score1Ref,
        Score2Ref,
    }))
    return <>
        <div className=" flex  px-5 mt-5 w-[100%] justify-center items-center  max-w-[1024px] xsm:gap-2 lg:gap-9 ">
          <FirstPlayer name="hamza" level="6" image="/hyounsi.png" score={2} ref={Score1Ref}/>
          <Timer />
          <SecondPlayer name="hyounsi" level="3" image="/ykhourba.jpeg" score={7} ref={Score2Ref}/>
        </div>
    </>
}
export default  forwardRef(ScoreBar)