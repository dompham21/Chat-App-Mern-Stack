import React, { useState, useEffect, useRef } from 'react'
import {HiPencilAlt} from 'react-icons/hi'
import {AiOutlineSearch} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import {  Modal, Tooltip, Input,List,Button,Avatar} from 'antd'
import './ModalCreateGroupChat.css'
import { searchUserGroupChat } from '../../../_actions/user_action';
import { addNewGroupChat } from '../../../_actions/message_action';


function ModalCreateGroupChat() {
    const [visible,setVisible] = useState(false);
    const [visibleAddGroupTemp,setVisibleAddGroupTemp] = useState(true)
    const [nameToSearch, setNameToSearch] = useState('')
    const [listUserSearch,setListUserSearch] = useState([])
    const [listUserAddToGroupTemp,setListUserAddToGroupTemp] = useState([])
    const [nameOfGroup,setNameOfGroup] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))
    const socket = useSelector(state => state.notification.connectSocketIo)

    const dispatch = useDispatch()
    const refBtnAdd = useRef([]);
    const refBtnRemove = useRef([]);


    const handleEnterSubmit = (event) => {
        if(event.key === 'Enter' && nameToSearch !== ''){
            dispatch(searchUserGroupChat(nameToSearch))
            .then(res=>{
                setListUserSearch(res.payload)
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    const handleAddUserToGroup = (id,username) => {
        let infoUser = {
            id: id,
            username: username
        }

        setListUserAddToGroupTemp([...listUserAddToGroupTemp,infoUser]);
        if(refBtnAdd.current){
            refBtnAdd.current[id].style.display = "none"
        }
        if(refBtnRemove.current){
            refBtnRemove.current[id].style.display = "block"
        }
        setVisibleAddGroupTemp(false)
    }
    const handleRemoveUserToGroup = (id,username) => {
        setListUserAddToGroupTemp(listUserAddToGroupTemp.filter(item=>{
            return item.id !== id
        }))
        if(refBtnRemove.current){
            refBtnRemove.current[id].style.display = "none"
        }
        if(refBtnAdd.current){
            refBtnAdd.current[id].style.display = "block"
        }
    }
    const handleCancelAddGroup = () => {
        listUserAddToGroupTemp.forEach(item => {
            if( refBtnRemove.current[item.id].style.display == "block"){
                refBtnRemove.current[item.id].style.display = "none"
                refBtnAdd.current[item.id].style.display = "block"
            }
        })
        setListUserAddToGroupTemp([]);

    }
    const handleCreateAddGroup = () => {
        if(!nameOfGroup || nameOfGroup.length < 3 || nameOfGroup.length > 30){
            //notification please enter your group name, min name is 3 and max is 30
            return;
        }
        if(listUserAddToGroupTemp.length < 2){
            //notification min of group is two people
            return;
        }
        const dataToEmit = {
            listUser: listUserAddToGroupTemp,
            nameGroup: nameOfGroup
        }
        dispatch(addNewGroupChat(dataToEmit))
        .then(res => {
            console.log(res.payload)
            socket.emit("new-group-created",res.payload)
        })
        listUserAddToGroupTemp.forEach(item => {
            if( refBtnRemove.current[item.id].style.display == "block"){
                refBtnRemove.current[item.id].style.display = "none"
                refBtnAdd.current[item.id].style.display = "block"
            }
        })
        setTimeout(() => {
            setVisible(false);
        }, 3000); 
        setListUserAddToGroupTemp([]);
        setNameOfGroup('')  
             
    }
    return (
        <>
           <Tooltip title={"Create group chat"} placement="top">
                <HiPencilAlt 
                    style={{color: "#1890ff", fontSize: "24px", cursor: "pointer"}}
                    onClick={()=>setVisible(true)}
                />
            </Tooltip> 
            
            <Modal
                title="Create Group Chat"
                visible={visible}
                width={1100}
                footer={null}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                maskClosable={false}
                className="create-group-modal-layout"
            >
                <div className="create-group-list-container">
                    <div className="create-group-search-list">
                     <Input className="message-list-contact-search modal-create-group-input"
                                prefix={<AiOutlineSearch /> }
                                placeholder="Search users to add"
                                onKeyPress={handleEnterSubmit}
                                onChange={(val)=>(setNameToSearch(val.target.value))}
                        />
                        {listUserSearch.length ? 
                            <List       
                                itemLayout="horizontal"
                                className="contact-search-list"
                                dataSource={listUserSearch}
                                renderItem={item => (
                                    <List.Item
                                        className="contact-search-list-item"
                                    >     
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="contact-search-list-item-avatar"/>}
                                            title={<a href="https://ant.design" className="contact-search-list-item-name">{item.username}</a>}
                                            description={<p className="contact-search-list-item-description">Lives in Hoai Nhon, Binh Dinh, Viet Nam</p>}
                                        />
                                        <Button 
                                            className="btn-create" 
                                            ref={el => (refBtnAdd.current[item._id] = el)}  
                                            onClick={()=>handleAddUserToGroup(item._id,item.username)}
                                        >Add to group</Button>
                                        <Button 
                                            style={{display: "none"}}
                                            className="btn-cancel" 
                                            ref={el => (refBtnRemove.current[item._id] = el)} 
                                            onClick={()=>handleRemoveUserToGroup(item._id,item.username)}
                                        >Remove user</Button>
                                    </List.Item>
                                )}
                            />
                            : 
                           ''
                        }
                    </div>
                    <div className="create-group-list-border"  style={{display: visibleAddGroupTemp ? "none" : "block"}}/>
                    <div className="create-group-search-list-add"  style={{display:visibleAddGroupTemp ? "none" : "block"}}>
                        <Input className="message-list-contact-search"
                                placeholder="Enter name of group"
                                required
                                onChange={(val)=>{setNameOfGroup(val.target.value)}}
                                value={nameOfGroup}
                        />
                        {listUserSearch.length ? 
                            <List       
                                itemLayout="horizontal"
                                className="contact-search-list create-group-list-right"
                                dataSource={listUserAddToGroupTemp}
                                renderItem={item => (
                                    <List.Item
                                        className="contact-search-list-item"
                                    >     
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="contact-search-list-item-avatar"/>}
                                            title={<a href="https://ant.design" className="contact-search-list-item-name">{item.username}</a>}
                                            description={<p className="contact-search-list-item-description">Lives in Hoai Nhon, Binh Dinh, Viet Nam</p>}
                                        />
                                    </List.Item>
                                )}
                            />
                            : ''
                        }
                        <div style={{display:"flex", justifyContent:"center", marginTop:"24px"}}>
                            <Button className="btn-create" onClick={handleCreateAddGroup}>Create</Button>
                            <Button className="btn-cancel" onClick={handleCancelAddGroup}>Cancel</Button>
                        </div>
                        
                    </div>
                    
                </div>

                
                
            </Modal>
        </>
    )
}

export default ModalCreateGroupChat
