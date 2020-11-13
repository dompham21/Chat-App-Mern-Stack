import React, { useState, useRef, useEffect } from 'react';
import {  Input, List, Avatar, Badge, Tooltip,Button} from 'antd';
import './SearchUserTabPane.css';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserPlus,FaUserTimes } from 'react-icons/fa'
import { searchUser } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';
import { addContact, removeContactReq, removeContact } from '../../../_actions/contact_action';
import LoadingListUser from '../../LoadingPage/LoadingListUser/LoadingListUser';
import socket from '../../../socket';


let socketConnect;

function SearchUserTabPane() {
    const [nameToSearch, setNameToSearch] = useState('')
    const [listUser, setListUser] = useState([]);
    const [loading,setLoading] = useState(false);
    const refAddContact = useRef([]);
    const refRemoveContact = useRef([]);
    const refRemoveRequest = useRef([]);

    

    const dispatch = useDispatch()


    useEffect(() => {
        socketConnect = socket();
        return () => {
            socketConnect.emit('disconnect');
            socketConnect.off();
        }
    }, [])
    const handleEnterSubmit = (event) => {
        if(event.key === 'Enter' && nameToSearch !== ''){
            setLoading(true);
            dispatch(searchUser(nameToSearch))
            .then(res=>{
                setListUser(res.payload);
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
                    socketConnect.emit('add-new-contact', {contactId:id})
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
                socketConnect.emit('remove-contact',{contactId:id})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleRemoveRequest = (id) => {
        dispatch(removeContactReq(id))
            .then(res => {
                if(res.payload.removeSuccess){
                    refAddContact.current[id].style.display = "block";
                    refRemoveRequest.current[id].style.display = "none";
                    socketConnect.emit('remove-req-contact-sent',{contactId:id})
                }
            })
            .catch(err=>{
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
                                            style={{display:item.statusAdd == "no" || !item.statusAdd ?"inline-block":"none"}}   
                                            onClick={()=>handleAddContact(item._id)}
                                        ><FaUserPlus/></div>
                                    </Badge>
                                </Tooltip>
                                <Tooltip placement="top" title="Remove Request">
                                    <Badge size="small" >
                                        <div 
                                            className="nav-menu-right-item search-remove-user-icon"
                                            ref={el => (refRemoveRequest.current[item._id] = el)} 
                                            style={{display:item.statusAdd == "yes" && item.status == false ?"inline-block":"none"}} 
                                            onClick={()=>handleRemoveRequest(item._id)}
                                        ><FaUserTimes/></div>
                                    </Badge>
                                </Tooltip>
                                <Tooltip placement="top" title="Remove Contact">
                                    <Button 
                                        type="primary"
                                        ref={el => (refRemoveContact.current[item._id] = el)}  
                                        className="btn-delete-req"
                                        style={{display:item.status == true && item.statusAdd == "yes" ? "inline-block":"none"}}
                                        onClick={()=>handleRemoveContact(item._id)}
                                    >Remove</Button>    
                                </Tooltip>
                        </List.Item>
                    )}
                />
                }
            </div>
                    
    )
}

export default SearchUserTabPane
