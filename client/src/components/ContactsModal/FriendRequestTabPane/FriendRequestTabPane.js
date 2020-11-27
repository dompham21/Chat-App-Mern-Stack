import React, { useState, useEffect } from 'react';
import { List, Avatar, Button} from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { getFriendRequestList, removeContactReqReceived, approveContactReqReceived } from '../../../_actions/contact_action';
import LoadingListUser from '../../Loading/LoadingListUser/LoadingListUser';

function FriendRequestTabPane() {
    const [friendRequestList,setFriendRequestList] = useState([]);
    const  notificationAddNew = useSelector(state => state.notification.notificationAddNew)
    const  notiRemoveReqContactSent = useSelector(state => state.notification.notiRemoveReqContactSent)
    const removeReceivedSuccess = useSelector(state => state.contact.removeReceivedSuccess)
    const approveContactReceived = useSelector(state => state.contact.approveContactReqReceived)
    const socket = useSelector(state => state.notification.connectSocketIo)
    const [loading,setLoading] = useState(true);


    const dispatch = useDispatch()


    useEffect(() => {
        async function fetchData(){
            try {
                let response = await dispatch(getFriendRequestList())
                setFriendRequestList(response.payload);
                setLoading(false)
            } catch (error) {
                console.log(error)
            }      
        }
        fetchData()
    }, [notificationAddNew,notiRemoveReqContactSent,removeReceivedSuccess,approveContactReceived,dispatch])

    const handleDeleteFriend = async (id) => {
        try {
            let response = await dispatch(removeContactReqReceived(id))
            if(response.payload.removeSuccess){
                socket.emit('remove-req-contact-received',{contactId:id})
            }  
        } catch (error) {
           console.log(error) 
        }    
    }

    const handleApproveFriendReq = async (id) => {
        try {
            let response = await dispatch(approveContactReqReceived(id))
            if(response.payload.approveSuccess){
                socket.emit('approve-request-contact-received',{contactId:id})
            }
        } catch (error) {
            console.log(error) 
        }
        
    }
    return (
        <div className="container-contact-list-user">
            {loading? <LoadingListUser/> : <List       
                itemLayout="horizontal"
                className="contact-search-list"
                dataSource={friendRequestList}
                renderItem={item => (
                    <List.Item
                        className="contact-search-list-item"
                    >     
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} className="contact-search-list-item-avatar"/>}
                            title={<span className="contact-search-list-item-name">{item.username}</span>}
                            description={<p className="contact-search-list-item-description">{item.address?item.address:''}</p>}
                        /> 
                            <Button type="primary" className="btn-confirm-req" onClick={()=>handleApproveFriendReq(item._id)}>Confirm</Button>
                            <Button type="primary" className="btn-delete-req" onClick={()=>handleDeleteFriend(item._id)}>Delete</Button>    
                    </List.Item>
                )}
            />}
        </div>
    )
}

export default FriendRequestTabPane