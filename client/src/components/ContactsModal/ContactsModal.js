import React, { useState, useEffect } from 'react';
import { Tabs, Menu, Badge, Select, Modal} from 'antd';
import './ContactsModal.css';
import {AiOutlineUserAdd} from 'react-icons/ai'

import SearchUserTabPane from './SearchUserTabPane/SearchUserTabPane';
import ContactUserTabPane from './ContactUserTabPane/ContactUserTabPane';
import WaitingAcceptTabPane from './WaitingAcceptTabPane/WaitingAcceptTabPane';
import FriendRequestTabPane from './FriendRequestTabPane/FriendRequestTabPane';
import { useDispatch } from 'react-redux';
import { getCountContactFriendRequest,getCountContactWaitingAccept } from '../../_actions/contact_action';

const { TabPane } = Tabs;

function ContactsModal() {
    const [visible, setVisible] = useState(false);
    const [countFriendReq, setCountFriendReq] = useState(0);
    const [countWaitingAccept, setCountWaitingAccpet] = useState(0);
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getCountContactFriendRequest())
        .then(res => {
            setCountFriendReq(res.payload)
            console.log(res.payload)
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
    }, [])

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
                        <TabPane tab="Search User" key="1" className="contact-modals-search">
                            <SearchUserTabPane/>
                        </TabPane>
                    
                    <TabPane tab={<Badge count="0" offset={[8,-5]} size="small" >Contacts</Badge>} key="2">
                        <ContactUserTabPane/>
                    </TabPane>
                    <TabPane tab={<Badge count={countWaitingAccept} offset={[8,-5]} size="small" >Waiting to accept</Badge>} key="3">
                        <WaitingAcceptTabPane/>
                    </TabPane>
                    <TabPane tab={<Badge count={countFriendReq} offset={[8,-5]} size="small" >Friend requests</Badge>} key="4">
                        <FriendRequestTabPane/>
                    </TabPane>
                </Tabs>
        </Modal>
         </>   
        )
}

export default ContactsModal
