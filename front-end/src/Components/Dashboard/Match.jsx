
export default function Match() {
    return (
        <div className=" xsm:h-24 sm:h-36 flex xsm:px-2 sm:px-3  rounded-xl my-4 items-center xsm:gap-x-2 sm:gap-x-8 justify-between w-full bg-MatchVictory opacity-90">
            <hr  className=" xsm:h-12 sm:h-24 w-2 rounded-2xl  bg-green-400"/>
            <div className="flex justify-between xsm:gap-x-4 grow xsm:px-0.5 items-center sm:flex-1 ">
                <div className="flex flex-col items-center">
                    <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20 bg-red-500 rounded-full">
                        <img src="" alt="" />
                    </div>
                    <h3 className="xsm:text-xs sm:text-lg">KIRAZIZI</h3>
                </div>
                <div className="flex flex-col sm:gap-y-2">
                    <h2 className=" xsm:text-xs sm:text-lg font-light  text-MatchText">VICTORY</h2>
                    <p className="xsm:text-xs sm:text-md">08 - 05</p>
                    <h2 className="xsm:text-xs sm:text-lg font-light text-MatchText">PING PONG</h2>
                </div>
                <div className="flex flex-col items-center">
                    <div className="xsm:h-8 xsm:w-8 sm:h-20 sm:w-20 bg-red-500 rounded-full">
                        <img src="" alt="" />
                    </div>
                    <h3 className="xsm:text-xs sm:text-lg">KIRAZIZI</h3>
                </div>
            </div>
            <hr  className=" xsm:h-12 sm:h-24 w-0.5 bg-gray-400"/>
            <div className="xsm:text-xs sm:text-lg xsm:flex-1 sm:flex-initial  sm:w-20">
                <p className="text-left ">TI</p>
                <p>03:15</p>
                <p className="text-right">ME</p>
            </div>
        </div>
    )
}