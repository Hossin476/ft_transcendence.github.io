
import imgProfle from "/public/ykhourba.jpeg"

export default function TourHistory() {
    return(
        <div className="flex bg-[#645c6b] justify-between items-center xsm:p-1 xsm:m-2 sm:p-2  rounded-xl">
            <div className="xsm:text-xs lg:text-lg flex gap-2 items-center justify-center">
                <hr  className=" xsm:h-[3rem] sm:h-[4rem] lg:ml-2 w-1 bg-gray-200 rounded-full border-none"/>
                <div className="xsm:h-8 xsm:w-8 sm:h-16 sm:w-16 bg-red-500 overflow-hidden  rounded-full">
                    <img className="w-full" src={imgProfle} alt="" />
                </div>
                <p>ykhourba</p>
            </div>
            <div>
                <h3>Tournament name</h3>
            </div>
            <p>you lose</p>
        </div>
    )
}