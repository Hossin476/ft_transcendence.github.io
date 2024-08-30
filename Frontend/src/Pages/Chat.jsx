import { FaSearch } from "react-icons/fa";


export default function Chat() {
    return(
        <div className="h-[calc(100%-4rem)] gap-4  p-4 items-center flex w-full">
            <div className="h-[90%] rounded-3xl w-[28rem] bg-secondaryColor ">
                {/*search bar */}
                <div className="h-[8rem] rounded-3xl bg-secondaryColor flex justify-center  items-center">
                        <div className=" w-5/6  bg-white bg-opacity-20  rounded-2xl flex items-center justify-center ">
                            <label htmlFor="search">
                                <FaSearch className="w-8 text-gray-400 text-sm" />
                            </label> 
                            <input type="text" id="search" className="flex-1 h-12 focus:outline-none bg-transparent  border-none outline-0 border-none rounded-2xl" placeholder="search..." />
                        </div>
                </div>
                {/*last chats */}
                <div className="h-[calc(100%-8rem)] flex flex-col ">
                    <h3 className="ml-12 text-2xl font-bold mb-8">Last Chats</h3>
                    <ul className="h-[100%]  overflow-scroll">
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        <li className="h-24 flex mb-8 items-center justify-center flex-col ">
                            <div className="flex gap-4  self-end  w-[95%] justify-center items-center">
                                <div className="w-[5rem] h-[5rem] rounded-full bg-indigo-500"></div>
                                <div className="flex-1  pr-4">
                                    <div className="flex mb-[0.5xp] justify-between">
                                        <p className="text-lg font-semibold">Lala Fatima</p>
                                        <p className="text-gray-500">12:24 PM</p>
                                    </div>
                                    <div className="text-gray-300">New Messages</div>
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div className="h-[90%] flex-1 bg-red-500">
                conversation
            </div>
            <div className="h-[90%]  w-96 bg-blue-500">
                info about chat user
            </div>
        </div>
    )
}