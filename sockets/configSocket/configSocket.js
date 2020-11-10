 function checkExist(clients,currentId,socketId){
    if(clients[currentId]) { 
        clients[currentId].push(socketId)
    }else {
        clients[currentId] = [socketId]
    }
}

 function removeAndDelete(clients,currentId,socketId){
    clients[currentId] = clients[currentId].filter(i =>  i !== socketId )
    //delete currentId from clients when client shutdown
    if(!clients[currentId].length){
        delete clients[currentId];
    }
}

module.exports = {
    checkExist,
    removeAndDelete
}