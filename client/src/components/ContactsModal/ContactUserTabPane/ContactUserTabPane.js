import React, { useState, useEffect } from 'react';
import { List, Avatar, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getContactList, removeContact } from '../../../_actions/contact_action';
import socket from '../../../socket';
let socketConnect;
function ContactUserTabPane() {
    const [listUser,setListUser] = useState([]);
    const approveContactReqReceived = useSelector(state => state.contact.approveContactReqReceived)
    const removeContactSuccess = useSelector(state => state.contact.removeContactSuccess)
    const notiRemoveContact = useSelector(state => state.notification.notiRemoveContact)
    const notiApproveReqContactReceived = useSelector(state => state.notification.notiApproveReqContactReceived)

    const dispatch = useDispatch()
    useEffect(() => {
        socketConnect = socket();
        return () => {
            socketConnect.emit('disconnect');
            socketConnect.off();
        }
    }, [])

    useEffect(() => {
        dispatch(getContactList())
            .then(res => {
                setListUser(res.payload);
            })
    }, [approveContactReqReceived,removeContactSuccess,notiRemoveContact,notiApproveReqContactReceived])

    const handleRemoveContact = (id) => {
        dispatch(removeContact(id))
        .then(res => {
            if(res.payload.removeSuccess){
                socketConnect.emit('remove-contact',{contactId:id})
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
                dataSource={listUser}
                renderItem={item => (
                    <List.Item
                        className="contact-search-list-item"
                        
                    >     
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="contact-search-list-item-avatar"/>}
                            title={<a href="https://ant.design" className="contact-search-list-item-name">{item.username}</a>}
                            description={<p className="contact-search-list-item-description">Lives in Hoai Nhon, Binh Dinh, Viet Nam</p>}
                        />
                        <Button type="primary" className="btn-delete-req" onClick={()=>handleRemoveContact(item._id)}>Remove</Button>    
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ContactUserTabPane
