const io = require('socket.io-client')
const user = JSON.parse(localStorage.getItem('user'))
export default function () {
  const socketConnect = io.connect('http://localhost:5000',{ query: {currentId:user._id,currentAvatar:user.avatar,currentUsername:user.username}})

return socketConnect
}