import React, { useState, useEffect } from 'react'
import './Message.css'
import Chats from './Chats/Chats'
import { Tabs, Avatar, Input} from 'antd'
import { useDispatch } from 'react-redux'
import {AiOutlineSearch} from 'react-icons/ai'
import { getAllConversations } from '../../_actions/message_action'

const { TabPane } = Tabs;
const OperationsSlot = {
    left: <div className="message-tabs-extra-content">
            <h2 className="message-list-contact-title">Chats</h2>
            <Input className="message-list-contact-search"
                    prefix={<AiOutlineSearch /> }
                    placeholder="Search messages or users"
            />
        </div>
  };
function Message() {
    const [listAllConversations, setListAllConversations] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getAllConversations())
       .then(res=>{
           setListAllConversations(res.payload.allConversations)
       })
       .catch(error=>{
           console.log(error)
       })
    }, [])
 
    return (
        <div className="message-layout">            
            <Tabs  
            defaultActiveKey="5faf42164055fe2a8ffbafa4" 
            type="card"
            tabPosition="left" 
            className="message-tabs-list-conversations" 
            tabBarExtraContent={ OperationsSlot}
            >
                {listAllConversations.map(pane => (
                <TabPane 
                    tab={
                        <div className="message-tabs-conversations-navbar">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="message-list-conversations-avatar"/>
                            <div className="message-list-conversations-info">
                                <span className="message-list-conversations-name">{pane.username}</span>
                                <p className="message-list-conversations-description">You: i don't know <span>· 12:02AM</span></p>
                            </div>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="message-list-conversations-avatar-seen"/>
                        </div>
                        } 
                    key={pane._id} 
                    className="message-tabs-conversations-item"
                >
                    <Chats id={pane._id} username={pane.username} avatar={pane.avatar}/>
                </TabPane>
            ))}
            </Tabs>
        </div>
    )
}

export default Message
