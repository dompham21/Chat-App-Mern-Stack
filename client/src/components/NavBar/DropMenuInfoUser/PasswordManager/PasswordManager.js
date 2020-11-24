import React, { useState } from 'react'
import { Button, Form, Input, notification, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import './PasswordManager.css'
import { regexPassword } from '../../../../util';
import { updatePassword, logoutUser } from '../../../../_actions/user_action';
import { useHistory } from 'react-router-dom';
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };


function PasswordManager(props) {
    const [loading,setLoading] = useState(false)
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const history = useHistory();

    const handleSubmitForm = async (values) => {
        let dataToSubmit = {
            currPassword: values.currPassword,
            newPassword: values.newPassword
        }
        
        setLoading(true)
        let response = await dispatch(updatePassword(dataToSubmit))
        if(response.payload.updatePasswordSuccess){
            setLoading(false)
            notification['success']({
                message: 'Update password success',
                description: "Please login again!"
            });
            let secondsToGo = 5;
            const modal = Modal.success({
              title: 'Update password success',
              content: `Will automatically return to the login page after ${secondsToGo} second.`,
              wrapClassName:"avcdsadasdasdasdasdasdasdasdada"
            });
            const timer = setInterval(() => {
              secondsToGo -= 1;
              modal.update({
                content: `Will automatically return to the login page after ${secondsToGo} second.`,
              });
            }, 1000);
            setTimeout(() => {
              clearInterval(timer);
              modal.destroy();
              dispatch(logoutUser());
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              history.push('/login');
            }, secondsToGo * 1000);
        }else{
            setLoading(false)
            notification['error']({
                message: 'Update password fail',
                description: response.payload.error
            });
        }
    }
    return (
            <div className="password-manager-form">
                <h2 style={{color: "white",marginTop:"24px"}}>Change your password</h2>
                <Form
                     {...formItemLayout}
                    name="update-infomation"
                    form={form}
                    className="form-change-password"
                    onFinish={handleSubmitForm}
                >
                    <Form.Item
                        name="currPassword"
                        label="Current Password"
                        rules={[
                        {  
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                        className="form-change-password-item"
                    >
                        <Input.Password className="update-info-form-input-item input-password"/>
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="New Password"
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
                        <Input.Password className="update-info-form-input-item input-password"/>
                    </Form.Item>

                    <Form.Item
                        name="confirmNewPassword"
                        label="Confirm New Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        { 
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                        })
                        ]}
                    >
                        <Input.Password className="update-info-form-input-item input-password"/>
                    </Form.Item>
                    <Form.Item style={{display:"flex",justifyContent:"center"}}>
                        <div style={{display:"flex", justifyContent:"center", marginTop:"24px"}}>
                                <Button className="btn-create" htmlType="submit" loading={loading}>Update</Button>
                                <Button className="btn-cancel">Cancel</Button>
                        </div>
                    </Form.Item>    
                </Form>
            </div>
    )
}

export default PasswordManager
