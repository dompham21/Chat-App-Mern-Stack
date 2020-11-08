import React, { useState } from 'react'
import { Form,Row, Col, Input, Button, notification } from 'antd';
import {AiOutlineTwitter,AiOutlineGooglePlus } from 'react-icons/ai';
import { FaFacebookF,FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import './Register.css';
import { registerUser } from '../../_actions/user_action';
function Register(props) {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const handleSubmitForm = (values) => {
        if(values.password !== values.confirmpassword){
            return;
        }
        setLoading(true);
        const dataToSubmit = {
            email: values.email,
            name: values.username,
            password: values.password,
            confirmPassword: values.confirmpassword
        }
        dispatch(registerUser(dataToSubmit))
            .then(res=>{
                if(res.payload.registerSuccess){
                    //Announcement success
                    notification['success']({
                        message: 'Create Account Success',
                        description:
                          'This is the content of the notification. Please use that account to login',
                    });
                    props.history.push("/login");
                }
                else{
                    //Announcement fail
                    notification['warning']({
                        message: 'Create Account Failed',
                        description:
                          'User already exists with that email!',
                    });
                }
            })
            .catch(err=>{
                console.log(err)
            })


    }

    return (
        <div className="login-container">
            <Row>
                <Col span={24}>
                    <div className="login-form-box">
                        <div className="login-form-detail">
                            <img className="login-form-logo"></img>
                            <h3 className="login-form-title">Sign into your account</h3>
                            <Form 
                                 onKeyDown={(e)=> e.keyCode == 13 ? handleSubmitForm(e) : ''}
                                 onFinish={(values)=>handleSubmitForm(values)}
                                name="basic"
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!', max: 22 }]}>
                                    <Input placeholder="User Name"/>
                                </Form.Item>
                                <Form.Item 
                                    
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input placeholder="Email Address" type="email"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!', min: 8 }]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    name="confirmpassword"
                                    rules={[{ required: true, message: 'Please input your confirm password!', min: 8  }]}
                                >
                                    <Input.Password placeholder="Confirm Password" />
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" className="login-btn-submit" loading={loading}>
                                    Signup
                                    </Button>
                
                                </Form.Item>
                                
                            </Form>
                            <ul className="login-social-contact">
                                <li >
                                    <a style={{background:'#4867aa',color:'white'}}><FaFacebookF/></a>
                                </li>
                                <li>
                                    <a style={{background:'#33CCFF',color:'white'}}><AiOutlineTwitter/></a>
                                </li>
                                <li>
                                    <a style={{background:'#db4437',color:'white'}}><AiOutlineGooglePlus/></a>
                                </li>
                                <li>
                                    <a style={{background:'#0177b5',color:'white'}}><FaLinkedinIn/></a>
                                </li>
                            </ul>
                        </div>
                        <div className="login-footer">
                            <span>Already a member?<Link to ='/login'> Login here</Link></span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Register