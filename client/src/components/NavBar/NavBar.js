import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import RightMenu from './RightMenu';
import LeftMenu from './LeftMenu';
import './NavBar.css';

function NavBar() {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
      };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <nav className="menuBar">
            <Link to="/" className="logo" >
                <img></img>
            </Link>
            <div className="menuCon">
                <div className="leftMenu">
                    <LeftMenu />
                </div>
                <div className="rightMenu">
                    <RightMenu mode={'horizontal'}/>
                </div>
                <Button className="barsMenu" type="primary" onClick={showDrawer}>
                    <span className="barsBtn"></span>
                </Button>
                <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                >
                    <RightMenu mode={'inline'} />
                </Drawer>
            </div>
        </nav>

    )
}

export default NavBar