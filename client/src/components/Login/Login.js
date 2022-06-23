import React, { useState } from 'react';
import { Form,Row, Col, Input, Button, Checkbox, notification,Alert } from 'antd';
import './Login.css';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from '../../_actions/user_action';

function Login(props) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);
    const [loading,setLoading] = useState(false);
    const [errorNotActive,setErrorNotActive] = useState(false);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    };
    const initialEmail = localStorage.getItem("rememberMe") ? JSON.parse(localStorage.getItem("rememberMe")).email : '';
    const initialPassword = localStorage.getItem("rememberMe") ? JSON.parse(localStorage.getItem("rememberMe")).password : '';


    const handleSubmitForm = async (values) => {
        let dataToSubmit = {
            email: values.email,
            password: values.password
        }
        setLoading(true);
        try {
            let response =  await dispatch(loginUser(dataToSubmit))
            if(response.payload.loginSuccess){
                rememberMe? localStorage.setItem('rememberMe',JSON.stringify(dataToSubmit)) : localStorage.removeItem('rememberMe');

                localStorage.setItem('token',response.payload.token);
                localStorage.setItem('user',JSON.stringify(response.payload.user))
                setLoading(false);
                
                notification['success']({
                    message: 'Login Account Success',
                    description:
                        'Welcome to Chat now! ',
                });
                    props.history.push("/");
            }
            else {
                setLoading(false);
                response.payload.error === "The email has been registered but not activated" ?
                setErrorNotActive(true)
                :
                notification['error']({
                    message: 'Login Account failed',
                    description: response.payload.error
                });
                form.setFieldsValue({password:''})
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
                            <Alert
                                message="The email has been registered but not activated, please check your email has been registered and active your account "
                                type="error"
                                closable
                                style={{display:errorNotActive?"block":"none",marginBottom: "12px",fontSize:"16px"}}
                            />
                            <Form 
                                form={form}
                                onFinish={(values)=>handleSubmitForm(values)}
                                name="login-form"
                                initialValues = {{
                                    email: initialEmail,
                                    password: initialPassword,
                                }}
                            >
                                <Form.Item 
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input type="email" placeholder="Email Address" className="form-login-item-input" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!', min: 8 }]}
                                >
                                    <Input.Password placeholder="Password" className="form-login-item-input"/>
                                </Form.Item>
                                <Form.Item name="remember" valuePropName="checked" >
                                    <Checkbox className="checkbox-remember" onChange={handleRememberMe} checked={rememberMe}>Remember me</Checkbox>
                                    <Link to="/#" className="forgot-password">Forgot Password</Link>
                                </Form.Item>

                                <Form.Item 
                                    name="submit"
                                >
                                    <Button  type="primary" htmlType="submit" className="login-btn-submit" loading={loading}>
                                        Login
                                    </Button>
                                </Form.Item>
                                
                            </Form>
                
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