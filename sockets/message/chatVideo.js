const { checkExist, removeAndDelete } = require("../configSocket/configSocket");
const Message  = require("../../models/message.models");
let chatVideo = (io) => {
    let clients = {};
    io.on("connection",(socket) => {
        let currentId = socket.handshake.query.currentId
        //Check currentId existed in clients 
        checkExist(clients,currentId,socket.id)

        socket.on("caller-check-listener-online", (data) => {
            let response = {
                listenerId: data.listenerId,
                callerId: currentId,
                callerName: data.callerName
            }
           if(clients[data.listenerId]){
               //online
                clients[data.listenerId].forEach(socketId => {
                        io.sockets.connected[socketId].emit('server-req-peerId-listener', response)
                })
           }else{
                //offline
                socket.emit("server-send-listenner-is-offline",response)
           }
        })
        socket.on("listener-emit-peerId-server", (data) => {
            let response = {
                    listenerId: data.listenerId,
                    callerId: data.callerId,
                    callerName: data.callerName,
                    listenerName: data.listenerName,
                    listenerPeerId: data.listenerPeerId
             }
                if(clients[data.callerId]){
                    clients[data.callerId].forEach(socketId => {
                        io.sockets.connected[socketId].emit('server-req-peerId-caller', response)
                    })
                }

        })
        
        socket.on("caller-req-call-server",(data) => {
            let response = {
                listenerId: data.listenerId,
                callerId: data.callerId,
                callerName: data.callerName,
                listenerName: data.listenerName,
                listenerPeerId: data.listenerPeerId
            }
            if(clients[data.listenerId]){
                clients[data.listenerId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('server-send-req-call-listener', response)
                })
            }
        })

        socket.on("caller-cancel-req-call-server",(data) => {
            let response = {
                listenerId: data.listenerId,
                callerId: data.callerId,
                callerName: data.callerName,
                listenerName: data.listenerName,
                listenerPeerId: data.listenerPeerId
            }
            if(clients[data.listenerId]){
                clients[data.listenerId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('server-send-cancel-req-call-listener', response)
                })
            }
            if(clients[data.callerId]){
                clients[data.callerId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('server-send-cancel-req-call-caller', response)
                })
            }
        })
        socket.on("listener-reject-req-call-server",(data) => {
            let response = {
                listenerId: data.listenerId,
                callerId: data.callerId,
                callerName: data.callerName,
                listenerName: data.listenerName,
                listenerPeerId: data.listenerPeerId
            }
            if(clients[data.callerId]){
                clients[data.callerId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('server-send-reject-call-caller', response)
                })
            }
            if(clients[data.listenerId]){
                clients[data.listenerId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('server-send-reject-call-listener', response)
                })
            }
        })
        socket.on("listener-accept-req-call-server",(data) => {
            let response = {
                listenerId: data.listenerId,
                callerId: data.callerId,
                callerName: data.callerName,
                listenerName: data.listenerName,
                listenerPeerId: data.listenerPeerId
            }
            if(clients[data.callerId]){
                clients[data.callerId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('server-send-accept-call-caller', response)
                })
            }
            if(clients[data.listenerId]){
                clients[data.listenerId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('server-send-accept-call-listener', response)
                })
            }
        })


        socket.on('disconnect',() => {
            //remove socket.id from clients when refresh
            removeAndDelete(clients,currentId,socket.id)
        })
    })
}

module.exports = chatVideo;