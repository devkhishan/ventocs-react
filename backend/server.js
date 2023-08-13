const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors');
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
    const {post} = req.body;
    const newPost = new Comments({
        comment: post
    })
    try{
        await newPost.save(); 
        res.status(201).send('Comment added to Mongo'); 
    } catch(err){
        res.status(500).send('Error adding comment to Mongo')
    }
    // res.redirect('/');
})


app.listen(port,()=>{
    console.log(`Server Running on port ${port}`)
})