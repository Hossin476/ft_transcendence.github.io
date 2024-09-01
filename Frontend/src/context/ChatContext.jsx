import {createContext,useState,useRef} from 'react'

const ChatContext = createContext()

export default ChatContext

export const ChatProvider = ({children})=> {

    const [currantUser,setCurrentUser] = useState(null)
    const [conversation,setConversation] = useState(null)
    const [messages,setMessages] = useState(null)
    const [seen ,setSeen] = useState()
    const [typing,setTyping] = useState(false)
    let values = {
        currantUser:currantUser,
        conversation:conversation,
        messages:messages,
        seen:seen,
        typing:typing,
        setSeen,
        setCurrentUser,
        setConversation,
        setMessages,
        setTyping,
    }
    return (
        <ChatContext.Provider value= {values}>
            {children}
        </ChatContext.Provider>
    )
}
