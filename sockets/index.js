const addNewContact = require("./contact/addNewContact");

const initSockets = (io) => {
    addNewContact(io);
}

module.exports = initSockets;