import React from 'react'
import ListContactChat from './ListContactChat/ListContactChat'
import './Message.css'
import Chats from './Chats/Chats'
function Message() {
    return (
        <div className="message-layout">
            <ListContactChat/>
            <Chats/>
        </div>
    )
}

export default Message
