const { checkExist, removeAndDelete } = require("../configSocket/configSocket");
const Message  = require("../../models/message.models");
const GroupChat = require("../../models/chatGroup.models")
let sendMessage = (io) => {
    let clients = {};
    io.on("connection", async (socket) => {
        let currentId = socket.handshake.query.currentId
        let groupIds;
        groupIds = await GroupChat.find({
            "members": {$elemMatch:{"id":currentId}}
        })
        //Check currentId existed in clients 
        clients = checkExist(clients,currentId,socket.id)
        groupIds.forEach(group=>{
            clients = checkExist(clients,group._id,socket.id)
        })
        socket.on("input-chat-message", async (data) => {
            try {
                console.log(data);
                if(data.groupId){
                    let newMessage = new Message.model({
                        senderId: currentId,
                        receiverId: data.groupId,
                        sender: currentId,
                        receiver: data.groupId,
                        ConversationType: "group",
                        messageType: "text",
                        text: data.message
                    })
                    let savedMessage = await newMessage.save();
                    let message = await Message.model.find({ "_id": savedMessage._id })
                        .populate("sender", {_id:1, username:1, address: 1, avatar: 1, phone: 1, "local.email":1, gender: 1})
                        console.log(message)
                    if(clients[data.groupId] ){
                        clients[data.groupId].forEach(socketId => {
                            io.sockets.connected[socketId].emit('output-chat-message-group', message)
                        })
                    }
                }else {
                    let receiverId = data.receiverId

                    let newMessage = new Message.model({
                        senderId: currentId,
                        receiverId: receiverId,
                        sender: currentId,
                        receiver: receiverId,
                        ConversationType: "personal",
                        messageType: "text",
                        text: data.message
                    })
                    let savedMessage = await newMessage.save();
                    let message = await Message.model.find({ "_id": savedMessage._id })
                       
                    if(clients[receiverId] ){
                        clients[receiverId].forEach(socketId => {
                            io.sockets.connected[socketId].emit('output-chat-message', message)
                        })
                    }
                    if(clients[currentId]){
                        clients[currentId].forEach(socketId => {
                            io.sockets.connected[socketId].emit('output-chat-message', message)
                        })
                    }
                }
            }  
            catch (error) {
                console.error(error);
            }  
        })
        socket.on('disconnect',() => {
            //remove socket.id from clients when refresh
            clients =  removeAndDelete(clients,currentId,socket.id)
            groupIds.forEach(group=>{
                clients =  removeAndDelete(clients,group._id,socket.id)
            })
        })
    })
}

module.exports = sendMessage;