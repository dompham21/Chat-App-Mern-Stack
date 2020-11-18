const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    userId: String,
    contactId: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    contacter: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {type: Boolean, default: false, ref: 'user'},
    createAt: {type: Number,default: Date.now},
    updateAt: {type: Number,default: null},
    deleteAt: {type: Number,default: null}
});

module.exports = mongoose.model('contact', ContactSchema);