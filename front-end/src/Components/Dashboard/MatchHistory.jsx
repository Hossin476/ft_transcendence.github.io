import Match from "./Match"


export default function ProfileInfo() {
    return (
        <div className="bg-secondaryColor text-center p-6  rounded-3xl grow">
            <h2 className="text-4xl font-semibold mb-8">Match History</h2>
            <div className="h-5/6 overflow-scroll ">
                <Match/>
                <Match/>
                <Match/>
            </div>
        </div>
    )
}