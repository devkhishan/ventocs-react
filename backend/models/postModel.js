const mongoose = require('mongoose');
const Comment = require('./commentModel');

const postSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    comments: [Comment.schema], // Referencing the comment schema
    votedUsers: [{
        userId: {
            type: String,
            required: true,
        },
        hasUpvoted: {
            type: Boolean,
            default: false,
        },
        hasDownvoted: {
            type: Boolean,
            default: false,
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
