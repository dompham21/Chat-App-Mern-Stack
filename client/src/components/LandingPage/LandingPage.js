  
import React, {  useState } from 'react'
import { List, Avatar, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { searchUser } from '../../_actions/user_action';

const { Search } = Input;

function LandingPage() {
    const [data,setData] = useState('');
    const dispatch = useDispatch()

   const onSearch = (values) => {
       dispatch(searchUser(values))
        .then(res=>{
            setData(res.payload)
        })
        .catch(err=>{
            console.log(err);
        })
   }

    return (
             <>
                <div className="app">
                    <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    />
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.username}</a>}
                            description={
                                <Button type="primary" >Add</Button>
                            }
                            />
                        </List.Item>
                        )}
                    />
                </div>
            </>
    )
}

export default LandingPage