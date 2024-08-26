// server.js
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const authenticate = require('./controllers/authenticate');
const createUser = require('./controllers/createUser');
const postController = require('./controllers/postController');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/authenticate', authenticate);
app.post('/api/create-user', createUser);
app.post('/api/posts', postController.createPost);
app.get('/api/posts', postController.getPosts);
app.patch('/api/posts/:postId/upvote', postController.upvotePost);
app.patch('/api/posts/:postId/downvote', postController.downvotePost);
app.post('/api/posts/:postId/comments', postController.addComment);


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
