import React from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { BsFillMicFill,BsImage} from 'react-icons/bs'
import { FaSmile } from 'react-icons/fa'
import { MdSend } from 'react-icons/md'
import './InputSend.css'

import { Input } from 'antd'
function InputSend() {
    return (
        <div className="message-input-send-layout">
            <ul className="message-input-send-option">
                <li><AiFillCamera/></li>
                <li><BsFillMicFill/></li>
                <li><BsImage/></li>
            </ul>
            <Input placeholder="Type a message..." suffix={<FaSmile className="message-input-send-icon"/>}  className="message-input-send-input"/>
            <MdSend className="message-input-send-enterbtn"/>
        </div>
    
    )
}

export default InputSend;
