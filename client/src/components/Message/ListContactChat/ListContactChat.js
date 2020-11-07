import React from 'react'
import { Input, List, Avatar, Badge  } from 'antd'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaUserPlus} from 'react-icons/fa'

import './ListContactChat.css'
function ListContactChat() {
    const data = [
        {
          title: 'Phuc Dai',
        },
        {
          title: 'Dom Pham',
        },
        {
          title: 'My Linh',
        },
        {
          title: 'Thu Huyen',
        },
        {
            title: 'Phuc Dai',
          },
          {
            title: 'Dom Pham',
          },
          {
            title: 'My Linh',
          },
          {
            title: 'Thu Huyen',
          },
      ];
      
    return (
        <div className="message-list-contact-chat">
            <h2 className="message-list-contact-title">Chats</h2>
            <Input className="message-list-contact-search"
                    prefix={<AiOutlineSearch /> }
                    placeholder="Search messages or users"
            />
            <List
                itemLayout="horizontal"
                dataSource={data}
                
                renderItem={item => (
                <List.Item 
                    className="message-list-contact-li"
                    actions={[
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="message-list-contact-avatar-seen"/>
                    ]}
                >
                    <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="message-list-contact-avatar"/>}
                    title={<a href="https://ant.design" className="message-list-contact-name">{item.title}</a>}
                    description={<p className="message-list-contact-description">You: i don't know <span>· 12:02AM</span></p>}
                    />
                </List.Item>
                )}
            />
        </div>
    )
}

export default ListContactChat
