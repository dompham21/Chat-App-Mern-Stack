import React, { useEffect, useState } from 'react'
import {Badge,Popover, Avatar, notification} from 'antd';
import {AiOutlineUser} from 'react-icons/ai'
import {GiEarthAmerica} from 'react-icons/gi'

import './Notification.css'
import socket from '../../socket';
import { useDispatch,useSelector } from 'react-redux';
import { getNotification, markNotification, getCountNotification, notificationAddNewReq, notificationRemoveReqContactReceived, notificationRemoveReqContactSent, notificationApproveReqContactReceived, notificationRemoveContact, connectSocketIo, notificationCreateNewGroup } from '../../_actions/notification_action';

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
        async function fetchData(){
            try {
                if(token){
                    socketConnect = socket();
                    await dispatch(connectSocketIo(socketConnect))
                    
                    socketConnect.on('response-add-new-contact',async data=>{
                        await dispatch(notificationAddNewReq(data.currentUser))
                    });
            
                    socketConnect.on('response-approve-request-contact-received',async data => {
                        await dispatch(notificationApproveReqContactReceived(data.currentUser))
                    })
            
                    socketConnect.on('response-remove-req-contact-sent', async data => {
                        await dispatch(notificationRemoveReqContactSent(data.currentUser))
                    })
            
                    socketConnect.on('response-remove-req-contact-received',async data => {
                        await dispatch(notificationRemoveReqContactReceived(data.currentUser))
                    })
            
                    socketConnect.on('response-remove-contact',async data => {
                        await dispatch(notificationRemoveContact(data.currentUser))
                    })
                    socketConnect.on('response-new-group-created',async data => {
                        await dispatch(notificationCreateNewGroup(data.response))
                        notification['success']({
                            message: 'Group Created Success',
                            description:
                              'Welcome to Job help! ',
                        });
                    })
                    return () => {
                        socketConnect.emit('disconnect');
                        socketConnect.off();
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
    
    useEffect(() => {
        async function fetchData(){
            try {
                let response = await dispatch(getNotification())
                setNotifications(response.payload)
                let responseCount = await dispatch(getCountNotification())
                setCountNotification(responseCount.payload.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
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

const handleNotificationRead =async () => {
    let targetUsers = [];
    notifications.forEach(notification => {
        return targetUsers.push(notification.senderId);
    })
    try {
        let response = await dispatch(markNotification(targetUsers))
        if(response){
            let responseCount = await dispatch(getCountNotification())
            setCountNotification(responseCount.payload.data)
        }
    } catch (error) {
        console.log(error)
    }
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
