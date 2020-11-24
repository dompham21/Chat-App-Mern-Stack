import React, { useState, useEffect } from 'react';
import { List, Avatar, Badge, Tooltip} from 'antd';
import { FaUserTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { getWaitingAcceptList, removeContactReq } from '../../../_actions/contact_action';
import LoadingListUser from '../../Loading/LoadingListUser/LoadingListUser';


function WaitingAcceptTabPane() {
    const [waitingAcceptList,setWaitingAcceptList] = useState([]);
    const removeSuccess = useSelector(state => state.contact.removeSuccess)
    const addSuccess = useSelector(state => state.contact.addSuccess)
    const  notiRemoveReqContactReceived = useSelector(state => state.notification.notiRemoveReqContactReceived)
    const notiApproveReqContactReceived = useSelector(state => state.notification.notiApproveReqContactReceived)
    const socket = useSelector(state => state.notification.connectSocketIo)
    const [loading,setLoading] = useState(true);


    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchData(){
            try {
                let response = await dispatch(getWaitingAcceptList())
                setWaitingAcceptList(response.payload);
                setLoading(false)
            } catch (error) {
                console.log(error)
            }   
        }
        fetchData();
    }, [removeSuccess,addSuccess,notiRemoveReqContactReceived,notiApproveReqContactReceived])
    
    const handleRemoveContact = async (id) => {
       try {
        let response = await dispatch(removeContactReq(id))  
        if(response.payload.removeSuccess){
            socket.emit('remove-req-contact-sent',{contactId:id})
        } 
       } catch (error) {
            console.log(error)
       }
    }
    return (
        <div className="container-contact-list-user">
           {loading ? <LoadingListUser/> : <List       
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
                            avatar={<Avatar src={item.avatar} className="contact-search-list-item-avatar"/>}
                            title={<span className="contact-search-list-item-name">{item.username}</span>}
                            description={<p className="contact-search-list-item-description">{item.address?item.address:''}</p>}
                        />
                                
                    </List.Item>
                )}
            />}
        </div>
    )
}

export default WaitingAcceptTabPane