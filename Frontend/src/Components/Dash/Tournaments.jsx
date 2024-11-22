import {useEffect,useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import TourHistory from './TourHistory'
import { useTranslation } from "react-i18next";


const getTournaments = async (tokens, customFetch)=> {
    try { 
        const response = await customFetch("/api/tournament/tournaments/", {
            method:"GET",
            headers: {
                "Authorization" : "JWT " + tokens.access,
                'Content-Type':'application/json',
            }
        })
        
        if (response.ok) {
            let data = await response.json()
            return data
        }
        return null
    } catch (error) {
        return null
    }
}

export default function Tournaments() {
    const { t } = useTranslation();
    const [tournaments,setTournament] = useState(null)
    const {tokens, customFetch}  = useAuth()
    useEffect(()=> {
        const fetchDdata = async()=> {
            let data = await getTournaments(tokens, customFetch)
            setTournament(()=>data)
        }
        fetchDdata()
    },[])

    console.log("tournament is ", tournaments)
    return(
    <div className=" xsm:mt-2 md:mt-0 xsm:w-full md:w-1/2 xsm:h-[19rem] md:h-[100%] bg-secondaryColor py-1 rounded-xl ">
        <h1 className="h-[2rem] block text-center mt-4 font-bold">{t('TOURNAMENT HISTORY')}</h1>
        <div className="h-[calc(97%-2rem)] w-full  overflow-scroll">
            {
                tournaments && tournaments.map((item)=>< TourHistory key={item.id} tour={item}/>)
            }
        </div>
    </div>
    )
}