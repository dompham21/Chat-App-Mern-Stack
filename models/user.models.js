const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const UserSchema = new Schema({
    username: String,
    gender: {type: String, default: "male"},
    phone: {type: Number, default: null},
    address: {type: String, default: null},
    avatar: {type: String, default: "logo.png"},
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