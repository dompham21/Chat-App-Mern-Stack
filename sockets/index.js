const addNewContact = require("./contact/addNewContact");
const removeReqContactReceived = require("./contact/removeReqContactReceived");
const removeReqContactSent = require("./contact/removeReqContactSent");
const approveReqContactReceived = require("./contact/approveReqContactReceived");
const removeContact = require("./contact/removeContact");
const sendMessage = require("./message/sendMessage");
const chatVideo = require("./message/chatVideo");
const userOnlineOffline = require("./status/userOnlineOffline");
const groupChat = require("./message/groupChat");

const initSockets = (io) => {
    addNewContact(io);
    removeReqContactReceived(io);
    removeReqContactSent(io);
    approveReqContactReceived(io);
    removeContact(io);
    sendMessage(io);
    chatVideo(io);
    userOnlineOffline(io);
    groupChat(io)
}

module.exports = initSockets;