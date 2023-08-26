const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors');
const axios = require('axios')
const Comments = require('./model')

const app = express(); 
const port = 3001;
app.use(cors()); 
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydbs',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected")
})

app.post('/posts/api',async (req,res) => {
    const {post,commentId,replyPost} = req.body;
    console.log(commentId);
    console.log(replyPost);
    console.log(post);
    try{
        if(commentId!==''){
            const parent = await Comments.findById(commentId);
            parent.replies.push(replyPost);
            await parent.save();
            res.status(201).send('Reply added to Mongo');
        }
        
        else{
            const newPost = new Comments({
                comment: post,
            })
            await newPost.save();
            res.status(201).send('Comment added to Mongo');
        }
      
         
    } catch(err){
        res.status(500).send('Error adding comment to Mongo')
    }
    
})




app.get('/posts/api', async (req,res) => {
    try{
        const comments = await Comments.find(); 
        res.json(comments);
    } catch (err){
        res.status(500).send("Error retrieving comments");
    }
})


app.listen(port,()=>{
    console.log(`Server Running on port ${port}`)
})