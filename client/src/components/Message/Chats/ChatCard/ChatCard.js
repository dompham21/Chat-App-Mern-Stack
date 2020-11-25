import React from 'react';
import { Avatar } from 'antd';
import moment from 'moment';
import './ChatCard.css'

function ChatCard(props) {
    const {data,isMine,startsSequence,endsSequence, showTimestamp, avatar, members} = props;
    const friendlyTimestamp = moment(data.createAt).locale('vi').format('LLLL');
    return (
        <div className={[
            'message',
            `${isMine ? 'mine' : ''}`,
            `${startsSequence ? 'start' : ''}`,
            `${endsSequence ? 'end' : ''}`
          ].join(' ')}>
            {
              showTimestamp &&
                <div className="timestamp">
                  { friendlyTimestamp }
                </div>
            }
            {!isMine && startsSequence && members && members.map(i=>{
                      return i.id === data.senderId ?<span className="message-group-name">{data.sender.username}</span>: ''
              }) }
            <div className="bubble-container">
               {    
                   !isMine && endsSequence &&  !members && <Avatar src={avatar} size="small"/>
               }
                {
                  !isMine && endsSequence && members && members.map(i=>{
                      return i.id === data.senderId ?<Avatar src={data.sender.avatar} size="small"/>: '' 
                  })
                }
                
              <div className="bubble" title={friendlyTimestamp}>
                { data.text }
              </div>
            </div>
        </div>
    )
}

export default ChatCard
