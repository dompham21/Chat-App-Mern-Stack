import React, { useState, useRef, useEffect } from 'react';
import {  Input, List, Avatar, Badge, Tooltip,Button} from 'antd';
import './SearchUserTabPane.css';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserPlus,FaUserTimes } from 'react-icons/fa'
import { searchUser } from '../../../_actions/user_action';
import { useDispatch, useSelector} from 'react-redux';
import { addContact, removeContact, approveContactReqReceived, removeContactReqReceived } from '../../../_actions/contact_action';
import LoadingListUser from '../../LoadingPage/LoadingListUser/LoadingListUser';



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

    const handleEnterSubmit = (event) => {
        if(event.key === 'Enter' && nameToSearch !== ''){
            setLoading(true);
            dispatch(searchUser(nameToSearch))
            .then(res=>{
                setListUser(res.payload);
                console.log(res.payload)
                setLoading(false);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    const handleAddContact = (id) => {
        dispatch(addContact(id))
            .then(res => {
                if(res.payload.addSuccess){
                    refAddContact.current[id].style.display = "none";
                    refRemoveRequest.current[id].style.display = "block";
                    socket.emit('add-new-contact', {contactId:id})
                }
            })
            .catch(err=>{
                console.log(err);
            })    
    }

    const handleRemoveContact = (id) => {
        dispatch(removeContact(id))
        .then(res => {
            if(res.payload.removeSuccess){
                refAddContact.current[id].style.display = "block";
                refRemoveContact.current[id].style.display = "none";
                socket.emit('remove-contact',{contactId:id})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleRemoveRequest = (id) => {
        dispatch(removeContactReqReceived(id))
            .then(res => {
                if(res.payload.removeSuccess){
                    refAddContact.current[id].style.display = "block";
                    refRemoveRequest.current[id].style.display = "none";
                    socket.emit('remove-req-contact-sent',{contactId:id})
                }
            })
            .catch(err=>{
                console.log(err);
            })       
    }

    const handleDeleteFriend = (id) => {
        dispatch(removeContactReqReceived(id))
        .then(res => {
            if(res.payload.removeSuccess){
                refAddContact.current[id].style.display = "block";
                refApproveReq.current[id].style.display = "none";
                refRemoveReceived.current[id].style.display = "none";
                socket.emit('remove-req-contact-received',{contactId:id})
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
                refRemoveContact.current[id].style.display = "block";
                refApproveReq.current[id].style.display = "none";
                refRemoveReceived.current[id].style.display = "none";
                socket.emit('approve-request-contact-received',{contactId:id})
            }
        })
        .catch(err => {
            console.log(err);
        })
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
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="contact-search-list-item-avatar"/>}
                                title={<a href="https://ant.design" className="contact-search-list-item-name">{item.username}</a>}
                                description={<p className="contact-search-list-item-description">Lives in Hoai Nhon, Binh Dinh, Viet Nam</p>}
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
