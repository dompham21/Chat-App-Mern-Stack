const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const UserSchema = new Schema({
    username: String,
    gender: {type: String, default: "male"},
    phone: {type: String, default: null},
    address: {type: String, default: null},
    avatar: {type: String, default: "https://firebasestorage.googleapis.com/v0/b/chat-app-224c7.appspot.com/o/download.jpeg?alt=media&token=8efe1384-671b-49ae-892f-8342590c06df"},
    role: {type: String, default: "user"},
    local: { 
        email: {type: String, trim: true},
        password: {type: String, require: true},
        isActive: {type: Boolean, default: false},
        verifyToken: {type: String}
    },
    facebook: {
        uid: String,
        token: String,
        email: {type: String, trim: true}
    },
    google: {
        uid: String,
        token: String,
        email: {type: String, trim: true}
    },
    createAt: {type: Number,default: Date.now},
    updateAt: {type: Number,default: null},
    deleteAt: {type: Number,default: null}
});

module.exports = mongooes.model('user', UserSchema);