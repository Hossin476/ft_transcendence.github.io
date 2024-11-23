import {createContext,useState,useRef} from 'react'

const ChatContext = createContext()

export default ChatContext

export const ChatProvider = ({children})=> {

    const [currantUser,setCurrentUser] = useState(null)
    const [conversation,setConversation] = useState([])
    const [messages,setMessages] = useState(null)
    const [seen ,setSeen] = useState(null)
    const [blocker ,setBlocker] = useState(null)
    const [typing,setTyping] = useState(false)
    const [count, setCount] = useState([])
    let values = {
        currantUser:currantUser,
        conversation:conversation,
        messages:messages,
        seen:seen,
        typing:typing,
        count:count,
        blocker:blocker,
        setSeen,
        setCurrentUser,
        setConversation,
        setMessages,
        setTyping,
        setCount,
        setBlocker
    }
    return (
        <ChatContext.Provider value= {values}>
            {children}
        </ChatContext.Provider>
    )
}
