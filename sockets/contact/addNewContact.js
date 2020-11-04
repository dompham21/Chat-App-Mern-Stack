
let addNewContact = (io) => {
    let clients = {};
    io.on("connection",(socket) => {
        let currentId = socket.handshake.query.currentId
        //Check currentId existed in clients 
        if(clients[currentId]) { 
            clients[currentId].push(socket.id)
        }else {
            clients[currentId] = [socket.id]
        }

        socket.on("add-new-contact", (data) => {
            console.log('a');
            let contactId = data.contactId
            // emit noticatied for all socket id of contact id
            if(clients[contactId]){
                clients[contactId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('response-add-new-contact', currentId)
                })
            }
        })
        socket.on('disconnect',() => {
            //remove socket.id from clients when refresh
            clients[currentId] = clients[currentId].filter(socketId =>  socketId !== socket.id )
            //delete currentId from clients when client shutdown
            if(!clients[currentId].length){
                delete clients[currentId];
            }
        
        })
        console.log(clients);
    })
}

module.exports = addNewContact;