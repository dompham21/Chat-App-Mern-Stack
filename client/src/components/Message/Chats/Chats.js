import React, { useState, useEffect, useRef } from 'react'
import { Avatar } from 'antd'; 
import moment from 'moment';
import './Chats.css'
import ChatCard from './ChatCard/ChatCard';
import InputSend from './InputSend/InputSend';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesUser, afterPostMessage, getMessagesGroup } from '../../../_actions/message_action';
import ChatVideo from './ChatVideo/ChatVideo';

function Chats(props) {
    const {id,username,avatar,members} = props
    const [messages, setMessages] = useState([]);
    const [messageFromBe,setMessageFromBe] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    const activeKey = useSelector(state => state.message.activeKey)
    const dispatch = useDispatch()
    const socket = useSelector(state => state.notification.connectSocketIo)
    let messagesEnd = useRef(null);
    useEffect(() => {
      socket.on("Output Chat Message", messageFromBackEnd => {
          dispatch(afterPostMessage(messageFromBackEnd))
          .then(res => {
            setMessageFromBe(res.payload)
          })
      })
      return () => {
        socket.emit('disconnect');
        socket.off();
      }
    }, [])

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        scrollToBottom()

    }, [messages])
    
    useEffect(() => {
      if(activeKey){
        if(members){
          dispatch(getMessagesGroup(activeKey))
          .then(res=> {
            setMessages(res.payload)
          })
          .catch(err => {
            console.log(err)
          })
        }else{
          dispatch(getMessagesUser(activeKey))
          .then(res=> {
            setMessages(res.payload)
          })
          .catch(err => {
            console.log(err)
          })
        }
      }else{
        if(members){
          dispatch(getMessagesGroup(id))
          .then(res=> {
            setMessages(res.payload)
          })
          .catch(err => {
            console.log(err)
          })
        }else{
          dispatch(getMessagesUser(id))
          .then(res=> {
            setMessages(res.payload)
          })
          .catch(err => {
            console.log(err)
          })
        }
      }
  
    },[messageFromBe,activeKey])
    const renderMessages = () => {
      if(messages && messages.length){
        let i = 0;
        let messageCount = messages.length; 
        let tempMessages = [];
    
        while (i < messageCount) { 
          let previous = messages[i - 1];
          let current = messages[i];
          let next = messages[i + 1];
          let isMine;
          if(current.senderId == user._id){
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

            if(previous.senderId === current.senderId){
              prevBySameAuthor = true;
            }
            else if(previous.receiverId === current.receiverId){
              prevBySameAuthor = true;
            }
            
            if (prevBySameAuthor && previousDuration.as('hours') < 1) {
              startsSequence = false;
            }
    
            if (previousDuration.as('hours') < 1) {
              showTimestamp = false;
            }
          }
          if (next) {
            let nextMoment = moment(next.timestamp);
            let nextDuration = moment.duration(nextMoment.diff(currentMoment));
            if(next.senderId === current.senderId){
              nextBySameAuthor = true;
            }
            else if(next.receiverId === current.receiverId){
              nextBySameAuthor = true;
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
    console.log(messages)
    return (
        <div className="message-layout-chats">
            <div className="message-layout-chats-title">
                <div className="message-layout-chats-title-infomation">
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="message-layout-chats-avatar"/>
                    <span>{username}</span>
                </div>
                {
                  members ? '' : <ChatVideo id={id} username={username} avatar={avatar}/>
                }
            </div>
            <div className="message-layout-chats-list" >
                <div className="message-list-container" >
                    {renderMessages()}
                    <div  ref={messagesEnd}/>
                </div>
               
            </div>
            <div><InputSend id={id} username={username} avatar={avatar} members={members}/></div>
        </div>
    )
}

export default Chats
