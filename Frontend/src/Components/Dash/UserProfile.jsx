
import Profile from "./Profile"
import Statistics from "./Statistics"
import { useAuth } from "../../context/AuthContext"
import {useEffect,useState} from 'react'

const  getUserData= async (tokens, customFetch)=> {
    try {
        const response = await customFetch("/api/users/user_info/",{
            method : "GET",
            headers:{
                "Authorization": "JWT " + tokens.access,
                'Content-Type':'application/json',
            }
        })
        if(response.ok) {
            let data = await response.json()
            return data
        }
        return null
    } catch(error) {
        return null
    }
}



export default function UserProfile() {

    const {tokens,setUser, customFetch} = useAuth()
    const [userData,setUserData] = useState(null)
    useEffect(()=>{
        const fetchData = async ()=> {
            let data = await getUserData(tokens, customFetch)
            setUserData(()=>data)
            setUser(prevUser=>{
                return {...prevUser,profile_image:data.profile_image}
            })
        }
        fetchData()
    },[])

    // console.log("this is the user:",userData)
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