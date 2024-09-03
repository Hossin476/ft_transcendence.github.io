

export default function CreateTournament() {
    return (
        <div className=" h-[10rem] w-[100%] flex   items-center justify-center">
            <div className="w-[90%] h-[5rem] flex bg-secondaryColor items-center   justify-between border-[2px] border-thirdColor rounded-md px-4">
                <input className="h-[2.5rem] w-[80%] rounded-lg outline-none  focus:border-transparent pl-2" type="text" placeholder="create your tournament" name="tournament" id=""  />
                <button className=" xsm:text-xs xsm:ml-[10px] xsm:p-[2px] md:p-2  bg-secondaryColor  border-[1px] border-thirdColor rounded-md font-bold rounded ">Create Tournament</button>
            </div>
        </div>
    )
}