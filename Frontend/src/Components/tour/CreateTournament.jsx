import {useAuth} from '../../context/AuthContext'
import { RiWifiOffLine } from "react-icons/ri"
import { IoWifiOutline } from "react-icons/io5";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function CreateTournament({setTournamentName, tournamentName, setTours}) {
    
    const {tokens,customFetch} = useAuth()
    const [status,setStatus] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()
    const { t } = useTranslation();
    
    const handleStatus = (state)=> {
        setStatus(()=>state)
    }
    const creatTournament = async ()=> {
        let regex = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$");
        if(status === "") {
            setError(()=>"mode")
            return
        }
        if (tournamentName === "") {
            setError(()=>"emptyName")
            return
        }
        if (tournamentName.length > 10) {
            setError(()=>"longName")
            return
        }
        if (!regex.test(tournamentName)) {
            setError(()=>"notValid")
            return
        }
        let url =  null
        if( status == 'offline')
            url = `/api/tournament/create/offline/`
        else
            url = `/api/tournament/create/`
        try {
            const response = await customFetch(url,{
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
    
                setTours(prevtours=> [...prevtours, data])
                setTournamentName("")
            }
        } catch (error) {
            return 
        }
    }

    const  handelFading = ()=> {
        setTimeout(()=>{setError(()=>false)},500)
    } 
    return (
        <div className=" h-[10rem] w-[100%] flex items-center justify-center">
            <div className="w-[90%] h-[5rem] flex bg-secondaryColor items-center relative justify-between border-[2px] border-thirdColor rounded-md px-4">
                <input className="h-[2.5rem] w-[80%] rounded-lg outline-none  focus:border-transparent text-black pl-2" type="text" placeholder={t("create your tournament")} name="tournament" onChange={(e)=>setTournamentName(e.target.value)} value = {tournamentName}/>
                <RiWifiOffLine className={`${status === "offline" ? "border-2  border-thirdColor w-6 h-6 rounded p-1" : "" }`} onClick={()=>handleStatus("offline")} />
                <IoWifiOutline className={`${status === "online" ? "border-2  border-thirdColor w-6 h-6 rounded p-1" : "" }`} onClick={()=>handleStatus("online")}/>
                <button onClick={()=>creatTournament()} className="xsm:text-xs xsm:ml-[10px] xsm:p-[2px] md:p-2  bg-secondaryColor  border-[1px] border-thirdColor rounded-md font-bold rounded ">{t("Create Tournament")}</button>
                {
                    error === "mode" ? <div  className={`absolute ${error ? handelFading() : "" } right-0 top-[-2rem] translate-y-[-1rem] animate-spin `}>{t("please select the tournament mode")}</div> : ""
                }
                {
                    error === "emptyName" ? <div  className={`absolute ${error ? handelFading() : "" } right-0 top-[-2rem] translate-y-[-1rem] animate-spin `}>{t("please insert a valid name")}</div> : ""
                }
                {
                    error === "longName" ? <div  className={`absolute ${error ? handelFading() : "" } right-0 top-[-2rem] translate-y-[-1rem] animate-spin `}>{t("the tournament name is too long")}</div> : ""
                }
                {
                    error === "notValid" ? <div  className={`absolute ${error ? handelFading() : "" } right-0 top-[-2rem] translate-y-[-1rem] animate-spin `}>{t("the tournament name is not valid")}</div> : ""
                }
            </div>
        </div>
    )
}