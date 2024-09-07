

export default function History() {
    return (
        <div className="flex items-center  border-[1px] border-thirdColor my-4 px-4 rounded-lg  w-full justify-between">
            <div>
                <h4 className="xsm:text-xs md:text-sm xl:text-lg font-bold">Tournament Name</h4>
                <p className="xsm:text-xs md:text-sm text-gray-400">creater name</p>
            </div>
            <div className="flex">
                <p className="text-green-500">Won</p>
            </div>
        </div>
    )
}