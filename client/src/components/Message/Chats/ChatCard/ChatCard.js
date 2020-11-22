import React from 'react';
import { Comment, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import './ChatCard.css'

function ChatCard(props) {
    const {data,isMine,startsSequence,endsSequence, showTimestamp, avatar, members} = props;
    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
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
                   !isMine && endsSequence &&  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="small"/>
               } 
              <div className="bubble" title={friendlyTimestamp}>
                { data.text }
              </div>
            </div>
        </div>
    )
}

export default ChatCard
