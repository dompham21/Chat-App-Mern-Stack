import React, { useState, useEffect } from 'react';
import { List, Avatar, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getContactList, removeContact } from '../../../_actions/contact_action';
import LoadingListUser from '../../Loading/LoadingListUser/LoadingListUser';

function ContactUserTabPane() {
    const [listUser,setListUser] = useState([]);
    const approveContactReqReceived = useSelector(state => state.contact.approveContactReqReceived)
    const removeContactSuccess = useSelector(state => state.contact.removeContactSuccess)
    const notiRemoveContact = useSelector(state => state.notification.notiRemoveContact)
    const notiApproveReqContactReceived = useSelector(state => state.notification.notiApproveReqContactReceived)
    const socket = useSelector(state => state.notification.connectSocketIo)
    const [loading,setLoading] = useState(true);



    const dispatch = useDispatch()
 

    useEffect(() => {
        async function fetchData(){
            try {
                let response = await dispatch(getContactList())
                setListUser(response.payload);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [approveContactReqReceived,removeContactSuccess,notiRemoveContact,notiApproveReqContactReceived])

    const handleRemoveContact = async (id) => {
        try {
            let response =  await dispatch(removeContact(id))
            if(response.payload.removeSuccess){
                socket.emit('remove-contact',{contactId:id})
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
                dataSource={listUser}
                renderItem={item => (
                    <List.Item
                        className="contact-search-list-item"
                        
                    >     
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} className="contact-search-list-item-avatar"/>}
                            title={<span className="contact-search-list-item-name">{item.username}</span>}
                            description={<p className="contact-search-list-item-description">{item.address?item.address:''}</p>}
                        />
                        <Button type="primary" className="btn-delete-req" onClick={()=>handleRemoveContact(item._id)}>Remove</Button>    
                    </List.Item>
                )}
            />}
        </div>
    )
}

export default ContactUserTabPane
