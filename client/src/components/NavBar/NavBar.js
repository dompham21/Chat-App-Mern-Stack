import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Input, Avatar, Badge, Popover,Modal } from 'antd';
import {AiOutlineMessage, AiOutlineUserAdd, AiOutlineUser,AiOutlineCaretDown, AiOutlineSearch, AiOutlineArrowLeft} from 'react-icons/ai'
import {GiEarthAmerica} from 'react-icons/gi'
import {FiSettings, FiHelpCircle, FiLogOut} from 'react-icons/fi'


import './NavBar.css';
import ContactsModel from '../ContactsModal/ContactsModel';

const { Header } = Layout;
function NavBar() {
    const [visible, setVisible] = useState(false);


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
                <li>
                    <Badge size="small">
                            <div className="nav-menu-right-item"><FiLogOut/></div>
                    </Badge>
                    <span>Log Out</span>
                </li>
          </ul>
      );
      const contentMenuNotification = (
        <ul className="nav-menu-list-dropmenu">
            <li className="nav-menu-dropmenu-infomation nav-menu-dropmenu-notification">
                <Avatar size="large" icon={<AiOutlineUser /> }   />
                <div>
                    <p><span>John Dea</span> send you a friend request </p>
                    <p className="nav-menu-dropmenu-notification-time">about an hour ago</p>
                </div>
            </li>
            <li className="nav-menu-dropmenu-infomation nav-menu-dropmenu-notification">
                <Avatar size="large" icon={<AiOutlineUser /> }   />
                <div>
                    <p><span>John Dea</span> send you a friend request </p>
                    <p className="nav-menu-dropmenu-notification-time">about an hour ago</p>
                </div>
            </li>
            <li className="nav-menu-dropmenu-infomation nav-menu-dropmenu-notification">
                <Avatar size="large" icon={<AiOutlineUser /> } />
                <div>
                    <p><span>John Dea</span> send you a friend request </p>
                    <p className="nav-menu-dropmenu-notification-time">about an hour ago</p>
                </div>
            </li>
            <li className="nav-menu-dropmenu-infomation nav-menu-dropmenu-notification">
                <Avatar size="large" icon={<AiOutlineUser /> }   />
                <div>
                    <p><span>John Dea</span> send you a friend request </p>
                    <p className="nav-menu-dropmenu-notification-time">about an hour ago</p>
                </div>
            </li>
            <li className="nav-menu-dropmenu-infomation nav-menu-dropmenu-notification">
                <Avatar size="large" icon={<AiOutlineUser /> }  />
                <div>
                    <p><span>John Dea</span> send you a friend request </p>
                    <p className="nav-menu-dropmenu-notification-time">about an hour ago</p>
                </div>
            </li>
            <li className="nav-menu-dropmenu-infomation nav-menu-dropmenu-notification btn-see-all">
                <p>See all notifications</p>
            </li>
      </ul>
  );

    
    return (
        <Layout className="section-layout">
            <Header className="nav-layout">
                <div className="nav-menu-left">
                    <div className="nav-logo" />
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
                        <Badge count={9} size="small" onClick={() => setVisible(true)}>
                            <div className="nav-menu-right-item"><AiOutlineUserAdd/></div>
                        </Badge>
                    </li>
                    <li>
                        <Badge count={1} size="small">
                            <Popover 
                                    placement="bottomRight" 
                                    trigger="click" 
                                    content={contentMenuNotification}
                                    className="nav-menu-right-dropmenu"
                            >
                                <div className="nav-menu-right-item"><GiEarthAmerica/></div>
                            </Popover>
                        </Badge>
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
            <Modal
                title="Contacts"
                centered
                visible={visible}
                width={1100}
                footer={null}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            >
                <ContactsModel/>
            </Modal>
            
      </Layout>

        

    )
}

export default NavBar