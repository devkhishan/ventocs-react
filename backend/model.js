const mongoose = require('mongoose'); 

const replySchema = new mongoose.Schema({
    comment: String,
    nestedReplies: [this]
})
const commentSchema = new mongoose.Schema({
    comment: String,
    replies: [String]
})


const commentModel = mongoose.model('Comments',commentSchema)

module.exports = commentModel;