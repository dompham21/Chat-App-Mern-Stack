const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatGroupSchema = new Schema({
    name: String,
    UserAmount: {type: Number, min: 3, max: 122},
    messageAmount: {type: Number, default: 0},
    userId: String,
    members: [],
    createAt: {type: Number,default: Date.now},
    updateAt: {type: Number,default: Date.now},
    deleteAt: {type: Number,default: null}
});

module.exports = mongoose.model('chat-group', ChatGroupSchema);