import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Input, Avatar, Badge, Popover } from 'antd';
import {AiOutlineMessage, AiOutlineUser,AiOutlineCaretDown, AiOutlineSearch} from 'react-icons/ai'
import {FiSettings, FiHelpCircle, FiLogOut} from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';
import { useHistory } from "react-router-dom";

import './NavBar.css';
import ContactsModal from '../ContactsModal/ContactsModal';
import Notification from '../Notification/Notification';

const { Header } = Layout;
function NavBar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/login');    
    }

    const contentMenuDown = (
            <ul className="nav-menu-list-dropmenu">
                <li className="nav-menu-dropmenu-infomation">
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
        <Layout className="section-layout">
            <Header className="nav-layout">
                <div className="nav-menu-left">
                    <Link to="/">
                        <div className="nav-logo" />
                    </Link>
                    <Input className="nav-search"
                        prefix={<AiOutlineSearch /> }
                        placeholder="Search Chat App"
                    />
                </div> 
                <ul className="nav-menu-right">
                    <li className="nav-menu-right-item-avatar"> 
                        <Avatar size="default" icon={<AiOutlineUser />} />
                        <span>John Dea</span>
                    </li>
                    <li>
                        <Link to="/message" style={{color:"white"}}>
                            <Badge size="small" >
                                <div className="nav-menu-right-item"><AiOutlineMessage/></div>
                            </Badge>
                        </Link>
                    </li>
                    <li>
                            <ContactsModal/>
                    </li>
                    <li>
                            <Notification/>
                    </li>
                    <li> 
                            <Badge  size="small">
                                <Popover 
                                        placement="bottomRight" 
                                        trigger="click" 
                                        content={contentMenuDown}
                                        className="nav-menu-right-dropmenu"
                                >
                                    <div className="nav-menu-right-item">
                                        
                                            <AiOutlineCaretDown/>
                                    </div>  
                                </Popover>
                            </Badge>
                    </li>
                </ul>
                
            </Header>
           
            
      </Layout>

        

    )
}

export default NavBar