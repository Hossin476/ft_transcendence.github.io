import Request from "./Request";
import Friendlist from "./FriendList"

export default function Manage() {
    return (
        <div className="w-full h-full sm:p-8 ">
            <div className="flex justify-center xsm:mb-8 sm:mb-12  sm:text-2xl font-semibold gap-x-8 items-center">
                <button>My Friend list</button>
                <button>Requests</button>
            </div>
            <div className="w-full xsm:h-5/6 sm:h-11/12 sm:px-4 overflow-scroll border border-thirdColor">
                <Friendlist />
                <Request />
                <Request />
                <Request />
                <Request />
            </div>
        </div>
    )
}