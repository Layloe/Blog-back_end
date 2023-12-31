const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to DB') )
    .catch(error => console.log(error.message))

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String
}) 

const Post = mongoose.model('Post', postSchema)


//get all post
app.get('/posts', async (req,res) => {
    const posts = await Post.find()
    res.send(posts)
})

//get one post
app.get('/posts/:id', async (req,res) => {
    const posts = await Post.findById(req.params.id)
    res.send(posts)
})

//create new post
app.post('/posts', async (req,res) => {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.send(savedPost)
})

//delete post
app.delete('/posts/:id', async (req,res) => {
     await Post.findByIdAndDelete(req.params.id)
    res.status(200).send('Post deleted')
})

app.listen( 4242, () => console.log('Server started on port 4242'))

