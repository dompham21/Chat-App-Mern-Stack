import React, { useState, useEffect } from 'react';
import { Tabs, Menu, Badge , Modal} from 'antd';
import './ContactsModal.css';
import {AiOutlineUserAdd} from 'react-icons/ai'

import SearchUserTabPane from './SearchUserTabPane/SearchUserTabPane';
import ContactUserTabPane from './ContactUserTabPane/ContactUserTabPane';
import WaitingAcceptTabPane from './WaitingAcceptTabPane/WaitingAcceptTabPane';
import FriendRequestTabPane from './FriendRequestTabPane/FriendRequestTabPane';
import { useDispatch, useSelector } from 'react-redux';
import { getCountContactFriendRequest,getCountContactWaitingAccept } from '../../_actions/contact_action';
import FilterContact from './FilterContact/FilterContact';

const { TabPane } = Tabs;

function ContactsModal() {
    const [visible, setVisible] = useState(false);
    const [countFriendReq, setCountFriendReq] = useState(0);
    const [countWaitingAccept, setCountWaitingAccpet] = useState(0);
    const removeSuccess = useSelector(state => state.contact.removeSuccess)
    const addSuccess = useSelector(state => state.contact.addSuccess)
    const  notificationAddNew = useSelector(state => state.notification.notificationAddNew)
    const  notiRemoveReqContactSent = useSelector(state => state.notification.notiRemoveReqContactSent)
    const  notiRemoveReqContactReceived = useSelector(state => state.notification.notiRemoveReqContactReceived)
    const removeReceivedSuccess = useSelector(state => state.contact.removeReceivedSuccess)   
    const approveContactReceived = useSelector(state => state.contact.approveContactReqReceived)
    const notiApproveReqContactReceived = useSelector(state => state.notification.notiApproveReqContactReceived)


    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCountContactFriendRequest())
        .then(res => {
            setCountFriendReq(res.payload)
        })
        .catch(err => {
            console.log(err);
        })

        dispatch(getCountContactWaitingAccept())
        .then(res => {
            setCountWaitingAccpet(res.payload)
        })
        .catch(err => {
            console.log(err);
        })
    }, [removeSuccess,addSuccess,notificationAddNew,notiApproveReqContactReceived,notiRemoveReqContactSent,notiRemoveReqContactReceived,removeReceivedSuccess,approveContactReceived])

    return (
        <>
        <Badge count={countFriendReq+countWaitingAccept} size="small" onClick={() => setVisible(true)}>
                            <div className="nav-menu-right-item"><AiOutlineUserAdd/></div>
        </Badge>
        <Modal
            title="Contacts"
            centered
            visible={visible}
            width={1100}
            footer={null}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
        >
            <Tabs defaultActiveKey="1" type="card" className="contact-modals-layout">
                    <TabPane tab="Search User" key="1" className="contact-modals">
                        <FilterContact/>
                        <SearchUserTabPane/>
                    </TabPane>
                    <TabPane tab={<Badge count="0" offset={[8,-5]} size="small" >Contacts</Badge>} key="2" className="contact-modals">
                        <FilterContact/>
                        <ContactUserTabPane/>
                    </TabPane>
                    <TabPane tab={<Badge count={countWaitingAccept} offset={[8,-5]} size="small" >Waiting to accept</Badge>} key="3" className="contact-modals">
                        <FilterContact/>
                        <WaitingAcceptTabPane/>
                    </TabPane>
                    <TabPane tab={<Badge count={countFriendReq} offset={[8,-5]} size="small" >Friend requests</Badge>} key="4" className="contact-modals">
                        <FilterContact/>
                        <FriendRequestTabPane/>
                    </TabPane>
                </Tabs>
        </Modal>
        </>
        )
}

export default ContactsModal
