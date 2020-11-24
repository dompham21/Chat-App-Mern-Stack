import React, { useState, useRef, useEffect } from 'react';
import {  Input, List, Avatar, Badge, Tooltip,Button} from 'antd';
import './SearchUserTabPane.css';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserPlus,FaUserTimes } from 'react-icons/fa'
import { searchUser } from '../../../_actions/user_action';
import { useDispatch, useSelector} from 'react-redux';
import { addContact, removeContact, approveContactReqReceived, removeContactReqReceived } from '../../../_actions/contact_action';
import LoadingListUser from '../../Loading/LoadingListUser/LoadingListUser';



function SearchUserTabPane() {
    const [nameToSearch, setNameToSearch] = useState('')
    const [listUser, setListUser] = useState([]);
    const [loading,setLoading] = useState(false);
    const refAddContact = useRef([]);
    const refRemoveContact = useRef([]);
    const refRemoveRequest = useRef([]);
    const refApproveReq = useRef([])
    const refRemoveReceived = useRef([])
    const socket = useSelector(state => state.notification.connectSocketIo)

    const dispatch = useDispatch()

    const handleEnterSubmit = async (event) => {
        if(event.key === 'Enter' && nameToSearch !== ''){
            setLoading(true);
            try {
                let response = await dispatch(searchUser(nameToSearch))
                setListUser(response.payload);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }     
        }
    }
    const handleAddContact = async (id) => {
        try {
            let response = await dispatch(addContact(id))
            if(response.payload.addSuccess){
                refAddContact.current[id].style.display = "none";
                refRemoveRequest.current[id].style.display = "block";
                socket.emit('add-new-contact', {contactId:id})
            } 
        } catch (error) {
            console.log(error)
        }             
    }

    const handleRemoveContact = async (id) => {
        try {
            let response = await dispatch(removeContact(id))
            if(response.payload.removeSuccess){
                refAddContact.current[id].style.display = "block";
                refRemoveContact.current[id].style.display = "none";
                socket.emit('remove-contact',{contactId:id})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveRequest = async (id) => {
        try {
            let response = await dispatch(removeContactReqReceived(id))
            if(response.payload.removeSuccess){
                refAddContact.current[id].style.display = "block";
                refRemoveRequest.current[id].style.display = "none";
                socket.emit('remove-req-contact-sent',{contactId:id})
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleDeleteFriend = async (id) => {
        try {
            let response = await dispatch(removeContactReqReceived(id))
            if(response.payload.removeSuccess){
                refAddContact.current[id].style.display = "block";
                refApproveReq.current[id].style.display = "none";
                refRemoveReceived.current[id].style.display = "none";
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
                refRemoveContact.current[id].style.display = "block";
                refApproveReq.current[id].style.display = "none";
                refRemoveReceived.current[id].style.display = "none";
                socket.emit('approve-request-contact-received',{contactId:id})
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
            <div className="container-contact-list-user">
                <Input 
                    placeholder="Search Contacts" 
                    prefix={<AiOutlineSearch/> } 
                    className="contact-search-user-input" 
                    onKeyPress={handleEnterSubmit}
                    onChange={(val)=>(setNameToSearch(val.target.value))}
                />
                {loading ? <LoadingListUser/> :
                <List       
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
                                <Tooltip placement="top" title="Add Friend">
                                    <Badge size="small" >
                                        <div 
                                            className="nav-menu-right-item search-add-user-icon"
                                            ref={el => (refAddContact.current[item._id] = el)} 
                                            style={{display: !item.statusSend && !item.statusAdd ? "inline-block":"none"}}   
                                            onClick={()=>handleAddContact(item._id)}
                                        ><FaUserPlus/></div>
                                    </Badge>
                                </Tooltip>
                                <Tooltip placement="top" title="Remove Request">
                                    <Badge size="small" >
                                        <div 
                                            className="nav-menu-right-item search-remove-user-icon"
                                            ref={el => (refRemoveRequest.current[item._id] = el)} 
                                            style={{display:item.statusAdd  && !item.status ?"inline-block":"none"}} 
                                            onClick={()=>handleRemoveRequest(item._id)}
                                        ><FaUserTimes/></div>
                                    </Badge>
                                </Tooltip>
                                <Tooltip placement="top" title="Remove Contact">
                                    <Button 
                                        type="primary"
                                        ref={el => (refRemoveContact.current[item._id] = el)}  
                                        className="btn-delete-req"
                                        style={{display:(item.status && item.statusSend )|| (item.status && item.statusAdd) ? "inline-block":"none"}}
                                        onClick={()=>handleRemoveContact(item._id)}
                                    >Remove</Button>    
                                </Tooltip>
                                <div style={{display: !item.status &&  item.statusSend? "inline-block": "none"}}>
                                    <Button 
                                        type="primary" 
                                        className="btn-confirm-req"
                                        ref={el => (refApproveReq.current[item._id] = el)} 

                                        onClick={()=>handleApproveFriendReq(item._id)}
                                    >Confirm</Button>
                                    <Button 
                                        type="primary" 
                                        className="btn-delete-req" 
                                        ref={el => (refRemoveReceived.current[item._id] = el)} 
                                        onClick={()=>handleDeleteFriend(item._id)}
                                    >Delete</Button>  
                                </div>
                        </List.Item>
                    )}
                />
                }
            </div>
                    
    )
}

export default SearchUserTabPane
