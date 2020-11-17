import React, { useEffect, useState, useRef } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { BsFillMicFill,BsImage} from 'react-icons/bs'
import { FaSmile } from 'react-icons/fa'
import { MdSend } from 'react-icons/md'
import './InputSend.css'

import { Input, Form, Button} from 'antd'
import { useDispatch } from 'react-redux'
import socket from '../../../../socket'

let socketConnect;
function InputSend(props) {
    const [form] = Form.useForm();
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const inputElement = useRef(null);


    useEffect(() => {
        socketConnect = socket();
        return () => {
            socketConnect.emit('disconnect');
            socketConnect.off();
        }
    }, [])
    const {id, usename, avatar} = props
    const handleSubmitMessage = (values) => {
        if(values.message === ''){
            return;
        }
        let message = values.message;
        let senderId = user._id;
        let receiverId = id;

        socketConnect.emit("Input Chat Message",{
            message,
            senderId,
            receiverId
        })
        form.resetFields();
        if (inputElement.current) {
            inputElement.current.focus();
        }

    }
    return (
        <div className="message-input-send-layout">
            <ul className="message-input-send-option">
                <li><AiFillCamera/></li>
                <li><BsFillMicFill/></li>
                <li><BsImage/></li>
            </ul>
           <Form
            form={form}
            onFinish={(values)=>handleSubmitMessage(values)}
            className="message-form-submit"
           >
                <Form.Item
                    name="message"
                    className="message-input-send-form-item"
                >
                    <Input 
                        placeholder="Type a message..." 
                        suffix={<FaSmile className="message-input-send-icon"/>}  
                        className="message-input-send-input"
                        autoComplete="off"
                        ref={inputElement}
                    />
                </Form.Item>
                <Form.Item>
                    <Button  htmlType="submit" className="message-btn-submit">
                        <MdSend className="message-input-send-enterbtn" />
                    </Button>
                </Form.Item>
           </Form>
        </div>
    )
}

export default InputSend;
