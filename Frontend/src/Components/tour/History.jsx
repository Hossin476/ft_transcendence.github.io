import {useNavigate} from 'react-router-dom'

export default function History({item}) {

    const navigate = useNavigate()
    const handleNavigation = ()=> {
        navigate("./tour",{
            state: {
                item:item,
                status:"online"
            } 
        })
    }

    return (
        <div onClick ={handleNavigation} className="flex items-center border-[1px] border-thirdColor my-4 px-4 rounded-lg  w-full justify-between">
            <div>
                <h4 className="xsm:text-xs md:text-sm xl:text-lg font-bold">{item.name}</h4>
                <p className="xsm:text-xs md:text-sm text-gray-400">{item.creator.username}</p>
            </div>
            <div className="flex">
                <p className={` ${item.is_start ? 'text-green-500' : ""} ${item.is_end ? 'text-red-500' : ""} text-yellow-500`}>{
                    item.is_start === true ? "live" : (item.is_end ? "finished" : "pending")
                }</p>
            </div>
        </div>
    )
}