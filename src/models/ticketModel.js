const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    conversation: [
        {
            userType: String,
            message: String
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status:{
        type: Boolean,
        required: true,
        default: false
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now()
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Ticket', schema, 'ticket')