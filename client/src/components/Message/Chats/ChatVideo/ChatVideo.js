import React, { useState, useEffect, useRef } from 'react'
import socket from '../../../../socket'
import Peer from 'peerjs';
import {Tooltip,Modal,Avatar} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import  './ChatVideo.css';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa'
import {BsFillMicFill,BsFillCameraVideoFill,BsInfoCircleFill} from 'react-icons/bs'
import {ImPhoneHangUp} from 'react-icons/im'
import { getDataToEmitCallVideo } from '../../../../_actions/message_action';


let socketConnect;
function ChatVideo(props) {
    const {id,username,avatar} = props
    const user = JSON.parse(localStorage.getItem('user'))
    const [visible, setVisible] = useState(false);
    const [listenerVisible,setListenerVisible] = useState(false)
    const [iceTurnServer,setIceTurnServer] = useState('')
    const [hiddenInfoVideo,setHiddenInfoVideo] = useState(false)
    const [hiddenInfoVideoListener,setHiddenInfoVideoListener] = useState(false)

    const dispatch = useDispatch()
    const dataToEmitCallVideo = useSelector(state => state.message.dataToEmitCallVideo)
    const videoRefListener =  useRef(null)
    const videoRefCaller = useRef(null)
    const videoRefReceiver = useRef(null)
    const videoRefSend = useRef(null)
    useEffect(() => {
        socketConnect = socket();
        
        let getPeerId = ''

        //Need turn server here
        const peer = new Peer({});

        peer.on('open',(peerId)=>{
            getPeerId = peerId
            console.log(peerId)
        })

        socketConnect.on("server-send-listenner-is-offline",()=>{
            //listener is offline
        })
        socketConnect.on("server-req-peerId-listener",(response)=>{
            let dataToSubmit = {
                callerId: response.callerId,
                listenerId: response.listenerId,
                callerName: response.callerName,
                listenerPeerId: getPeerId,
                listenerName: user.username
            }
            dispatch(getDataToEmitCallVideo(dataToSubmit))
            socketConnect.emit("listener-emit-peerId-server",dataToSubmit)
        })
        socketConnect.on("server-req-peerId-caller",(response)=>{
            let dataToSubmit = {
                callerId: response.callerId,
                listenerId: response.listenerId,
                callerName: response.callerName,
                listenerPeerId: response.listenerPeerId,
                listenerName: response.listenerName
            }
            dispatch(getDataToEmitCallVideo(dataToSubmit))
            socketConnect.emit("caller-req-call-server",dataToSubmit)
        })
        socketConnect.on("server-send-req-call-listener",(response)=>{
            let dataToSubmit = {
                callerId: response.callerId,
                listenerId: response.listenerId,
                callerName: response.callerName,
                listenerPeerId: response.listenerPeerId,
                listenerName: response.listenerName
            }
            setListenerVisible(true);
        })
        socketConnect.on("server-send-cancel-req-call-listener",(response)=>{
            const streamListener = videoRefListener.current.srcObject;
            console.log(streamListener)
            const tracksListener = streamListener.getTracks();

            tracksListener.forEach(function(track) {
              track.stop();
            });
            videoRefListener.current.srcObject = null;
            peer.disconnect();
            peer.destroy();
            setListenerVisible(false);

        })
        socketConnect.on("server-send-cancel-req-call-caller",(response)=>{
            const streamCaller = videoRefCaller.current.srcObject;
            const tracksCaller = streamCaller.getTracks();

            tracksCaller.forEach(function(track) {
              track.stop();
            });

            videoRefCaller.current.srcObject = null;
            
            peer.disconnect();
            peer.destroy();
            setVisible(false);

        })
        socketConnect.on("server-send-reject-call-caller",response => {
          
            const streamCaller = videoRefCaller.current.srcObject;
            const tracksCaller = streamCaller.getTracks();

            tracksCaller.forEach(function(track) {
              track.stop();
            });

            videoRefCaller.current.srcObject = null;
            
            peer.disconnect();
            peer.destroy();
            setVisible(false);
        })
        socketConnect.on("server-send-reject-call-listener",response => {
          
            const streamListener = videoRefListener.current.srcObject;
            console.log(streamListener)
            const tracksListener = streamListener.getTracks();

            tracksListener.forEach(function(track) {
              track.stop();
            });
            videoRefListener.current.srcObject = null;
            peer.disconnect();
            peer.destroy();
            setListenerVisible(false);

        })
        socketConnect.on("server-send-accept-call-caller",response => {
            let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({video: true, audio: false},  function(stream) {
                console.log(stream)
                console.log(videoRefCaller.current)
                if(videoRefCaller.current){
                    setHiddenInfoVideo(true);
                    videoRefCaller.current.srcObject = stream;
                }
                var call =  peer.call(response.listenerPeerId, stream);
                call.on('stream', function(remoteStream) {
                    console.log(remoteStream)
                    if(videoRefReceiver.current){
                        videoRefReceiver.current.srcObject = remoteStream;
                    }
                });

               
            })
        })
        socketConnect.on("server-send-accept-call-listener",response => {
            let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            peer.on("call", function(call) {
                console.log(call)
              getUserMedia({video: true, audio: false}, function(stream) {
                    console.log(stream)
                  if(videoRefListener.current){
                    setHiddenInfoVideo(true)
                    setHiddenInfoVideoListener(true)
                    videoRefListener.current.srcObject = stream;
                  }
                call.answer(stream); // Answer the call with an A/V stream.
                call.on('stream', function(remoteStream) {
                    console.log(remoteStream)
                    if(videoRefSend.current){
                        videoRefSend.current.srcObject = remoteStream
                    }
                  // Show stream in some video/canvas element.
                });
              }, function(err) {
                console.log('Failed to get local stream' ,err);
              });
            });
        })
        return () => {
            socketConnect.emit('disconnect');
            socketConnect.off();
        }
      }, [])

    const handleChatVideo = () => {
        setVisible(true)
        let dataToEmit = {
            listenerId: id,
            callerName: user.username
        }
        socketConnect.emit("caller-check-listener-online",dataToEmit);
    }

    const handleCancelCall = () => {
        socketConnect.emit("caller-cancel-req-call-server",dataToEmitCallVideo)
    }

    const handleCancelCallListener = () => {
        socketConnect.emit("listener-reject-req-call-server",dataToEmitCallVideo)
    }
    const handleAcceptCallListener = () => {
        console.log(dataToEmitCallVideo)
        socketConnect.emit("listener-accept-req-call-server",dataToEmitCallVideo)
    }

    return (
        <ul className="message-layout-chats-title-icon">
            <li> <FaPhoneAlt/></li>
            <li><FaVideo onClick={handleChatVideo}/></li>
            <li><BsInfoCircleFill/></li>
            <Modal
                className="message-call-video-modal"
                title="Video call"
                visible={visible}
                width={1100}
                footer={null}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                maskClosable={false}
            >   
            <div style={{display:hiddenInfoVideo?"none":"block"}}>
                <Avatar 
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
                        className="message-call-video-avatar"
                    />
                    <h2 className="message-call-video-username">{username}</h2>
                    <span>Calling...</span>
            </div>
            <div className="message-video">
                <video autoPlay ref={videoRefReceiver} className="message-video-receiver"></video>
                <video autoPlay ref={videoRefCaller} className="message-video-send"></video>
            </div>

                <ul className="message-call-video-option">
                    <li className="message-call-video-item"><BsFillMicFill/></li>
                    <Tooltip  placement="top" title="Turn off video">
                        <li className="message-call-video-item"><BsFillCameraVideoFill/></li>
                    </Tooltip>
                    <Tooltip placement="top" title="Mute Microphone">
                        <li className="message-call-video-item"><BsFillMicFill/></li>
                    </Tooltip>
                    <Tooltip placement="top" title="End call">
                        <li className="message-call-video-item cancel-call" onClick={handleCancelCall}><ImPhoneHangUp/></li>
                    </Tooltip>
                </ul>
            </Modal>
            <Modal
                className="message-call-video-modal"
                title="Video call"
                visible={listenerVisible}
                width={1100}
                footer={null}
                onOk={() => setListenerVisible(false)}
                onCancel={() => setListenerVisible(false)}
                maskClosable={false}
            >
                <div style={{display:hiddenInfoVideo?"none":"block"}}>
                    <Avatar 
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
                        className="message-call-video-avatar"
                    />
                    <h2 className="message-call-video-username">{username}</h2>
                    <span>Calling...</span>
                </div>
                <div className="message-video">
                    <video autoPlay ref={videoRefSend} className="message-video-receiver"></video>
                    <video autoPlay ref={videoRefListener} className="message-video-send"></video> 
                </div>
                <ul className="message-call-video-option">
                    <div style={{display:hiddenInfoVideoListener?"flex":"none"}}>
                        <li className="message-call-video-item"><BsFillMicFill/></li>
                        <Tooltip  placement="top" title="Turn off video">
                            <li className="message-call-video-item"><BsFillCameraVideoFill/></li>
                        </Tooltip>
                        <Tooltip placement="top" title="Mute Microphone">
                            <li className="message-call-video-item"><BsFillMicFill/></li>
                        </Tooltip>
                        <Tooltip placement="top" title="End call">
                            <li className="message-call-video-item cancel-call" onClick={handleCancelCallListener}><ImPhoneHangUp/></li>
                        </Tooltip>
                    </div>
                    <div style={{display:hiddenInfoVideoListener?"none":"flex"}}>
                        <Tooltip placement="top" title="Start call">
                            <li className="message-call-video-item start-call" onClick={handleAcceptCallListener}><FaPhoneAlt/></li>
                        </Tooltip>
                        <Tooltip placement="top" title="End call">
                            <li className="message-call-video-item cancel-call" onClick={handleCancelCallListener}><ImPhoneHangUp/></li>
                        </Tooltip>
                    </div>
                </ul>
            </Modal>
        </ul>
    )
}

export default ChatVideo
