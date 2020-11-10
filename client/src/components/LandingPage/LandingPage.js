  
import React, {  useState } from 'react'
import { Input, } from 'antd';
import { useDispatch } from 'react-redux';
import { searchUser } from '../../_actions/user_action';
import { addContact, removeContactReq } from '../../_actions/contact_action';
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
                    
                </div>
            </>
    )
}

export default LandingPage