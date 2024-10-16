import Match from "./Match"
import TourHistory from "./TourHistory"
import Matches from "./Matches"

export default function PlayerHistory() {
    return (
        <div className=" block md:flex w-full  overflow-scroll  h-[40rem] mt-4 md:gap-x-2  ">
            <Matches />
            <div className=" xsm:mt-2 md:mt-0 xsm:w-full md:w-1/2 xsm:h-[19rem] md:h-[100%] bg-secondaryColor py-1 rounded-xl ">
            <h1 className="h-[2rem] block text-center mt-4 font-bold">MATCH HISTORY</h1>
                <div className="h-[calc(97%-2rem)] w-full  overflow-scroll">
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                    <TourHistory />
                </div>
            </div>
        </div>
    )
}