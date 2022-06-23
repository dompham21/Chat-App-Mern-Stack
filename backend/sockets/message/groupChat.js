const { checkExist, removeAndDelete } = require("../configSocket/configSocket");
const GroupChat  = require('../../models/chatGroup.models')
let groupChat = (io) => {
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
        socket.on("new-group-created", (data) => {
        
            clients = checkExist(clients,data.group._id,socket.id)
       
            let response = {
                groupChat: data.group
            }
            console.log(data.group.members)
            data.group.members.map(member=>{
                if(clients[member.id]){
                    clients[member.id].forEach(socketId => {
                        io.sockets.connected[socketId].emit('response-new-group-created', {response})
                    })
                } 
            })
        })
        socket.on('disconnect',() => {
            //remove socket.id from clients when refresh
            clients = removeAndDelete(clients,currentId,socket.id)
            groupIds.forEach(group=>{
                clients =  removeAndDelete(clients,group._id,socket.id)
            })
        })
    })
}

module.exports = groupChat;