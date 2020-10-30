import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
function LeftMenu() {
    return (
        
        <Menu mode="horizontal">
            <Menu.Item key="home">
                <Link to="/">Home</Link>
            </Menu.Item>
                <Menu.Item key="chat">
                <Link to="/chat">Chat</Link>
                </Menu.Item>
        </Menu>
    )
}

export default LeftMenu