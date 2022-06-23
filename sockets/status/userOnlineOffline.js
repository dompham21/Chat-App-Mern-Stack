const { checkExist, removeAndDelete } = require("../configSocket/configSocket");

let userOnlineOffline = (io) => {
    let clients = {};
    io.on("connection",(socket) => {
        let currentId = socket.handshake.query.currentId
        let currentUser = {
            id: socket.handshake.query.currentId,
            username: socket.handshake.query.currentUsername,
            avatar: socket.handshake.query.currentAvatar
        }
        //Check currentId existed in clients 
        clients = checkExist(clients,currentId,socket.id)
        let listUserOnline = Object.keys(clients)

       socket.emit('server-send-list-users-online',listUserOnline)
       socket.broadcast.emit('server-send-when-new-user-online',currentId)
        socket.on('disconnect',() => {
            //remove socket.id from clients when refresh
            clients =     removeAndDelete(clients,currentId,socket.id)
            socket.broadcast.emit('server-send-when-new-user-offline',currentId)

        })
    })
}

module.exports = userOnlineOffline;