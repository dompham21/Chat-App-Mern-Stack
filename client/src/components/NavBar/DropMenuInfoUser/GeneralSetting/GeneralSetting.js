import React, { useState } from 'react'
import { Upload, Button,Avatar, Form, Input, Tooltip,Radio, message } from 'antd';
import {AiOutlineUpload} from 'react-icons/ai'
import ImgCrop from 'antd-img-crop';
import './GeneralSetting.css';
import { updateAvatar, uploadCloundinary, updateUserInfo } from '../../../../_actions/user_action';
import { useDispatch } from 'react-redux';
import { isVietnamesePhoneNumber, upperCaseFirstName } from '../../../../util';


const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
function GeneralSetting() {
    const [imageUrl,setImageUrl] = useState(null);
    const [loading,setLoading] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch()
    
    const user = JSON.parse(localStorage.getItem('user'))

    const onChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
          }
          if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                setImageUrl(imageUrl),
                setLoading(false)
            )
          }
      };
    const handleSubmit =  async (values) => {
        try {
        if(imageUrl){
            const formData = new FormData();
            formData.append("file",imageUrl);
            formData.append("upload_preset","social");
            formData.append("cloud_name","dmriwkfll");
                let response = await dispatch(uploadCloundinary(formData))
                let uploadSuccess = await dispatch(updateAvatar(response.payload.url))
                if(values.name === user.username && values.address === user.address &&values.phone === user.phone && values.gender === user.gender){
                    let userInfo = {
                        address: user.address,
                        avatar: response.payload.url,
                        email: user.email,
                        gender: user.gender,
                        phone: user.phone,
                        role: user.role,
                        username: user.username,
                        _id: user._id,
                    }
                    console.log('a')
                    localStorage.setItem("user",JSON.stringify(userInfo))
                }else{
                    if(uploadSuccess){
                        let dataToSubmit = {
                            address: values.address,
                            gender: values.gender,
                            phone: values.phone,
                            username: upperCaseFirstName(values.name),
                        }
                        let updateInfo =  await dispatch(updateUserInfo(dataToSubmit))
                        console.log(values)
                        if(updateInfo){
                            let userInfo = {
                                address: values.address,
                                avatar: response.payload.url,
                                email: user.email,
                                gender: values.gender,
                                phone: values.phone,
                                role: user.role,
                                username: upperCaseFirstName(values.name),
                                _id: user._id,
                            }
                            localStorage.setItem("user",JSON.stringify(userInfo))
                        }
                    }
                }
        }else{
            if(values.name === ''){
                console.log("return")
                return;
            }
            if(!isVietnamesePhoneNumber(values.phone)){
                console.log("This is not a phone number Vietnamese!")
                return;
            }
            if(values.address === ''){
                return
            }
            let dataToSubmit = {
                address: values.address,
                gender: values.gender,
                phone: values.phone,
                username: upperCaseFirstName(values.name),
            }
            let updateInfo =  await dispatch(updateUserInfo(dataToSubmit))
            if(updateInfo){
                let userInfo = {
                    address: values.address,
                    avatar: user.avatar,
                    email: user.email,
                    gender: values.gender,
                    phone: values.phone,
                    role: user.role,
                    username: upperCaseFirstName(values.name),
                    _id: user._id,
                }
                localStorage.setItem("user",JSON.stringify(userInfo))
            }
        }
        } catch (error) {
                console.log(error)
        }
    }
    const handleCancelUpdate = () => {
        form.resetFields();
        setImageUrl(null);
    }
    return (
        <div className="general-setting-container">
            <div className="general-setting-upload-avatar">
                <Avatar className="general-setting-upload-curr-avatar" src={imageUrl?imageUrl:user.avatar}/>    
                <ImgCrop rotate>
                    <Upload
                     action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                     onChange={onChange}
                     beforeUpload={beforeUpload}
                     showUploadList={false}
                     >
                        <Button icon={<AiOutlineUpload/>}>Upload</Button>
                    </Upload>
                </ImgCrop>
                
            </div>
            <div className="general-setting-form">
                <h2 style={{color: "white"}}>Update infomation</h2>
                <Form
                     {...formItemLayout}
                    name="update-infomation"
                    form={form}
                    initialValues={{
                        name: user.username,
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                        gender: user.gender
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label={
                        <span>
                            Username&nbsp;
                            <Tooltip title="What do you want others to call you?">
                            </Tooltip>
                        </span>
                        }
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                    >
                        <Radio.Group >
                            <Radio value={'male'}>Male</Radio>
                            <Radio value={'female'}>Female</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item style={{display:"flex",justifyContent:"center"}}>
                        <div style={{display:"flex", justifyContent:"center", marginTop:"24px"}}>
                                <Button className="btn-create" htmlType="submit">Create</Button>
                                <Button className="btn-cancel" onClick={handleCancelUpdate}>Cancel</Button>
                        </div>
                    </Form.Item>    
                </Form>
            </div>
        </div>
    )
}

export default GeneralSetting
