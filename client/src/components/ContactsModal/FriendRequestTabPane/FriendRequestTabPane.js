import React, { useState, useEffect } from 'react';
import { List, Avatar, Button} from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { getFriendRequestList, removeContactReqReceived, approveContactReqReceived } from '../../../_actions/contact_action';
import socket from '../../../socket';

let socketConnect;
function FriendRequestTabPane() {
    const [friendRequestList,setFriendRequestList] = useState([]);
    const  notificationAddNew = useSelector(state => state.notification.notificationAddNew)
    const  notiRemoveReqContactSent = useSelector(state => state.notification.notiRemoveReqContactSent)
    const  notiRemoveReqContactReceived = useSelector(state => state.notification.notiRemoveReqContactReceived)
    const removeReceivedSuccess = useSelector(state => state.contact.removeReceivedSuccess)
    const approveContactReceived = useSelector(state => state.contact.approveContactReqReceived)

    const dispatch = useDispatch()

    useEffect(() => {
        socketConnect = socket();
        return () => {
            socketConnect.emit('disconnect');
            socketConnect.off();
        }
    }, [])

    useEffect(() => {
        dispatch(getFriendRequestList())
            .then(res => {
                setFriendRequestList(res.payload);
            })
    }, [notificationAddNew,notiRemoveReqContactSent,removeReceivedSuccess,approveContactReceived])

    const handleDeleteFriend = (id) => {
        dispatch(removeContactReqReceived(id))
        .then(res => {
            if(res.payload.removeSuccess){
                socketConnect.emit('remove-req-contact-received',{contactId:id})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleApproveFriendReq = (id) => {
        dispatch(approveContactReqReceived(id))
        .then(res => {
            if(res.payload.approveSuccess){
                socketConnect.emit('approve-request-contact-received',{contactId:id})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="container-contact-list-user">
            <List       
                itemLayout="horizontal"
                className="contact-search-list"
                dataSource={friendRequestList}
                renderItem={item => (
                    <List.Item
                        className="contact-search-list-item"
                    >     
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="contact-search-list-item-avatar"/>}
                            title={<a href="https://ant.design" className="contact-search-list-item-name">{item.username}</a>}
                            description={<p className="contact-search-list-item-description">Lives in Hoai Nhon, Binh Dinh, Viet Nam</p>}
                        /> 
                            <Button type="primary" className="btn-confirm-req" onClick={()=>handleApproveFriendReq(item._id)}>Confirm</Button>
                            <Button type="primary" className="btn-delete-req" onClick={()=>handleDeleteFriend(item._id)}>Delete</Button>    
                    </List.Item>
                )}
            />
        </div>
    )
}

export default FriendRequestTabPane