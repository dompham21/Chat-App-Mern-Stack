const { checkExist, removeAndDelete } = require("../configSocket/configSocket");
const Message  = require("../../models/message.models");
let sendMessage = (io) => {
    let clients = {};
    io.on("connection",(socket) => {
        let currentId = socket.handshake.query.currentId
        //Check currentId existed in clients 
        checkExist(clients,currentId,socket.id)

        socket.on("Input Chat Message", (data) => {
            try {
                let receiverId = data.receiverId

                let messages  = new Message.model({
                    senderId: currentId,
                    receiverId: receiverId,
                    sender: currentId,
                    receiver: receiverId,
                    ConversationType: "personal",
                    messageType: "text",
                    text: data.message
                })
                console.log(data)
                messages.save((err,doc) => {
                    if(err) return res.json({ success: false, err })

                    Message.model.find({ "_id": doc._id })
                    .populate("sender", {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
                    .populate("receiver", {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})         
                    .exec((err, doc)=> {
                        // emit noticatied for all socket id of contact id
                        if(clients[receiverId] ){
                            clients[receiverId].forEach(socketId => {
                                io.sockets.connected[socketId].emit('Output Chat Message', doc)
                            })
                        }
                        if(clients[currentId]){
                            clients[currentId].forEach(socketId => {
                                io.sockets.connected[socketId].emit('Output Chat Message', doc)
                            })
                        }
                        
                    })         
                })
            }  
            catch (error) {
                console.error(error);
            }  
        })
        socket.on('disconnect',() => {
            //remove socket.id from clients when refresh
            removeAndDelete(clients,currentId,socket.id)
        })
    })
}

module.exports = sendMessage;