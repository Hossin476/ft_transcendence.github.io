import { AiOutlineUserAdd } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import FriendChat from "./FriendChat";

export default function ChatList() {
    return (
      <div className="h-5/6 mx-5 bg-secondaryColor rounded-3xl w-full lg:w-1/4 mt-5 sm:mt-0">
        <div className="mt-10 flex center justify-center relative">
            <div className="relative w-5/6 mx-5">
              <input
                className="bg-white bg-opacity-20 w-full placeholder:italic placeholder:text-slate-400 palceholder:font-thin text-white rounded-full py-2 pl-10 pr-3"
                placeholder="Search..."
                type="text"
                name="search"
              />
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <h3 className="hidden lg:block text-xl text-white mt-5 ml-7">Last chats</h3>
          <section className="h-5/6 text-white mt-10 lg:mt-5">
              <div className="text-xs h-5/6 block items-center overflow-y-scroll">
                  <FriendChat />
              </div>
          </section>
      </div>
    )
}
