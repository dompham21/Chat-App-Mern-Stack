import React, { useState } from 'react';
import { Tabs, Input, Menu, List, Avatar, Badge, Switch, Select} from 'antd';
import './ContactsModal.css';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserPlus } from 'react-icons/fa'


const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Option } = Select;

function ContactsModel() {
    const data = [
        {
          title: 'Anh Viet',
        },
        {
          title: 'Trung Quan',
        },
        {
          title: 'Dom Pham',
        },
        {
          title: 'Pham Van Anh',
        },
        {
            title: 'Anh Viet',
        }
      ];
      const children = [];
      for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
      }

    return (
            <Tabs defaultActiveKey="1" type="card" className="contact-modals-layout">
                <TabPane tab="Search User" key="1" className="contact-modals-search">
                    <div className="contact-search-filter">
                        <h3>Filters</h3>
                        <Menu
                            mode="inline"
                            theme="dark"
                            defaultSelectedKeys={['all']}
                            className="contact-search-filter-list"
                        >
                            <Menu.Item key="all" >
                                All
                            </Menu.Item>
                            <SubMenu key="people" title="People">
                                <Menu.Item key="1"> 
                                    <span>Friends of Friends</span><Switch className="contact-search-filter-switch"/>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Select showSearch style={{ width: '100%' }} placeholder="Choose a City..."  className="contact-search-filter-select">
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Select showSearch style={{ width: '100%' }} placeholder="Choose a School..." className="contact-search-filter-select" >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Select showSearch style={{ width: '100%' }} placeholder="Choose a Company..." className="contact-search-filter-select">
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </Menu.Item>
                            </SubMenu> 
                            <SubMenu key="post" title="Post">
                                <Menu.Item key="5"> 
                                    <span>Posts you've see</span><Switch className="contact-search-filter-switch"/>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Select style={{ width: '100%' }} placeholder="Date Posted" className="contact-search-filter-select">
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </Menu.Item>
                                <Menu.Item key="7">
                                    <Select style={{ width: '100%' }} placeholder="Posted From" className="contact-search-filter-select">
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <Select style={{ width: '100%' }} placeholder="Tagged Location" className="contact-search-filter-select">
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </Menu.Item>
                            </SubMenu>             
                        </Menu>
                    </div>
                    <div className="contact-search-user">
                        <Input placeholder="Search Contacts" prefix={<AiOutlineSearch /> } className="contact-search-user-input" />
                        <List
                           
                            itemLayout="horizontal"
                            className="contact-search-list"
                            dataSource={data}
                            renderItem={item => (
                            <List.Item
                                className="contact-search-list-item"
                                actions={[
                                    <Badge size="small">
                                        <div className="nav-menu-right-item search-add-user-icon"><FaUserPlus/></div>
                                    </Badge>
                                ]}
                            >
                                
                                <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="contact-search-list-item-avatar"/>}
                                title={<a href="https://ant.design" className="contact-search-list-item-name">{item.title}</a>}
                                description={<p className="contact-search-list-item-description">Lives in Hoai Nhon, Binh Dinh, Viet Nam</p>}
                                />

                            </List.Item>
                            )}
                        />
                    </div>
                    
                   
                </TabPane>
                <TabPane tab="Contacts" key="2">
                    Content of card tab 2
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

export default ContactsModel
