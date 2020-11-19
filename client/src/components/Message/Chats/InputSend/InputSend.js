import React, { useEffect, useState, useRef } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { BsFillMicFill,BsImage} from 'react-icons/bs'
import { FaSmile } from 'react-icons/fa'
import { MdSend } from 'react-icons/md'
import './InputSend.css'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import { Input, Form, Button} from 'antd'
import { useDispatch } from 'react-redux'
import socket from '../../../../socket'

let socketConnect;
function InputSend(props) {
    const [form] = Form.useForm();
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const inputElement = useRef(null);
    const [showPickerEmoji,setShowPickerEmoji] = useState(false);
    const [text,setText] = useState('');



    useEffect(() => {
        socketConnect = socket();
        return () => {
            socketConnect.emit('disconnect');
            socketConnect.off();
        }
    }, [])
    const {id, usename, avatar} = props
    const handleSubmitMessage = () => {
        if(text=== ''){
            return;
        }
        let message = text;
        let senderId = user._id;
        let receiverId = id;

        socketConnect.emit("Input Chat Message",{
            message,
            senderId,
            receiverId
        })
        console.log(message)
        if (inputElement.current) {
            inputElement.current.focus();
        }
        setText('');

    }

    const handleShowPicker = () => {
        setShowPickerEmoji(!showPickerEmoji);
    }

    const handleAddEmoji = (e) => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emo = String.fromCodePoint(...codesArray)
        setText(text+emo)
    }

    const handleChangeText = (e) => {
        setText(e.target.value)
    
    }
    const handleEnterSubmit = (event) => {
        if(event.key === 'Enter'){
            handleSubmitMessage();
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
                onFinish={handleSubmitMessage}
                className="message-form-submit"
                onKeyPress={(e)=>handleEnterSubmit(e)}
           >
                <Form.Item
                    name="message"
                    className="message-input-send-form-item"
                >
                    <Input 
                        placeholder="Type a message..." 
                        suffix={<FaSmile className="message-input-send-icon" onClick={handleShowPicker}/>}  
                        className="message-input-send-input"
                        autoComplete="off"
                        ref={inputElement}
                        onChange={(e)=>handleChangeText(e)}
                        value={text}
                    />
                    <Picker  
                        set='apple' 
                        style={{position:"absolute", bottom: "50px",right:"0px", display:showPickerEmoji?"block":"none"}}
                        theme="dark"
                        title="Chat app"
                        onSelect={(e)=>handleAddEmoji(e)}
                    />
                </Form.Item>
                <Form.Item
                    name="btn-send"
                >
                    <Button  htmlType="submit" className="message-btn-submit">
                        <MdSend className="message-input-send-enterbtn" />
                    </Button>
                </Form.Item>
           </Form>
        </div>
    )
}

export default InputSend;
