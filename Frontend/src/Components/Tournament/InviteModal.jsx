import React, { useEffect, useState } from 'react'
import UserInvite from './UserInvite'
import { MdClear } from "react-icons/md";
import { useAuth } from '../../context/AuthContext';

function InviteModal({ setInvite, tour_id }) {
    const [users, setUsers ] = useState([])
    const { tokens } = useAuth()

    function clear_invite() {
        setInvite(false)
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/notification/tourinvites/${tour_id}`, {
                headers: {
                    "Authorization": "JWT " + tokens.access,
                    "content-Type": "application/json"
                }
            })
            const data = await response.json()
            setUsers(data)
        }
        fetchData();
    }, [])
    const afterinvite = (key)=>{
        setUsers((current)=>{
            current.splice(key,1)
            return [...current]
        })
    }
    return (
        <div className='w-[100%] h-[100%] blurHelp absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'>
            <div className={`w-[60%] inset-0 blurHelp h-[70%] min-h-[500px] absolute border-[3px] flex flex-col items-center z-10 gap-6 rounded-[20px] bg-gradient-to-r from-purple-400 via-pink-500 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] to-red-500 shadow-lg`}>
                <div className='h-[4rem] absolute right-4 top-2'>
                    <MdClear size={40} onClick={clear_invite} style={{ cursor: 'pointer' }} />
                </div>
                <h1 className={`font-Plaguard xsm:text-[3.5vw] lg:text-2xl text-white mt-4 `}> Invite Players to Tournament</h1>
                <div className="w-[80%] p-4 space-y-4 overflow-y-auto h-[calc(100%-5rem)]">
                    {
                        users && users.map((user, index) => (
                            <UserInvite user={user} key={index} tour_id={tour_id} removeuser={afterinvite}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default InviteModal