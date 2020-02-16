const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        required: true,
        index: {
            unique: true
        }
    },
    created_At: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_At:{
        type: Date
    },
    sessionId: {
        type: String
    }
})

module.exports = mongoose.model('Users', schema, 'users')