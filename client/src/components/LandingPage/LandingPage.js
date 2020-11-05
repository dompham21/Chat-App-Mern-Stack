  
import React, {  useState, useRef, useEffect } from 'react'
import { List, Avatar, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { searchUser } from '../../_actions/user_action';
import { addContact, removeContactReq } from '../../_actions/contact_action';
import socket from '../../socket';
const { Search } = Input;
let socketConnect;
function LandingPage() {
    const [data,setData] = useState('');
    const dispatch = useDispatch()
    const refAddContact = useRef([]);
    const refRemoveContact = useRef([]);

    useEffect(() => {
        socketConnect = socket();
        socketConnect.on('response-add-new-contact',data=>{
            console.log(data);
        });
    }, [])

    const onSearch = (values) => {
       dispatch(searchUser(values))
        .then(res=>{
            setData(res.payload)
        })
        .catch(err=>{
            console.log(err);
        })

    
        
   }

   const handleAddContact = (id) => {
        dispatch(addContact(id))
            .then(res => {
                if(res.payload.addSuccess){
                    refAddContact.current[id].style.display = "none";
                    refRemoveContact.current[id].style.display = "block";
                    socketConnect.emit('add-new-contact', {contactId:id})
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
                <div className="app">
                    <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    />
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        rowKey={key => key.id}
                        renderItem={(item,index) => (
                        <List.Item key={index}>
                            <List.Item.Meta 
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.username}</a>}
                                description={[
                                        <Button type="primary" ref={el => (refAddContact.current[item._id] = el)}   onClick={()=>handleAddContact(item._id)}>Add</Button>,
                                        <Button type="default" ref={el => (refRemoveContact.current[item._id] = el)} style={{display:"none"}} onClick={()=>handleRemoveContact(item._id)} >Remove</Button>
                                    ]
                            }        
                            />
                        </List.Item>
                        )}
                    />
                </div>
            </>
    )
}

export default LandingPage