import React, { useState } from 'react';
import {  Menu, Switch, Select} from 'antd';
import './FilterContact.css';
const { SubMenu } = Menu;
const { Option } = Select;

function FilterContact() {
    return (
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
    )
}

export default FilterContact
