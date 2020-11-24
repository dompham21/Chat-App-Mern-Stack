import React, { useState } from 'react'
import { Upload, Button,Avatar, Form, Input, Tooltip,Radio, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useDispatch } from 'react-redux';
import './PasswordManager.css'
import { regexPassword } from '../../../../util';
import { updatePassword } from '../../../../_actions/user_action';
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


function PasswordManager() {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const handleSubmitForm = async (values) => {
        let dataToSubmit = {
            currPassword: values.currPassword,
            newPassword: values.newPassword
        }
        await dispatch(updatePassword(dataToSubmit))

    }
    return (
            <div className="password-manager-form">
                <h2 style={{color: "white"}}>Change your password</h2>
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
                        <Input.Password  className="form-change-password-item-input"/>
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
                        <Input.Password  className="form-change-password-item-input"/>
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
                        <Input.Password  className="form-change-password-item-input"/>
                    </Form.Item>
                    <Form.Item style={{display:"flex",justifyContent:"center"}}>
                        <div style={{display:"flex", justifyContent:"center", marginTop:"24px"}}>
                                <Button className="btn-create" htmlType="submit">Create</Button>
                                <Button className="btn-cancel">Cancel</Button>
                        </div>
                    </Form.Item>    
                </Form>
            </div>
    )
}

export default PasswordManager
