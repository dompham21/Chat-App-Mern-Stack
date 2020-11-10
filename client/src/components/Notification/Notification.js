import React, { useEffect, useState } from 'react'
import {Badge,Popover, Avatar} from 'antd';
import {AiOutlineUser} from 'react-icons/ai'
import {GiEarthAmerica} from 'react-icons/gi'

import './Notification.css'
import socket from '../../socket';
import { useDispatch } from 'react-redux';
import { getNotification, markNotification, getCountNotification, } from '../../_actions/notification_action';

function Notification() {
    const [responseAddNew,setResponseAddNew] = useState('');
    const [notifications,setNotifications] = useState([]);
    const [countNotification,setCountNotification] = useState(0);
    const dispatch = useDispatch()
    
    let socketConnect;
    useEffect(() => {
        
        socketConnect = socket();
        socketConnect.on('response-add-new-contact',data=>{
            setResponseAddNew(data.currentUser);
        });
        
        return () => {
            socketConnect.emit('disconnect');
            socketConnect.off();
        }
    }, [])
    useEffect(() => {
        dispatch(getNotification())
        .then(res => {
            setNotifications(res.payload)
        })
        .catch(err=>{
            console.log(err)
        })

        dispatch(getCountNotification())
        .then(res => {
            setCountNotification(res.payload.data)
            console.log(res.payload.data);
        })
        .catch(err=>{
            console.log(err)
        })
    }, [responseAddNew])

    const contentMenuNotification = (
        <ul className="nav-menu-list-dropmenu">
            {notifications.map((notification,index)=> (
                <li className="nav-menu-dropmenu-infomation nav-menu-dropmenu-notification" key={index}>
                    <Avatar size="large" icon={<AiOutlineUser /> }   />
                    <div>
                        <p><span>{notification.senderName}</span> send you a friend request </p>
                        <p className="nav-menu-dropmenu-notification-time">about an hour ago</p>
                    </div>
                </li> 
                
            ))}
      </ul>
  );

const handleNotificationRead = () => {
    let targetUsers = [];
    notifications.forEach(notification => {
        return targetUsers.push(notification.senderId);
    })
        dispatch(markNotification(targetUsers))
        .then(res => {
            dispatch(getCountNotification())
            .then(res => {
                setCountNotification(res.payload.data)
                console.log(res.payload.data);
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
}

    return (
        <Badge count={countNotification} size="small" onClick={handleNotificationRead}>
            <Popover 
                    placement="bottomRight" 
                    trigger="click" 
                    content={contentMenuNotification}
                    className="nav-menu-right-dropmenu"
            >
                <div className="nav-menu-right-item"><GiEarthAmerica/></div>
            </Popover>
        </Badge>
    )
}

export default Notification
