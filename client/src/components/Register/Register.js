import React, { useState } from 'react'
import { Form,Row, Col, Input, Button, notification } from 'antd';
import {AiOutlineGooglePlus } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { registerUser } from '../../_actions/user_action';
import { regexPassword,upperCaseFirstName } from '../../util';
function Register(props) {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [form] = Form.useForm();
    const handleSubmitForm = async (values) => {
        setLoading(true);
        const dataToSubmit = {
            email: values.email,
            name: upperCaseFirstName(values.username),
            password: values.password,
            confirmPassword: values.confirmpassword
        }
        try {
            let response  = await dispatch(registerUser(dataToSubmit))
            if(response.payload.registerSuccess){
                notification['success']({
                    message: 'Create Account Success',
                    description:
                        'Please check your email has been risgistered, and active your account',
                    duration: 30000
                });
                setLoading(false)
                props.history.push("/login");
            }
            else{
                notification['warning']({
                    message: 'Create Account Failed',
                    description: response.payload.error
                });
                setLoading(false)
                form.resetFields();
            }
        } catch (error) {
            console.log(error)
        }  
    }

    return (
        <div className="login-container">
            <Row>
                <Col span={24}>
                    <div className="login-form-box">
                        <div className="login-form-detail">
                            <img className="login-form-logo" alt="logo" src="https://firebasestorage.googleapis.com/v0/b/chat-now-3987e.appspot.com/o/logo.de6401ef.svg?alt=media&token=bf87cd0c-e644-4539-9f72-bc0cb6a07e24"></img>
                            <h3 className="login-form-title">Sign into your account</h3>
                            <Form 
                                 onFinish={(values)=>handleSubmitForm(values)}
                                name="register"
                                form={form}
                                className="form-login"
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!', max: 22 }]}>
                                    <Input placeholder="User Name" className="form-login-item-input"/>
                                </Form.Item>
                                <Form.Item 
                                    
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input placeholder="Email Address" type="email" className="form-login-item-input"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        { 
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                            if (getFieldValue('currPassword') === value) {
                                                return Promise.reject('Current password and new password similar!');
                                            }
                                                return Promise.resolve();
                                            },
                                        }),
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                            if (!regexPassword(value)) {
                                                return Promise.reject('A password contains at least eight characters, including at least one number and includes both lower and uppercase letters ');
                                            }
                                                return Promise.resolve();
                                            },
                                        }),
                                        ]}
                                        hasFeedback
                                >
                                    <Input.Password placeholder="Password" className="form-login-item-input input-password"/>
                                </Form.Item>
                                <Form.Item
                                    name="confirmpassword"
                                    hasFeedback
                                    rules={[
                                    { 
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                        },
                                    })
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm Password" className="form-login-item-input input-password"/>
                                </Form.Item>
                                <Form.Item 
                                    name="submit"
                                >
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
                                    <a style={{background:'#db4437',color:'white'}}><AiOutlineGooglePlus/></a>
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