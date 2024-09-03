
import TourInvites from "./TourInvites"

export default function TourInvite() {
    return (
        <div className=" xsm:w-[90%] md:w-5/6 flex h-[90%] flex-col bg-secondaryColor border-[2px] border-thirdColor rounded-lg items-center justify-center">
            <h3 className="font-bold xsm:text-lg md:text-3xl font-Valorax mb-4">Tournament Invites</h3>
            <div className=" sm:w-5/6  h-[80%]  overflow-scroll p-4 ">
            <TourInvites />
            <TourInvites />
            <TourInvites />
            <TourInvites />
            <TourInvites />
            </div>
        </div>
    )
}