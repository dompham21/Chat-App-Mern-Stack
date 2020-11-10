import React, { useState, useRef, useEffect } from 'react';
import { List, Avatar, Badge} from 'antd';
import { FaUserPlus,FaUserTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { getWaitingAcceptList } from '../../../_actions/contact_action';

function WaitingAcceptTabPane() {
    const [waitingAcceptList,setWaitingAcceptList] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getWaitingAcceptList())
            .then(res => {
                setWaitingAcceptList(res.payload);
            })
    }, [])

    return (
        <List       
            itemLayout="horizontal"
            className="contact-search-list"
            dataSource={waitingAcceptList}
            renderItem={item => (
                <List.Item
                    className="contact-search-list-item"
                    actions={[
                        <Badge size="small" >
                            <div className="nav-menu-right-item search-remove-user-icon"><FaUserTimes/></div>
                        </Badge>
                    ]}
                >     
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="contact-search-list-item-avatar"/>}
                        title={<a href="https://ant.design" className="contact-search-list-item-name">{item.username}</a>}
                        description={<p className="contact-search-list-item-description">Lives in Hoai Nhon, Binh Dinh, Viet Nam</p>}
                    />
                            
                </List.Item>
            )}
        />
    )
}

export default WaitingAcceptTabPane