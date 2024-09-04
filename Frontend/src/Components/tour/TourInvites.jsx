

export default function TourInvites() {
    return (
        <div className="flex items-center  border-[1px] border-thirdColor my-4 pl-2 rounded-lg  w-full justify-between">
            <div>
                <h4 className="xsm:text-xs md:text-sm xl:text-lg font-poppins font-bold">Tournament Name</h4>
                <p className="xsm:text-xs md:text-sm text-gray-400">creater name</p>
            </div>
            <div className="flex">
                <button className="xsm:text-xs xsm:p-1 xsm:m-1 md:p-2 md:m-2  border-[1px] text-green-500 border-green-500 rounded ">Accept</button>
                <button className="xsm:text-xs xsm:p-1 xsm:m-1 md:p-2 md:m-2  border-[1px] text-red-500 border-red-500 rounded ">Decline</button>
            </div>
        </div>
    )
}