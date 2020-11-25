import React, { useState, useEffect, useRef } from 'react'
import './Message.css'
import Chats from './Chats/Chats'
import { Tabs, Avatar, Input, Modal, Tooltip} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineSearch} from 'react-icons/ai'
import { getAllConversations, getKeyTabs } from '../../_actions/message_action'
import ModalCreateGroupChat from './ModalCreateGroupChat/ModalCreateGroupChat'
import { changeTimeStamp, truncate } from '../../util'
import LoadingListMessage from '../Loading/LoadingPage/LoadingPage'

const { TabPane } = Tabs;
function Message() {
    const [listAllConversations, setListAllConversations] = useState([])
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
    const receiveMessage = useSelector(state => state.message.receiveMessage)

 
   
    useEffect(() => {
        async function fetchData(){
            try {
                let response  = await dispatch(getAllConversations())
                setListAllConversations(response.payload.allConversations)
                let timer = setTimeout(() => {
                    setLoading(false)
                }, 1000);
                return () => clearTimeout(timer);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [receiveMessage])

    const handleGetKey = async (key) => {
        await dispatch(getKeyTabs(key))
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
    const hanldeRenderPreviewMsg = (preview,targetId) => {
        if( preview && preview.length){
            if(preview[0].senderId !== targetId ){
                return "You: " + truncate(preview[0].text) + " · "
            }else{
                return preview[0].sender.username+ ": " + truncate(preview[0].text) + " · "
            }
        }else{
            return '';
        }
    }
    return (
        <div className="message-layout"> 
            <div className="loader-layout" style={{display:loading?"flex":"none"}}> 
                <LoadingListMessage/>
            </div>
            <Tabs 
            style={{display:loading?"none":"flex"}}
            type="card"
            tabPosition="left" 
            className="message-tabs-list-conversations" 
            tabBarExtraContent={ OperationsSlot}
            onChange={handleGetKey}
            >
                {
                    listAllConversations.length === 0 ?
                    <TabPane 
                    tab="No message found."
                    className="nothing-tabpane">
                        <div className='nothing-message'></div>
                    </TabPane>
                    :
                    listAllConversations.map(pane => {
                        if(pane.members){
                            return <TabPane
                                tab={
                                    <div className="message-tabs-conversations-navbar">
                                        <Avatar src="https://firebasestorage.googleapis.com/v0/b/chat-now-3987e.appspot.com/o/group-chat-avt.jpg?alt=media&token=7ddcb8b2-cd52-425b-a137-ff5bd43e7884" className="message-list-conversations-avatar"/>                           
                                        <div className="message-list-conversations-info">
                                            <span className="message-list-conversations-name">{pane.name}</span>
                                                <p className="message-list-conversations-description">{hanldeRenderPreviewMsg(pane.preview,pane._id)} 
                                                <span className="message-list-conversations-time">{pane.preview.length?changeTimeStamp(pane.preview[0].createAt):''}</span>
                                            </p>
                                        </div>
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
                                        <Avatar src={pane.avatar} className="message-list-conversations-avatar"/>                           
                                        <div className="message-list-conversations-info">
                                            <span className="message-list-conversations-name">{pane.username}</span>
                                            <p className="message-list-conversations-description">{hanldeRenderPreviewMsg(pane.preview,pane._id)} 
                                                <span className="message-list-conversations-time">{pane.preview && pane.preview.length?changeTimeStamp(pane.preview[0].createAt) : ''}</span>
                                            </p>
                                        </div>
                                    </div>
                                    } 
                                key={pane._id} 
                                className="message-tabs-conversations-item"
                            >
                                <Chats id={pane._id} username={pane.username} avatar={pane.avatar} />
                            </TabPane>
                        } 
                    })
                }
                
            </Tabs>
           
        
        </div>
    )
}

export default Message