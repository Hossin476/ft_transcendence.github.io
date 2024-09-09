import { IoSearch } from "react-icons/io5";
import FriendChat from "./FriendChat";
import {useEffect,useState,useContext, useMemo} from "react"
import { useAuth } from "../../context/AuthContext";
import ChatContext from "../../context/ChatContext";
import _ from "lodash";
import { flattenJSON } from "three/src/animation/AnimationUtils";

const getConversations = async (tokens,user)=> {
  const response = await fetch("http://127.0.0.1:8000/chat/conversation", {
      method : "POST",
      headers: {
          "Content-Type":"application/json",
          'Authorization': 'JWT ' + tokens.access
      },
      body:JSON.stringify({
          "user":user
      })
  })
  let data = await response.json()

  if(response.ok) {
      //don't forget to get the current user here 
      // const convoUser = data.find(({user:friend})=> (friend.id === chatUser.user.id))

      // if(!convoUser)
      //     data.unshift(chatUser)

      data.map((convo, )=> {
          if(convo.last_msg == null) {
              convo.last_msg = {
                  content: "",
                  created_at: 0,
                }
          }
      })
      data.sort((a, b) => new Date(b.last_msg.created_at) - new Date(a.last_msg.created_at));
      return data
  }
  return null
}


export default function ChatList() {

  const {setCurrentUser, conversation, setConversation, currantUser} = useContext(ChatContext)
  const {messages, setMessages} = useContext(ChatContext)
  const {user,tokens} = useAuth()
  const [selectedChat,setSelectedChat] = useState(-1)
  const [search,setSearch] = useState("")

  const handleClick = (contact)=>{
    setSelectedChat(()=>contact.id)
    setCurrentUser(contact)
  }

  useEffect( ()=> {
    const fetchConversation = async()=> {
      const data = await getConversations(tokens,user)
      setConversation(()=>data)
    }
    fetchConversation()
  },[])

  const handelSearch = (e) => {
    setSearch(e.target.value)
  }

  const debounce_searchig = useMemo(
    () => _.debounce(handelSearch, 500),
    []
  );

  useEffect(() => {
    return () => {
      debounce_searchig.cancel();
    };
  }, [debounce_searchig]);


  const filterchats = useMemo(()=> {
    if(!search) {
      return (conversation || []).filter((convo) => (convo.last_msg.content !== ""))
    }
    return conversation.filter((convo) => {
      return convo.user.username.toLowerCase().includes(search.toLowerCase())
    })
  }, [search, conversation]);

    return useMemo(()=> {
      // console.log("messages",currantUser)
      return (
        <div className={`xsm:${currantUser ? 'hidden' : 'block'} h-[90%] md:block bg-secondaryColor rounded-3xl xsm:w-full md:w-[18rem] xl:w-[24rem]  `}>
          <div className="mt-10 flex center justify-center relative">
              <div className="relative w-5/6 mx-5">
                <input
                  className="bg-white bg-opacity-20 w-full placeholder:italic placeholder:text-slate-400 palceholder:font-thin text-white rounded-full py-2 pl-10 pr-3"
                  placeholder="Search..."
                  type="text"
                  name="search"
                  onChange={debounce_searchig}
                />
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <h3 className="hidden lg:block text-xl text-white mt-5 ml-7">Last chats</h3>
            <section className="h-5/6 text-white mt-10 lg:mt-5">
                <div className="text-xs h-5/6 block items-center overflow-y-scroll">
                {
                  filterchats && filterchats.length > 0 ? (
                    filterchats.map((convo) => {
                    // console.log(convo.user.username, convo.last_msg.content)
                      return (
                        <FriendChat
                          key={convo.id} 
                          contacts={convo} 
                          handleOnClick={handleClick} 
                          selected={selectedChat}
                        />
                      );
                  })
                  ) : <p className="text-white text-center bg-red-500 p-5 rounded shadow-md max-w-sm mx-auto">No chats or contacts found</p>
                }
                </div>
            </section>
        </div>
      )
    }, [filterchats ,selectedChat, currantUser])
}
