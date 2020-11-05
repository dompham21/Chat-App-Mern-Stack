const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    senderId: String,
    receiverId: String,
    content: String,
    isRead: {type: Boolean, default: false},
    createAt: {type: Number,default: Date.now}
});

const NOTIFICATION_TYPES = {
    ADD_CONTACT: "add_contact"
}

module.exports = {
    model: mongoose.model('notification', NotificationSchema),
    types: NOTIFICATION_TYPES
};