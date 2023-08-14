const mongoose = require('mongoose'); 

const replySchema = new mongoose.Schema({
    comment: String,
    username: String,
    likes: Number, 
    nestedReplies: [this]
})
const commentSchema = new mongoose.Schema({
    comment: String,
    username: String, 
    likes: Number,
    nestedReplies: [replySchema]
})


const commentModel = mongoose.model('Comments',commentSchema)

module.exports = commentModel;