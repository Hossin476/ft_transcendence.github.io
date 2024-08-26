import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

export function Progress({value})
{
    const [progress, setProgress] = useState(0)
    const ref = useRef()
    useEffect(()=>{
        let status = null
        status = setInterval(()=>{
            setProgress((prevProgress)=> {
                
                if(prevProgress >= value)
                {
                    clearInterval(status)
                    return value
                }
                return prevProgress + 1
            })
        },50)
        return ()=> clearInterval(status)
    },[])

    useEffect(() => {
        if (ref.current) {
            ref.current.style.width = `${progress}%`;
        }
    }, [progress]);
    return (
        <div className="w-full h-4 xsm:h-1 lg:h-2 bg-white rounded-full">
            <div className={`h-full transition-all duration-200 ease-in-out w-[${progress}%] bg-thirdColor rounded-full`} ref={ref}/> 
        </div> 
    )
}