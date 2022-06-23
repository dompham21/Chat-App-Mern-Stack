 function checkExist(clients,currentId,socketId){
    if(clients[currentId]) { 
        clients[currentId].push(socketId)
    }else {
        clients[currentId] = [socketId]
    }
    return clients
}

 function removeAndDelete(clients,currentId,socketId){

    clients[currentId] = clients[currentId].filter(i =>  i !== socketId )
    //delete currentId from clients when client shutdown
    if(!clients[currentId].length){
        delete clients[currentId];
    }
    return clients
}

module.exports = {
    checkExist,
    removeAndDelete
}