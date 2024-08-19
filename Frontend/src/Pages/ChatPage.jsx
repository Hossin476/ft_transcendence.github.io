import React from 'react';
import ChatList from '../Components/chat/ChatList';
// import ChatList from '../Components/chat/ChatList';
import ChatField from '../Components/chat/ChatField';
import ChatProfileBrief from '../Components/chat/ChatProfileBrief';

const ChatPage = () => {
    return (
        <>
            <ChatList />
            <ChatField />
            <ChatProfileBrief />
        </>
    );
}

export default ChatPage;