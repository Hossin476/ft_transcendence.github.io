import FriendHeader from "./FriendHeader.jsx"
import Conversation from "./Conversation.jsx"
import SendMessage from "./SendMessage"
import MessageSearch from "./MessageSearch.jsx"

export default function ChatField({chatUser}){
    return(
        <div className="hidden lg:block 3xl:mt-10 w-2/3 h-5/6 bg-gray-300 rounded-3xl">
            <MessageSearch />
            <FriendHeader  />
            <Conversation />
            <SendMessage />
        </div>
    )
}