const Post = require('../models/postModel');

// Create a new post
const createPost = async (req, res) => {
    const { creator, content } = req.body;

    try {
        const newPost = new Post({
            creator,
            content,
        });

        await newPost.save();
        res.status(201).json({ success: true, post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 }); // Fetch posts sorted by creation date
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Upvote a post
const upvotePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found.' });
        }

        const userVote = post.votedUsers.find(vote => vote.userId === userId);

        if (userVote) {
            if (userVote.hasUpvoted) {
                return res.status(400).json({ success: false, message: 'User has already upvoted this post.' });
            }
            if (userVote.hasDownvoted) {
                post.downvotes -= 1; // Remove previous downvote
                post.upvotes += 1;   // Add upvote
                userVote.hasDownvoted = false;
            } else {
                post.upvotes += 1; // Add upvote
            }
            userVote.hasUpvoted = true;
        } else {
            post.upvotes += 1; // Add upvote
            post.votedUsers.push({ userId, hasUpvoted: true, hasDownvoted: false });
        }

        await post.save();
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error('Error upvoting post:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Downvote a post
const downvotePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found.' });
        }

        const userVote = post.votedUsers.find(vote => vote.userId === userId);

        if (userVote) {
            if (userVote.hasDownvoted) {
                return res.status(400).json({ success: false, message: 'User has already downvoted this post.' });
            }
            if (userVote.hasUpvoted) {
                post.upvotes -= 1; // Remove previous upvote
                post.downvotes += 1; // Add downvote
                userVote.hasUpvoted = false;
            } else {
                post.downvotes += 1; // Add downvote
            }
            userVote.hasDownvoted = true;
        } else {
            post.downvotes += 1; // Add downvote
            post.votedUsers.push({ userId, hasUpvoted: false, hasDownvoted: true });
        }

        await post.save();
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error('Error downvoting post:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Add a comment to a post
const addComment = async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found.' });
        }

        post.comments.push({ text, upvotes: 0, downvotes: 0 });
        await post.save();

        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

module.exports = {
    createPost,
    getPosts,
    upvotePost,
    downvotePost,
    addComment,
};
