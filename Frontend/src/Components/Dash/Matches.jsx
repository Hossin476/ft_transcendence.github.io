import { useAuth } from "../../context/AuthContext"
import Match from "./Match"
import {useEffect,useState} from "react"
import { useTranslation } from "react-i18next";

const getAllMatches = async(tokens)=> {
    const response = await fetch("/api/users/all_matches/", {
        method:"GET",
        headers: {
            "Authorization" : "JWT " + tokens.access,
            'Content-Type':'application/json',
        }
    })
    let data = await response.json()
    if(response.ok)
        return data
    return null
}

export default function Matches() {
    const { t } = useTranslation();
    const {tokens} = useAuth()
    const [matches,setMatches] = useState(null)
    useEffect(()=> {
        const fetchData = async ()=> {
            let data = await getAllMatches(tokens)
            data.sort((a,b)=>{
                return a.created < b.created
            })
            setMatches(()=>data)
        }
        fetchData()
    },[])
    return (
        <>
       {matches &&  <div className=" bg-secondaryColor xsm:w-full rounded-xl md:w-1/2 xsm:h-[19rem] md:h-[100%] py-1 ">
            <h1 className="h-[2rem] block text-center mt-4 font-bold">{t('MATCH HISTORY')}</h1>
            <div className="h-[calc(97%-2rem)] w-full  overflow-scroll">
               { matches.map((items,index)=> <Match key={index} match={items} />)}
            </div>
        </div>}
        </>
    )
}