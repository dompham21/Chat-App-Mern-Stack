import React, { useState, useEffect } from 'react';
import { Form,Row, Col, Input, Button, Checkbox, notification } from 'antd';
import './Login.css';
import {AiOutlineGooglePlus } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from '../../_actions/user_action';
function Login(props) {
    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    };
    const initialEmail = localStorage.getItem("rememberMe") ? JSON.parse(localStorage.getItem("rememberMe")).email : '';
    const initialPassword = localStorage.getItem("rememberMe") ? JSON.parse(localStorage.getItem("rememberMe")).password : '';


    const handleSubmitForm = (values) => {
        let dataToSubmit = {
            email: values.email,
            password: values.password
        }
        console.log(dataToSubmit)
        dispatch(loginUser(dataToSubmit))
            .then(res=>{
                if(res.payload.loginSuccess){
                    if(rememberMe){
                        localStorage.setItem('rememberMe',JSON.stringify(dataToSubmit))
                    }
                    else {
                        localStorage.removeItem('rememberMe');
                    }
                    notification['success']({
                        message: 'Login Account Success',
                        description:
                          'Welcome to Job help! ',
                    });
                    props.history.push("/");
                }
                else {
                    notification['error']({
                        message: 'Login Account failed',
                        description:
                          'Invalid email or password!',
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
                            <img className="login-form-logo" alt="logo" ></img>
                            <h3 className="login-form-title">Sign into your account</h3>
                            <Form 
                                onKeyDown={(e)=> e.keyCode === 13 ? handleSubmitForm(e) : ''}
                                onFinish={(values)=>handleSubmitForm(values)}
                                name="basic"
                                initialValues = {{
                                    email: initialEmail,
                                    password: initialPassword,
                                }}
                            >
                                <Form.Item 
                                    
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input type="email" placeholder="Email Address"  />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!', min: 8 }]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                                <Form.Item name="remember" valuePropName="checked" >
                                    <Checkbox className="checkbox-remember" onChange={handleRememberMe} checked={rememberMe}>Remember me</Checkbox>
                                    <Link to="/#" className="forgot-password">Forgot Password</Link>
                                </Form.Item>

                                <Form.Item >
                                    <Button  type="primary" htmlType="submit" className="login-btn-submit">
                                        Login
                                    </Button>
                
                                </Form.Item>
                                
                            </Form>
                            <ul className="login-social-contact">
                                <li >
                                    <a href="/#" style={{background:'#4867aa',color:'white'}}><FaFacebookF/></a>
                                </li>
                                <li>
                                    <Link to="/#" style={{background:'#db4437',color:'white'}}><AiOutlineGooglePlus/></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="login-footer">
                            <span>Don't have an account?<Link to ='/register'> Register here</Link></span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        
    )
}

export default Login