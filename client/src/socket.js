const io = require('socket.io-client')
export default function () {
    const user = JSON.parse(localStorage.getItem('user'))
    let socketConnect
    if(user){
        socketConnect = io.connect('http://localhost:5000',{ query: {currentId:user._id,currentAvatar:user.avatar,currentUsername:user.username}})
    }
    // https://chatnow21.herokuapp.com
return socketConnect
}