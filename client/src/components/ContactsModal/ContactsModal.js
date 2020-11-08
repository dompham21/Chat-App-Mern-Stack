import React, { useState } from 'react';
import { Tabs, Input, Menu, List, Avatar, Badge, Switch, Select} from 'antd';
import './ContactsModal.css';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserPlus } from 'react-icons/fa'
import FilterContact from './SearchUserTabPane/FilterContact/FilterContact';
import SearchUserTabPane from './SearchUserTabPane/SearchUserTabPane';
import ContactUserTabPane from './ContactUserTabPane/ContactUserTabPane';


const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Option } = Select;

function ContactsModal() {
    

    return (
            <Tabs defaultActiveKey="1" type="card" className="contact-modals-layout">
                <TabPane tab="Search User" key="1" className="contact-modals-search">
                    <SearchUserTabPane/>
                </TabPane>
                <TabPane tab="Contacts" key="2">
                    <ContactUserTabPane/>
                </TabPane>
                <TabPane tab="Waiting to accept" key="3">
                    Content of card tab 3
                </TabPane>
                <TabPane tab="Friend requests" key="4">
                    Content of card tab 3
                </TabPane>
            </Tabs>
        )
}

export default ContactsModal
