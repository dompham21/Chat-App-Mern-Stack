const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    senderId: String,
    receiverId: String,
    ConversationType: String,
    messageType: String,
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    text: String,
    file: {data: Buffer, contentType: String, fileName: String},
    createAt: {type: Number,default: Date.now},
    updateAt: {type: Number,default: null},
    deleteAt: {type: Number,default: null}
});

const MESSAGE_CONVERSATION_TYPES = {
    PERSONAL: "personal",
    GROUP: "group"
}

const MESSAGE_TYPES = {
    TEXT: "text",
    IMAGE: "image",
    FILE: "file"
}

module.exports = {
    model: mongoose.model('message', MessageSchema),
    conversationTypes: MESSAGE_CONVERSATION_TYPES,
    messageTypes: MESSAGE_TYPES
}