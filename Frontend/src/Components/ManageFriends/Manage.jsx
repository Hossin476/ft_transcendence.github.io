import {useEffect, useState} from 'react'
import Request from "./Request";
import Blocked from "./Blocked"

export default function Manage() {

    const [selected,setSelected] = useState("requests")
    const dummy = [1,2,3,4,5,6,7,8,9]

    useEffect(()=>{
        if (selected === 'requests') {
            //api call for requests
        }
        else if (selected === 'blocked') {
            //api call for blocked friends
        }
    },[selected])
    return (
        <div className="w-full h-[100%]  sm:p-8 ">
            <div className="flex justify-center xsm:mb-8 sm:mb-12  sm:text-2xl font-semibold gap-x-8 items-center">
                <button onClick = {()=>setSelected(()=>'blocked')} className={`${selected === 'blocked' ? 'text-thirdColor border-b-4  border-thirdColor': ''} h-12 `}>Blocked</button>
                <button onClick = {()=>setSelected(()=>'requests')} className={`${selected === 'requests' ? 'text-thirdColor border-b-4  border-thirdColor': ''} h-12`}>Requests</button>
            </div>
            <div className="w-full  sm:px-4  h-[95%] overflow-scroll border border-thirdColor">
                {
                    selected  === 'requests'
                        ? dummy.map((index)=> <Request key={index} />)
                        : dummy.map((index)=> <Blocked key={index} />)
                }
            </div>
        </div>
    )
}