import React from 'react'
import { Menu, Icon, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';




function RightMenu(props) {
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const history = useHistory();


    const handleLogout = () => {
        cookies.remove('x_auth', { path: '/' });
        dispatch(logoutUser());
        history.push('/login');    }
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="logout" className="nav-btn-logout">
                <Button onClick={handleLogout}>Logout</Button>
            </Menu.Item>
        </Menu>
    )
}

export default RightMenu