import React, { useState, useEffect } from 'react';
import { List, Avatar, Badge, Tooltip} from 'antd';
import { FaUserTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { getWaitingAcceptList, removeContactReq } from '../../../_actions/contact_action';
import socket from '../../../socket';
let socketConnect;

function WaitingAcceptTabPane() {
    const [waitingAcceptList,setWaitingAcceptList] = useState([]);
    const removeSuccess = useSelector(state => state.contact.removeSuccess)
    const addSuccess = useSelector(state => state.contact.addSuccess)
    const  notiRemoveReqContactReceived = useSelector(state => state.notification.notiRemoveReqContactReceived)
    const notiApproveReqContactReceived = useSelector(state => state.notification.notiApproveReqContactReceived)
    useEffect(() => {
        
        socketConnect = socket();
        return () => {
            socketConnect.emit('disconnect');
            socketConnect.off();
        }
    }, [])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getWaitingAcceptList())
            .then(res => {
                setWaitingAcceptList(res.payload);
            })
    }, [removeSuccess,addSuccess,notiRemoveReqContactReceived,notiApproveReqContactReceived])
    const handleRemoveContact = (id) => {
        dispatch(removeContactReq(id))  
        .then(res => {
            if(res.payload.removeSuccess){
                socketConnect.emit('remove-req-contact-sent',{contactId:id})
            }
        })
        .catch(err=>{
            console.log(err);
        })   
    }
    return (
        <div className="container-contact-list-user">
            <List       
                itemLayout="horizontal"
                className="contact-search-list"
                dataSource={waitingAcceptList}
                renderItem={item => (
                    <List.Item
                        className="contact-search-list-item"
                        actions={[
                            <Tooltip placement="top" title="Remove Request">
                            <Badge size="small" >
                                <div className="nav-menu-right-item search-remove-user-icon"
                                    onClick={()=>handleRemoveContact(item._id)}><FaUserTimes/></div>
                            </Badge>
                            </Tooltip>
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
        </div>
    )
}

export default WaitingAcceptTabPane