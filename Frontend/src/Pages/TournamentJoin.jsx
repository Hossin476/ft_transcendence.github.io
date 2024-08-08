import { useState, useEffect } from "react";
import Challenge from "../Components/TournamentJoin/Challenge";
import CreateTournament from "../Components/TournamentJoin/createTournament";

export default function TournamentJoin({title})
{
    const [windowWidth, setWindowWidth] =  useState(window.innerWidth)
    useEffect(()=>{
        
        function handleResize()
        {
            setWindowWidth(windowWidth.innerWidth)
        }
        window.addEventListener('resize',handleResize)
        return ()=> window.removeEventListener('resize', handleResize)
    },[])
    return(<div className='bg-primaryColor w-full flex flex-row items-center justify-between px-7 relative'>
        <div className='flex  justify-center items-center xsm:w-[90%] w-[80%] h-[100%]'>
            <CreateTournament title={title}/>
        </div>
        <Challenge/>
    </div>)
}