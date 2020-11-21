import React, { useState, useEffect } from 'react'
import './Message.css'
import Chats from './Chats/Chats'
import { Tabs, Avatar, Input} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineSearch} from 'react-icons/ai'
import { getAllConversations, getKeyTabs } from '../../_actions/message_action'
import moment from 'moment'

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
    const receiveMessage = useSelector(state => state.message.receiveMessage)
    useEffect(() => {
       dispatch(getAllConversations())
       .then(res=>{
           setListAllConversations(res.payload.allConversations)
       })
       .catch(error=>{
           console.log(error)
       })
    }, [receiveMessage])

    const handleGetKey = (key) => {
        dispatch(getKeyTabs(key))

    }
    return (
        <div className="message-layout">            
            <Tabs  
            type="card"
            tabPosition="left" 
            className="message-tabs-list-conversations" 
            tabBarExtraContent={ OperationsSlot}
            onChange={handleGetKey}
            >
                {listAllConversations.map(pane => (
                <TabPane
                    tab={
                        <div className="message-tabs-conversations-navbar">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="message-list-conversations-avatar"/>
                            <div className="message-list-conversations-info">
                                <span className="message-list-conversations-name">{pane.username}</span>
                                <p className="message-list-conversations-description">{pane.preview.length?pane.preview[0].text:''} 
                                    <span className="message-list-conversations-time"> · {pane.preview.length?moment(pane.preview[0].createAt).locale('vi').startOf("seconds").fromNow():''}</span>
                                </p>
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
//AKIARYKYC4QEXN3HSRHT
//vI9yLBmp5wuwqgg9c9iN8LercjbrqLdIWfKgm2Of
// arn:aws:iam::120980694025:user/dompham21