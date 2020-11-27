import React, { useState, useRef } from 'react'
import {HiPencilAlt} from 'react-icons/hi'
import {AiOutlineSearch} from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux';
import {  Modal, Tooltip, Input,List,Button,Avatar,notification} from 'antd'
import './ModalCreateGroupChat.css'
import { searchUserGroupChat } from '../../../_actions/user_action';
import { addNewGroupChat } from '../../../_actions/message_action';
import { upperCaseFirstName } from '../../../util';


function ModalCreateGroupChat() {
    const [visible,setVisible] = useState(false);
    const [nameToSearch, setNameToSearch] = useState('')
    const [listUserSearch,setListUserSearch] = useState([])
    const [listUserAddToGroupTemp,setListUserAddToGroupTemp] = useState([])
    const [nameOfGroup,setNameOfGroup] = useState('')
    const socket = useSelector(state => state.notification.connectSocketIo)

    const dispatch = useDispatch()
    const refBtnAdd = useRef([]);
    const refBtnRemove = useRef([]);


    const handleEnterSubmit = async (event) => {
        if(event.key === 'Enter' && nameToSearch !== ''){
            try {
                let response = await dispatch(searchUserGroupChat(nameToSearch))
                setListUserSearch(response.payload)
                response.payload.map(item=>{
                    refBtnAdd.current[item._id].style.display = "block"
                    refBtnRemove.current[item._id].style.display =  "none"
                    if(listUserAddToGroupTemp && listUserAddToGroupTemp.length){
                        listUserAddToGroupTemp.map(i=>{
                            if(item._id === i.id){
                                refBtnAdd.current[item._id].style.display = "none"
                                refBtnRemove.current[item._id].style.display =  "block"
                            }
                        })
                    }
                })
            } catch (error) {
                console.log(error)
            }
        } 
    }
    const handleAddUserToGroup = (id,username,avatar,address) => {
        let infoUser = {
            id: id,
            username: username,
            avatar: avatar,
            address: address
        }

        refBtnAdd.current[id].style.display = "none"
        refBtnRemove.current[id].style.display = "block"
        setListUserAddToGroupTemp([...listUserAddToGroupTemp,infoUser]);
        
    }
    const handleRemoveUserToGroup = (id,username) => {
        refBtnRemove.current[id].style.display = "none"
        refBtnAdd.current[id].style.display = "block"
        
        setListUserAddToGroupTemp(listUserAddToGroupTemp.filter(item=>{
            return item.id !== id
        }))
       
    }
    const handleCancelAddGroup = () => {
        listUserAddToGroupTemp.forEach(item => {
            if( refBtnRemove.current[item.id]){
                if( refBtnRemove.current[item.id].style.display === "block"){
                    refBtnRemove.current[item.id].style.display = "none"
                    refBtnAdd.current[item.id].style.display = "block"
                }
            }
            
        })
        setListUserAddToGroupTemp([]);
        setListUserSearch([])
        setNameOfGroup('')
        setNameToSearch('')

    }
    const handleCreateAddGroup = async () => {
        if(listUserAddToGroupTemp.length < 2){
            notification['error']({
                message: 'Create group chat fail',
                description:
                    'Min members of group is two people ',
            });
            return;
        }
        
        if(!nameOfGroup || nameOfGroup.length < 3 || nameOfGroup.length > 30){
            notification['error']({
                message: 'Create group chat fail',
                description:
                    'Please enter your group name, min name is 3 and max is 30 ',
            });
            return;
        }
       
        const dataToEmit = {
            listUser: listUserAddToGroupTemp,
            nameGroup: upperCaseFirstName(nameOfGroup)
        }
        try {
            let response = await dispatch(addNewGroupChat(dataToEmit))
            socket.emit("new-group-created",response.payload)
        } catch (error) {
            console.log(error)
        }
        listUserAddToGroupTemp.forEach(item => {
            if(refBtnRemove.current[item.id]){
                if( refBtnRemove.current[item.id].style.display === "block"){
                    refBtnRemove.current[item.id].style.display = "none"
                    refBtnAdd.current[item.id].style.display = "block"
                }
            }
           
        })
        
        setListUserAddToGroupTemp([]);
        setListUserSearch([])
        setNameOfGroup('')
        setNameToSearch('')
        
        setTimeout(() => {
            setVisible(false);
        }, 3000);   
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
                                value={nameToSearch}
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
                                            avatar={<Avatar src={item.avatar} className="contact-search-list-item-avatar"/>}
                                            title={<span className="contact-search-list-item-name">{item.username}</span>}
                                            description={<p className="contact-search-list-item-description">{item.address?item.address:''}</p>}
                                        />
                                        <Button 
                                            style={{display: "inline-block"}}
                                            className="btn-create" 
                                            onClick={()=>handleAddUserToGroup(item._id,item.username,item.avatar,item.address)}
                                            ref={el => (refBtnAdd.current[item._id] = el)}  
                                        >Add to group</Button>
                                        <Button 
                                            style={{display: "none"}}
                                            className="btn-cancel" 
                                            onClick={()=>handleRemoveUserToGroup(item._id,item.username)}
                                            ref={el => (refBtnRemove.current[item._id] = el)}  
                                        >Remove user</Button>
                                    </List.Item>
                                )}
                            />
                            : 
                           ''
                        }
                    </div>
                    <div className="create-group-list-border"/>
                    <div className="create-group-search-list-add">
                        <Input className="message-list-contact-search"
                                placeholder="Enter name of group"
                                required
                                onChange={(val)=>{setNameOfGroup(val.target.value)}}
                                value={nameOfGroup}
                        />
                        {listUserAddToGroupTemp.length ? 
                            <List       
                                itemLayout="horizontal"
                                className="contact-search-list create-group-list-right"
                                dataSource={listUserAddToGroupTemp}
                                renderItem={item => (
                                    <List.Item
                                        className="contact-search-list-item"
                                    >     
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} className="contact-search-list-item-avatar"/>}
                                            title={<span className="contact-search-list-item-name">{item.username}</span>}
                                            description={<p className="contact-search-list-item-description">{item.address?item.address:''}</p>}
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
