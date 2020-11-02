  
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { List, Avatar, Input } from 'antd';

const { Search } = Input;

function LandingPage() {
    const [result, setResult] = useState('');
    const [data,setData] = useState('');
    

   const onSearch = (values) => {
        Axios.get('getall',{params:{username:values}})
        .then(res=>{
            console.log(res.data.users)
            setData(res.data.users);
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
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                        )}
                    />
                </div>
            </>
    )
}

export default LandingPage