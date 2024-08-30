import {createContext,useState,useRef} from 'react'

const ChatContext = createContext()

export default ChatContext

export const ChatProvider = ({children})=> {

    const [currantUser,setCurrentUser] = useState(null)
    const [conversation,setConversation] = useState(null)
    const [messages,setMessages] = useState(null)
    const [seen ,setSeen] = useState()
    let values = {
        currantUser:currantUser,
        conversation:conversation,
        messages:messages,
        seen:seen,
        setSeen,
        setCurrentUser,
        setConversation,
        setMessages
    }
    return (
        <ChatContext.Provider value= {values}>
            {children}
        </ChatContext.Provider>
    )
}
