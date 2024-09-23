import {useAuth} from '../../context/AuthContext'
import { RiWifiOffLine } from "react-icons/ri"
import { IoWifiOutline } from "react-icons/io5";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

export default function CreateTournament({setTournamentName, tournamentName, setTours}) {
    
    const {tokens,user} = useAuth()
    const [status,setStatus] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()
    
    const handleStatus = (state)=> {
        setStatus(()=>state)
    }
    const creatTournament = async ()=> {
        if(status === "") {
            setError(()=>"mode")
            return
        }
        if (tournamentName === "") {
            setError(()=>"emptyName")
            return
        }
        let url =  null
        if( status == 'offline')
            url = `http://${import.meta.env.VITE_BACKEND_URL}/api/tournament/create/offline/`
        else
            url = `http://${import.meta.env.VITE_BACKEND_URL}/api/tournament/create/`

        const response = await fetch(url,{
            method :"POST",
            headers :{
                "Authorization" : "JWT " + tokens.access,
                "Content-Type"  : "application/json"
            },
            body:JSON.stringify({
                "name":tournamentName
            })
        })
        const data = await response.json()
        if(response.ok) {
            if(status === "offline"){
                navigate("./tour", {state:{item:data, status:status}})
                return
            }

            setTours(prevtours=> [data,...prevtours])
            setTournamentName("")
        }
    }

    const  handelFading = ()=> {
        setTimeout(()=>{setError(()=>false)},500)
    } 
    return (
        <div className=" h-[10rem] w-[100%] flex items-center justify-center">
            <div className="w-[90%] h-[5rem] flex bg-secondaryColor items-center relative justify-between border-[2px] border-thirdColor rounded-md px-4">
                <input className="h-[2.5rem] w-[80%] rounded-lg outline-none  focus:border-transparent pl-2" type="text" placeholder="create your tournament" name="tournament" onChange={(e)=>setTournamentName(e.target.value)} value = {tournamentName}/>
                <RiWifiOffLine className={`${status === "offline" ? "border-2  border-thirdColor w-6 h-6 rounded p-1" : "" }`} onClick={()=>handleStatus("offline")} />
                <IoWifiOutline className={`${status === "online" ? "border-2  border-thirdColor w-6 h-6 rounded p-1" : "" }`} onClick={()=>handleStatus("online")}/>
                <button onClick={()=>creatTournament()} className="xsm:text-xs xsm:ml-[10px] xsm:p-[2px] md:p-2  bg-secondaryColor  border-[1px] border-thirdColor rounded-md font-bold rounded ">Create Tournament</button>
                {
                    error === "mode" ? <div  className={`absolute ${error ? handelFading() : "" } right-0 top-[-2rem] translate-y-[-1rem] animate-spin `}>please select the tournament mode</div> : ""
                }
                {
                    error === "emptyName" ? <div  className={`absolute ${error ? handelFading() : "" } right-0 top-[-2rem] translate-y-[-1rem] animate-spin `}>please insert a valid name</div> : ""
                }
            </div>
        </div>
    )
}