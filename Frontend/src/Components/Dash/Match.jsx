import imgProfle from "/public/ykhourba.jpeg"

export default function Match() {
    {/*
        bg-defeat : #572a39
        bg-win : #395446
        bg-draw : #645c6b
        
        text-defeat : #d75c5c
        text-draw : #f4f4f4


*/}
    return (
        <div className="flex bg-[#645c6b] items-center justify-between xsm:p-1 xsm:m-2 sm:p-2  rounded-xl">
            <hr  className=" xsm:h-[3rem] sm:h-[4rem] lg:ml-2 w-1 bg-gray-200 rounded-full border-none"/>
            <div className="xsm:text-xs lg:text-lg flex flex-col items-center justify-center">
                <div className="xsm:h-8 xsm:w-8 sm:h-16 sm:w-16 bg-red-500 overflow-hidden  rounded-full">
                    <img className="w-full" src={imgProfle} alt="" />
                </div>
                <p>ykhourba</p>
            </div>
            <div className="xsm:text-[10px]  sm:text-lg flex flex-col items-center">
                    <p className="text-[#f4f4f4]">VICTORY</p>
                    <p>08 - 05</p>
                    <p className="text-[#d1c875]">PING PONG</p>
            </div>
            <div className="xsm:text-xs lg:text-lg flex flex-col items-center justify-center">
                <div className="xsm:h-8 xsm:w-8 sm:h-16 sm:w-16 bg-red-500 overflow-hidden  rounded-full">
                    <img className="w-full" src={imgProfle} alt="" />
                </div>
                <p>ykhourba</p>
            </div>
            <hr  className="w-[2px] h-[4rem] border-none rounded-full bg-gray-400"/>
            <div className="xsm:text-xs sm:text-lg flex flex-col xsm:w-12 sm:w-24  ">
                <p className="self-start">TI</p>
                <p className="self-center">03:15</p>
                <p className="self-end">ME</p>
            </div>
        </div>
    )
}