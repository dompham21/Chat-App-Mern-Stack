const io = require('socket.io-client')
export default function () {
    const user = JSON.parse(localStorage.getItem('user'))
    let socketConnect
    if(user){
        socketConnect = io.connect('https://chatnow21.herokuapp.com/',{ query: {currentId:user._id,currentAvatar:user.avatar,currentUsername:user.username}})
    }

return socketConnect
}