import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Input, Avatar, Badge } from 'antd';
import {AiOutlineMessage, AiOutlineUser, AiOutlineSearch} from 'react-icons/ai'


import './NavBar.css';
import ContactsModal from '../ContactsModal/ContactsModal';
import Notification from '../Notification/Notification';
import DropMenuInfoUser from './DropMenuInfoUser/DropMenuInfoUser';

const { Header } = Layout;
function NavBar() {
  

    

    
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
                        <Link to="/" style={{color:"white"}}>
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
                           <DropMenuInfoUser/> 
                    </li>
                </ul>
                
            </Header>
           
            
      </Layout>

        

    )
}

export default NavBar