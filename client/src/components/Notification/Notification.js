import React, { useEffect, useState } from 'react'
import {Badge,Popover, Avatar} from 'antd';
import {AiOutlineUser} from 'react-icons/ai'
import {GiEarthAmerica} from 'react-icons/gi'

import './Notification.css'
import socket from '../../socket';
import { useDispatch,useSelector } from 'react-redux';
import { getNotification, markNotification, getCountNotification, notificationAddNewReq, notificationRemoveReqContactReceived, notificationRemoveReqContactSent, notificationApproveReqContactReceived, notificationRemoveContact } from '../../_actions/notification_action';

function Notification() {
    const [notifications,setNotifications] = useState([]);
    const [countNotification,setCountNotification] = useState(0);
    const  notificationAddNew = useSelector(state => state.notification.notificationAddNew)
    const  notiRemoveReqContactReceived = useSelector(state => state.notification.notiRemoveReqContactReceived)
    const  notiRemoveReqContactSent = useSelector(state => state.notification.notiRemoveReqContactSent)
    const  removeReceivedSuccess = useSelector(state => state.contact.removeReceivedSuccess)
    const  notiApproveReqContactReceived = useSelector(state => state.notification.notiApproveReqContactReceived)

    const token = localStorage.getItem('token')

    const dispatch = useDispatch()

    let socketConnect;
    useEffect(() => {
        if(token){
            socketConnect = socket();
            socketConnect.on('response-add-new-contact',data=>{
                dispatch(notificationAddNewReq(data.currentUser))
            });
    
            socketConnect.on('response-approve-request-contact-received', data => {
                dispatch(notificationApproveReqContactReceived(data.currentUser))
            })
    
            socketConnect.on('response-remove-req-contact-sent',data => {
                dispatch(notificationRemoveReqContactSent(data.currentUser))
            })
    
            socketConnect.on('response-remove-req-contact-received',data => {
                dispatch(notificationRemoveReqContactReceived(data.currentUser))
            })
    
            socketConnect.on('response-remove-contact',data => {
                dispatch(notificationRemoveContact(data.currentUser))
            })
            return () => {
                socketConnect.emit('disconnect');
                socketConnect.off();
            }
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
        })
        .catch(err=>{
            console.log(err)
        })
    }, [notificationAddNew,notiRemoveReqContactSent,notiRemoveReqContactReceived,removeReceivedSuccess,notiApproveReqContactReceived])
   

    const renderTypeNotification = (notificationType,senderName) => {
        switch(notificationType){
            case "add_contact":
                return (<p><span>{senderName}</span> send you a friend request </p>)
            case "approve_contact":
                return (<p><span>{senderName}</span> accepted your friend request </p>)
            default:
                return '';
        }
    }
    const contentMenuNotification = (
        <ul className="nav-menu-list-dropmenu">
            {notifications.map((notification,index)=> (
                <li className="nav-menu-dropmenu-infomation nav-menu-dropmenu-notification" key={index}>
                    <Avatar size="large" icon={<AiOutlineUser /> }   />
                    <div>
                        {renderTypeNotification(notification.notificationType,notification.senderName)}
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
            <Badge count={countNotification} overflowCount={99} size="small" onClick={handleNotificationRead}>
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
