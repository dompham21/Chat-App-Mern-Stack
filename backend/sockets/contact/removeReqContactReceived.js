const { checkExist, removeAndDelete } = require("../configSocket/configSocket");

let removeReqContactReceived = (io) => {
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

        socket.on("remove-req-contact-received", (data) => {
            let contactId = data.contactId
            // emit noticatied for all socket id of contact id
            console.log(data)
            if(clients[contactId]){
                clients[contactId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('response-remove-req-contact-received', {currentUser})
                })
            }
        })
        socket.on('disconnect',() => {
            //remove socket.id from clients when refresh
        clients =     removeAndDelete(clients,currentId,socket.id)
        })
    })
}

module.exports = removeReqContactReceived;