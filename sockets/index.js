const addNewContact = require("./contact/addNewContact");
const removeReqContactReceived = require("./contact/removeReqContactReceived");
const removeReqContactSent = require("./contact/removeReqContactSent");

const initSockets = (io) => {
    addNewContact(io);
    removeReqContactReceived(io);
    removeReqContactSent(io)
}

module.exports = initSockets;