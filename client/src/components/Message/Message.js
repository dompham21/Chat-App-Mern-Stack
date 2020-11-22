import React, { useState, useEffect, useRef } from 'react'
import './Message.css'
import Chats from './Chats/Chats'
import { Tabs, Avatar, Input, Modal, Tooltip} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineSearch} from 'react-icons/ai'
import { getAllConversations, getKeyTabs } from '../../_actions/message_action'
import moment from 'moment'
import ModalCreateGroupChat from './ModalCreateGroupChat/ModalCreateGroupChat'

const { TabPane } = Tabs;
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
    const OperationsSlot = {
        left: <div className="message-tabs-extra-content">
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <h2 className="message-list-contact-title">Chats</h2>
                    <ModalCreateGroupChat/>
                </div>
                <Input className="message-list-contact-search"
                        prefix={<AiOutlineSearch /> }
                        placeholder="Search messages or users"
                />
            </div>
      };

    return (
        <div className="message-layout">            
            <Tabs  
            type="card"
            tabPosition="left" 
            className="message-tabs-list-conversations" 
            tabBarExtraContent={ OperationsSlot}
            onChange={handleGetKey}
            >
                {listAllConversations.map(pane => {
                    if(pane.members){
                        return <TabPane
                            tab={
                                <div className="message-tabs-conversations-navbar">
                                    <Avatar src="https://www.shareicon.net/data/128x128/2016/06/30/788858_group_256x256.png" className="message-list-conversations-avatar"/>                           
                                    <div className="message-list-conversations-info">
                                        <span className="message-list-conversations-name">{pane.name}</span>
                                        <p className="message-list-conversations-description">{pane.preview.length?pane.preview[0].text:''} 
                                            <span className="message-list-conversations-time"> · {pane.preview.length?moment(pane.preview[0].createAt).locale('vi').startOf("seconds").fromNow():''}</span>
                                        </p>
                                    </div>
                                    {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="message-list-conversations-avatar-seen"/> */}
                                </div>
                                } 
                            key={pane._id} 
                            className="message-tabs-conversations-item"
                        >
                            <Chats id={pane._id} username={pane.name} avatar={pane.avatar} members={pane.members} />
                        </TabPane>
                    }else{
                      return <TabPane
                            tab={
                                <div className="message-tabs-conversations-navbar">
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="message-list-conversations-avatar"/>                           
                                    <div className="message-list-conversations-info">
                                        <span className="message-list-conversations-name">{pane.username}</span>
                                        <p className="message-list-conversations-description">{pane.preview.length?pane.preview[0].text:''} 
                                            <span className="message-list-conversations-time"> · {pane.preview.length?moment(pane.preview[0].createAt).locale('vi').startOf("seconds").fromNow():''}</span>
                                        </p>
                                    </div>
                                    {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="message-list-conversations-avatar-seen"/> */}
                                </div>
                                } 
                            key={pane._id} 
                            className="message-tabs-conversations-item"
                        >
                            <Chats id={pane._id} username={pane.username} avatar={pane.avatar} />
                        </TabPane>
                    } 
                })}
            </Tabs>
           
        
        </div>
    )
}

export default Message