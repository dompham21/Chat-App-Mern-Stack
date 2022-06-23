import React, { useState, useEffect, useRef } from 'react'
import { Avatar } from 'antd'; 
import moment from 'moment';
import './Chats.css'
import ChatCard from './ChatCard/ChatCard';
import InputSend from './InputSend/InputSend';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesUser, afterPostMessage, getMessagesGroup, afterPostMessageGroup } from '../../../_actions/message_action';
import LoadingListMessage from '../../Loading/LoadingListMessage/LoadingListMessage';

function Chats(props) {
    const {id,username,avatar,members} = props
    const [messages, setMessages] = useState([]);
    const [messageFromBe,setMessageFromBe] = useState([])
    const [loading,setLoading] = useState(true)

    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    let messagesEnd = useRef(null);
    const activeKey = useSelector(state => state.message.activeKey)
    const socket = useSelector(state => state.notification.connectSocketIo)

    useEffect(() => {
      try {
        socket.on("output-chat-message",async messageFromBackEnd => {
          let response = await dispatch(afterPostMessage(messageFromBackEnd))
          setMessageFromBe(response.payload)
        })
        socket.on("output-chat-message-group",async messageFromBackEnd => {
          let response = await dispatch(afterPostMessageGroup(messageFromBackEnd))
          setMessageFromBe(response.payload)
        })
      } catch (error) {
        console.log(error)
      }
      return () => {
        socket.emit('disconnect');
        socket.off();
      }
    }, [dispatch,socket])

    useEffect(() => {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }, [messages,activeKey])
    
    useEffect(() => {
      async function fetchData(){
        try {
          if(activeKey){
            if(members){
             let response = await dispatch(getMessagesGroup(activeKey))
                setMessages(response.payload)
                setLoading(false)
            }else{
              let response = await dispatch(getMessagesUser(activeKey))
                setMessages(response.payload)
                setLoading(false)
            }
          }else{
            if(members){
             let response = await dispatch(getMessagesGroup(id))
                setMessages(response.payload)
                setLoading(false)
            }else{
              let response = await dispatch(getMessagesUser(id))
                setMessages(response.payload)
                setLoading(false)
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData();
    },[messageFromBe,activeKey,dispatch,id,members])
    const renderMessages = () => {
      if(messages && messages.length){
        let i = 0;
        let messageCount = messages.length; 
        let tempMessages = [];
    
        while (i < messageCount) { 
          let previous = messages[i - 1];
          let current = messages[i];
          let next = messages[i + 1];
          let isMine = false;
          if(current.senderId === user._id){
            isMine = true;
          }

          let currentMoment = moment(current.createAt);
          let prevBySameAuthor = false;
          let nextBySameAuthor = false;
          let startsSequence = true;
          let endsSequence = true;
          let showTimestamp = true;
    
          if (previous) {
            let previousMoment = moment(previous.createAt);
            let previousDuration = moment.duration(currentMoment.diff(previousMoment));
            if(members){
              if(previous.senderId === current.senderId){
                prevBySameAuthor = true;
              }
            }else{
              if(previous.senderId === current.senderId){
                prevBySameAuthor = true;
              }
              else if(previous.receiverId === current.receiverId){
                prevBySameAuthor = true;
              }
            }
             
            if (prevBySameAuthor && previousDuration.as('hours') < 1) {
              startsSequence = false;
            }

            if (previousDuration.as('hours') < 1) {
              showTimestamp = false;
            }
    
          }
          if (next) {
            let nextMoment = moment(next.createAt);
            let nextDuration = moment.duration(nextMoment.diff(currentMoment));
            if(members){
              if(next.senderId === current.senderId){
                nextBySameAuthor = true;
              }
            }else{
              if(next.senderId === current.senderId){
                nextBySameAuthor = true;
              }
              else if(next.receiverId === current.receiverId){
                nextBySameAuthor = true;
              }
            }

    
            if (nextBySameAuthor && nextDuration.as('hours') < 1) {
              endsSequence = false;
            }
           
          }
    
          tempMessages.push(
            <ChatCard
              key={i}
              isMine={isMine}
              startsSequence={startsSequence}
              endsSequence={endsSequence}
              showTimestamp={showTimestamp}
              data={current}
              avatar={avatar}
              members={members}
            />
          );
            i += 1;
        }
    
        return tempMessages;
      }
        
    }
    return (
        <div className="message-layout-chats">
            <div className="message-layout-chats-title">
                <div className="message-layout-chats-title-infomation">
                    <Avatar src={avatar||'https://firebasestorage.googleapis.com/v0/b/chat-now-3987e.appspot.com/o/group-chat-avt.jpg?alt=media&token=7ddcb8b2-cd52-425b-a137-ff5bd43e7884'} className="message-layout-chats-avatar"/>
                    <span>{username}</span>
                </div>
                {
                  members && 
                    <Avatar.Group 
                      maxCount={2} 
                      maxPopoverPlacement={"bottom"} 
                      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf',width:"34px",height:"34px" }} 
                      className="message-avatar-group"
                    >
                      {members.map(i=>{
                        return  <Avatar src={i.avatar} />
                      })}
                    </Avatar.Group> 
               
                }
                
            </div>
            <div className="message-layout-chats-list" >
                <div className="message-list-container" >
                    {loading? <LoadingListMessage/>:renderMessages()}
                    <div  ref={messagesEnd} style={{ float:"left", clear: "both" }}/>
                </div>
               
            </div>
            <div><InputSend id={id} username={username} avatar={avatar} members={members}/></div>
        </div>
    )
}

export default Chats
