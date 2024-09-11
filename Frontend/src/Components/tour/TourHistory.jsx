import History from "./History"

export default function TourHistory({tours}) {

    return (
        <div className=" xsm:w-[90%] md:w-5/6 flex h-[90%] flex-col bg-secondaryColor border-[2px] border-thirdColor rounded-lg items-center justify-center">
            <h3 className="font-bold xsm:text-lg md:text-3xl font-Valorax mb-4">Tournament List</h3>
            <div className="w-5/6 h-[80%] rounded-md overflow-scroll p-4 ">
                {tours && tours.map((item,key)=>{
                    return <History item ={item} key={key} />  
                })}
            </div>
        </div>
    )
}