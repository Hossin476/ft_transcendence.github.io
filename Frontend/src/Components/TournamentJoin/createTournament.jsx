import { useState } from "react";
import ModelCreate from "./model.Create";
import Tournament from "./tournament";
import { useEffect } from "react";

export default function CreateTournament({title}) {
    const [ismodel, setIsmodel] = useState(false)
    const [tournaments, setTournaments] = useState([])
    const addNewTournament= (value)=>{
        const newArray = [...tournaments,value]
        setTournaments(newArray)
    }
    useEffect(()=>{
        const fechData = async () =>{
            const responce = await fetch('/api/tournament')
            const  data = await responce.json()
            setTournaments(data)
        }
        fechData()
    },[])

    return (<div className='border  border-forthColor lg:w-[90%]  xsm:w-[90%]  text-white flex flex-col items-center h-[65%] justify-evenly bg-linkBgColor py-3 rounded-[20px]'>
        <div className='flex flex-col items-center'>
            <h1 className='font-Valorax text-[5vw] drop-shadow-2xl text-border xsm:text-[30px] lg:text-[50px] text-border' style={{ textShadow: `2px 2px 4px #BC9FD1` }}>{title}</h1>
            <h3 className='font-Valorax  xsm:text-[20px] lg:text-[30px]'>TOURNAMENT</h3>
        </div>
        <div className='flex  flex-col  w-[80%] h-[65%] gap-4'>
            <div className='flex justify-between px-4 w-[100%] xsm:text-[1.5vw] lg:text-[15px]'>
                <h2 className='font-bold '>TOURNAMENT LIST</h2>
                <button className="font-bold hover:opacity-75" onClick={()=>setIsmodel(true)}>CREATE NEW</button>
            </div>
            <div className='h-[1px] w-[100%] bg-white' />

            <div className="text-xl font-bold overflow-auto flex flex-col gap-5">
                {tournaments.map((item , index)=><Tournament key={index} mode={item.mode} players={item.users.length} />)}
            </div>
        </div>
       {ismodel && <ModelCreate setTournaments={addNewTournament} setIsmodel={setIsmodel}/>}
    </div>)
}