import { RiFileCopy2Line } from "react-icons/ri";
import imgProfle from "/public/ykhourba.jpeg"


export default function ProfileInfo() {
    return (
        <div className="bg-secondaryColor flex xsm:flex-col md:flex-row justify-between rounded-3xl md:h-60 xsm:h-80  md:gap-4 xsm:gap-4">
            <div className=" md:w-7/12  md:h-4/6 xsm:w-full xsm:h-32 p-2  self-center flex  items-center ">
                <div className=" xsm:w-20 xsm:h-20 md:w-32 md:h-32  lg:w-36 lg:h-36  md:ml-2 xl:ml-6  xl:h-40 xl:w-40  bg-profilebg  rounded-full flex items-center justify-center   relative ">
                    <div className=" xsm:text-xs lg:left-1/4 -bottom-2 xsm:w-16 text-center p-1 absolute z-50 bg-gray-300   xsm:rounded-3xl md:rounded-3xl border-black border-2 text-black">LEVEL 3</div>
                    <div className="rounded-full border-thirdColor border-[8px] overflow-hidden relative z-20  xsm:w-16 xsm:h-16 md:w-28 md:h-28 lg:w-32 lg:h-32">
                        <img  src={imgProfle} alt="" />
                    </div>
                </div>
                <div className="flex-1 flex   xsm:p-1 sm:p-4 flex-col h-full xsm:justify-center md:justify-around gap-y-8   lg:justify-between  ">
                        {/* profile name */ }
                    <div className="flex justify-between   ">
                        <div>
                            <h2 className=" xsm:text-xs sm:text-sm md:text-lg xl:text-4xl font-semibold">KIRAZIZI</h2>
                            <h3 className="font-xs xsm:text-xs  lg:text-sm flex gap-x-1 items-center text-gray-300">
                                ID 55101312312
                                <span className="text-sm"> <RiFileCopy2Line/></span>
                            </h3>
                        </div>
                            {/* /*1st */ }
                        <div >
                            <h2 className="text-center  xsm:text-sm md:text-lg lg:text-2xl xl:text-4xl font-semibold relative">
                                1
                                <span className="absolute top-0 xsm:text-xs md:text-xs lg:text-sm xl:text-lg">ST</span>
                            </h2>
                            <p className=" md:text-xs lg:text-xl xsm:text-xs xl:text-2xl font-semibold">season 3</p>
                        </div>
                    </div>
                    <div className=" relative ">
                        <div className="w-full h-4 xsm:h-2 bg-white rounded-full">
                            <div className="h-full w-5/6 bg-thirdColor rounded-full"></div>
                        </div>
                        <span className="absolute  xsm:bottom-3 md:bottom-5 left-2 text-sm  xsm:text-xs"> 20XP TO GO</span>
                        <span className="absolute text-sm right-3 xsm:bottom-3 md:bottom-5 xsm:text-xs">LEVEL 3</span>
                    </div>
                </div>
            </div>
            <hr className=" xsm:h-1 xsm:w-5/6 md:h-4/6 bg-gray-500 self-center  md:w-1 rounded-3xl" />
            {/* /* stats */}
            <div className=" flex flex-col md:pt-12  justify-center items-center xsm:flex-1 md:flex-initial md:w-60 2xl:w-96 ">
                    <h3 className="font-semibold md:text-lg xsm:mb-4 lg:text-2xl xl:text-4xl md:mb-3  lg:mb-4 xl:mb-6" >STATISTICS</h3>
                <div className="flex justify-between px-8 w-full h-5/6">
                    <div className="flex flex-1 md:text-sm md:h-20  lg:text-sm flex-col gap-y-2 ">
                        <div className="flex  justify-between">
                            <p>Wins</p>
                            <p>68</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Losses</p>
                            <p>22</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total Games</p>
                            <p>90</p>
                        </div>
                    </div>
                    <div className="flex-1 md:text-sm  xsm:justify-center  lg:text-sm flex md:h-20 flex-col items-center pb-1 md:justify-end">
                        <div>80%</div>
                        <p>Winrate</p>
                    </div>
                </div>
            </div>
       </div>
    )
}