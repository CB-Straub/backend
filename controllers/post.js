import mongoose from 'mongoose'

import PostModel from '../models/post.js'

//create a new post
export const createPost = async (req, res ) => {

    const post = req.body
    const newPost = new PostModel({
        ...post, 
        createdAt: new Date().toISOString
    })

    try {

        await newPost.save()
        res.status(201).json(newPost)

    }catch(error) {
        res.status(404).jsom({ message: 'Something went wrong'})
    }
}

//get all posts in the database
export const getAllPosts = async ( req, res ) => {

    try {
        const posts = await PostModel.find()
        res.status(200).json(posts)      

    }catch(error) {
        res.status(404).json({ message: 'Fetch posts failed'})
    }
}

