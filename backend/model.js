const mongoose = require('mongoose'); 

const commentSchema = new mongoose.Schema({
    comment: String
})

const commentModel = mongoose.model('Comments',commentSchema)

module.exports = commentModel;