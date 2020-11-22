const { checkExist, removeAndDelete } = require("../configSocket/configSocket");

let removeReqContactSent = (io) => {
    let clients = {};
    io.on("connection",(socket) => {
        let currentId = socket.handshake.query.currentId
        let currentUser = {
            id: socket.handshake.query.currentId,
            username: socket.handshake.query.currentUsername,
            avatar: socket.handshake.query.currentAvatar
        }
        //Check currentId existed in clients 
        clients =  checkExist(clients,currentId,socket.id)

        socket.on("remove-req-contact-sent", (data) => {
            let contactId = data.contactId
            // emit noticatied for all socket id of contact id
            
            if(clients[contactId]){
                clients[contactId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('response-remove-req-contact-sent', {currentUser})
                })
            }
        })
        socket.on('disconnect',() => {
            //remove socket.id from clients when refresh
        clients =    removeAndDelete(clients,currentId,socket.id)
        })
    })
}

module.exports = removeReqContactSent;