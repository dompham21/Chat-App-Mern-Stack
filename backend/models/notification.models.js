const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    senderId: String,
    receiverId: String,
    types: String,
    isRead: {type: Boolean, default: false},
    createAt: {type: Number,default: Date.now}
});

const NOTIFICATION_TYPES = {
    ADD_CONTACT: "add_contact",
    APPROVE_CONTACT: "approve_contact"
}

module.exports = {
    model: mongoose.model('notification', NotificationSchema),
    types: NOTIFICATION_TYPES
};