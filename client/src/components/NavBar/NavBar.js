import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Input, Avatar, Badge } from 'antd';
import {AiOutlineMessage, AiOutlineSearch} from 'react-icons/ai'


import './NavBar.css';
import ContactsModal from '../ContactsModal/ContactsModal';
import Notification from '../Notification/Notification';
import DropMenuInfoUser from './DropMenuInfoUser/DropMenuInfoUser';
import { useSelector } from 'react-redux';

const { Header } = Layout;
function NavBar() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [avatar, setAvatar] = useState(user.avatar)
    const updateAvatarSuccess = useSelector(state => state.user.updateAvatarSuccess)
    useEffect(() => {
        setAvatar(user.avatar)
        console.log('a');
    }, [updateAvatarSuccess,user.avatar])

    
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
                        <Avatar size="default" src={avatar} />
                        <span>{user.username}</span>
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