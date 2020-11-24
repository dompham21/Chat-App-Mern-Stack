import React from 'react';
import { Avatar } from 'antd';
import moment from 'moment';
import './ChatCard.css'

function ChatCard(props) {
    const {data,isMine,startsSequence,endsSequence, showTimestamp, avatar, members} = props;
    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
  let  a = members.filter(function (obj){ return obj.id===data.senderId})

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
            <div className="bubble-container">
               {    
                   !isMine && endsSequence && !members ?  <Avatar src={avatar} size="small"/> : 
                   endsSequence && members && !isMine ? <Avatar src={a[0].avatar} size="small"/> : ''
               } 
              <div className="bubble" title={friendlyTimestamp}>
                { data.text }
              </div>
            </div>
        </div>
    )
}

export default ChatCard
