import {useEffect, useState} from 'react'
import TourInvites from "./TourInvites"
import { useAuth } from '../../context/AuthContext'

const getTourInvites = async (userId,tokens)=> {
    const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/tournament/invites/`, {
        method:"GET",
        headers: {
            "Authorization" : "JWT " + tokens.access
        }
    })
    const data = await response.json()
    if(response.ok)
        return data
    return null
}

export default function TourInvite() {
    const {user,tokens,socketMessage} = useAuth()
    const [invites,setInvites] = useState([])

    const fetchInvites = async()=> {
        const data = await getTourInvites(user.user_id,tokens)
        if(data)
            setInvites(()=>data)
    }

    useEffect(()=>{
        fetchInvites()
    },[])
    
    useEffect(()=>{
        if(socketMessage)  {
            const {type} = socketMessage
            if(socketMessage && type === "tour_invite")
                fetchInvites()
        }
    },[socketMessage])

    return (
        <div className=" xsm:w-[90%] md:w-5/6 flex h-[90%] flex-col bg-secondaryColor border-[2px] border-thirdColor rounded-lg items-center justify-center">
            <h3 className="font-bold xsm:text-lg md:text-3xl font-Valorax mb-4">Tournament Invites</h3>
            <div className=" sm:w-5/6  h-[80%]  overflow-scroll p-4 ">
                {
                    invites && (invites.map((item,key)=> {
                        return <TourInvites setInvites={setInvites} tourInvite={item} key={key} />
                    }))
                }
            </div>
        </div>
    )
}