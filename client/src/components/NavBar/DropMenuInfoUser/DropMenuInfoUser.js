import React, { useState } from 'react';
import { Avatar, Badge, Popover, Tabs, Modal} from 'antd';
import { AiOutlineUser,AiOutlineCaretDown} from 'react-icons/ai'
import {FiSettings, FiHelpCircle, FiLogOut} from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logoutUser } from '../../../_actions/user_action';

const { TabPane } = Tabs;

function DropMenuInfoUser() {
    const [visible,setVisible] = useState(false)
    const [visiblePop,setVisiblePop] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/login');    
    }
    const handleClickChangePopVisible = () => {
        setVisiblePop(!visiblePop)
    }

    const handleOpenModal = () => {
        setVisiblePop(false)
        setVisible(true);
    }
    const contentMenuDown = (
        <ul className="nav-menu-list-dropmenu">
            <li className="nav-menu-dropmenu-infomation" onClick={handleOpenModal}>
                <Avatar size="large" icon={<AiOutlineUser /> } className="nav-menu-dropmenu-avatar-large"  />
                <div>
                    <span>John Dea</span>
                    <p>See your profile</p>
                </div>
            </li>
            <li>
                <Badge size="small">
                        <div className="nav-menu-right-item"><FiSettings/></div>
                </Badge>
                <span>Setting & Privaciy</span>
            </li>
            <li>
                <Badge size="small">
                        <div className="nav-menu-right-item"><FiHelpCircle/></div>
                </Badge>
                <span>Help & Support</span>
            </li>
            <li onClick={handleLogout}>
                <Badge size="small">
                        <div className="nav-menu-right-item"><FiLogOut/></div>
                </Badge>
                <span>Log Out</span>
            </li>
      </ul>
  );
  
    return (
        <Badge  size="small">
            <Popover 
                placement="bottomRight" 
                trigger="click" 
                content={contentMenuDown}
                className="nav-menu-right-dropmenu"
                visible={visiblePop}
                onVisibleChange={handleClickChangePopVisible}
            >
                <div className="nav-menu-right-item">
                    <AiOutlineCaretDown/>
                </div>  
            </Popover>
            <Modal
                title="Contacts"
                visible={visible}
                width={1100}
                footer={null}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            >
                <Tabs defaultActiveKey="1" type="card" className="contact-modals-layout">
                    <TabPane tab="General setting" key="1" className="contact-modals">
                        
                    </TabPane>
                    <TabPane tab="Manage password" key="2" className="contact-modals">
                    </TabPane>
                </Tabs>
            </Modal>
        </Badge>
    )
}

export default DropMenuInfoUser
