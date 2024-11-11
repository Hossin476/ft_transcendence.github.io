
import Profile from "./Profile"
import Statistics from "./Statistics"
import { useAuth } from "../../context/AuthContext"
import {useEffect,useState} from 'react'

const  getUserData= async (tokens)=> {

    const response = await fetch("/api/users/user_info/",{
        method : "GET",
        headers:{
            "Authorization": "JWT " + tokens.access,
            'Content-Type':'application/json',
        }
    })
    let data = await response.json()
    if(response.ok)
        return data
    return null
}



export default function UserProfile() {

    const {tokens} = useAuth()
    const [userData,setUserData] = useState(null)
    useEffect(()=>{
        const fetchData = async ()=> {
            let data = await getUserData(tokens)
            setUserData(()=>data)
        }
        fetchData()
    },[])

    console.log("this is the user:",userData)
    return (
        <>
        {
            userData &&
            <>
            <Profile user={userData} />
            <Statistics user={userData} />
            </>
        }
        </>
    )
}