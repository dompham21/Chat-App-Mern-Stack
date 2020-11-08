import React, { useState, useRef } from 'react';
import {  Input, List, Avatar, Badge} from 'antd';
import './SearchUserTabPane.css';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserPlus,FaUserTimes } from 'react-icons/fa'
import FilterContact from './FilterContact/FilterContact';
import { searchUser } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';
import { addContact, removeContactReq } from '../../../_actions/contact_action';
import LoadingListUser from '../../LoadingPage/LoadingListUser/LoadingListUser';




function SearchUserTabPane() {
    const [nameToSearch, setNameToSearch] = useState('')
    const [listUser, setListUser] = useState([]);
    const [loading,setLoading] = useState(false);

    const refAddContact = useRef([]);
    const refRemoveContact = useRef([]);

    const dispatch = useDispatch()

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
                    refRemoveContact.current[id].style.display = "block";
                    // socketConnect.emit('add-new-contact', {contactId:id})
                }
            })
            .catch(err=>{
                console.log(err);
            })    
    }

    const handleRemoveContact = (id) => {
        dispatch(removeContactReq(id))
            .then(res => {
                if(res.payload.removeSuccess){
                    console.log(refAddContact.current[id]);
                    refAddContact.current[id].style.display = "block";
                    refRemoveContact.current[id].style.display = "none";  
                }
            })
            .catch(err=>{
                console.log(err);
            })       
    }

    return (
        <>
            <FilterContact/>
            <div className="contact-search-user">
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
                            actions={[
                                <Badge size="small" >
                                    <div 
                                        className="nav-menu-right-item search-add-user-icon"
                                        ref={el => (refAddContact.current[item._id] = el)}   
                                        onClick={()=>handleAddContact(item._id)}
                                    ><FaUserPlus/></div>
                                </Badge>,
                                <Badge size="small" >
                                    <div 
                                        className="nav-menu-right-item search-remove-user-icon"
                                        ref={el => (refRemoveContact.current[item._id] = el)} 
                                        style={{display:"none"}} 
                                        onClick={()=>handleRemoveContact(item._id)}
                                    ><FaUserTimes/></div>
                                </Badge>
                            ]}
                        >     
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="contact-search-list-item-avatar"/>}
                                title={<a href="https://ant.design" className="contact-search-list-item-name">{item.username}</a>}
                                description={<p className="contact-search-list-item-description">Lives in Hoai Nhon, Binh Dinh, Viet Nam</p>}
                            />
                            
                        </List.Item>
                    )}
                />
                }
            </div>
                    
        </>
    )
}

export default SearchUserTabPane
