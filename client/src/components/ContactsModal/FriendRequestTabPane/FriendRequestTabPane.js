import React, { useState, useEffect } from 'react';
import { List, Avatar, Button} from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { getFriendRequestList, removeContactReqReceive } from '../../../_actions/contact_action';


function FriendRequestTabPane() {
    const [friendRequestList,setFriendRequestList] = useState([]);
    const  notificationAddNew = useSelector(state => state.notification.notificationAddNew)
    const  notiRemoveReqContactSent = useSelector(state => state.notification.notiRemoveReqContactSent)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFriendRequestList())
            .then(res => {
                setFriendRequestList(res.payload);
            })
    }, [notificationAddNew,notiRemoveReqContactSent])
    const handleDeleteFriendReq = (id) => {
        dispatch(removeContactReqReceive(id))
        .then(res => {
            console.log(res.payload)
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
                            
                         <Button type="primary" className="btn-confirm-req">Confirm</Button>
                           <Button type="primary" className="btn-delete-req" onClick={()=>handleDeleteFriendReq(item._id)}>Delete</Button>    
                    </List.Item>
                )}
            />
        </div>
    )
}

export default FriendRequestTabPane