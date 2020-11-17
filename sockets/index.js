const addNewContact = require("./contact/addNewContact");
const removeReqContactReceived = require("./contact/removeReqContactReceived");
const removeReqContactSent = require("./contact/removeReqContactSent");
const approveReqContactReceived = require("./contact/approveReqContactReceived");
const removeContact = require("./contact/removeContact");
const sendMessage = require("./message/sendMessage");

const initSockets = (io) => {
    addNewContact(io);
    removeReqContactReceived(io);
    removeReqContactSent(io);
    approveReqContactReceived(io);
    removeContact(io);
    sendMessage(io);
}

module.exports = initSockets;