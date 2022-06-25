import mongoose from 'mongoose'

import PostModel from '../models/post.js'

//create a new post
export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostModel({
      ...post,
      creator: req.user,
      createdAt: new Date().toISOString()
    })
  
    try {
      await newPost.save();
      res.status(201).json(newPost)
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" })
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

//get a single post to view just one after clicing read more....
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" })
  }
}

//getting user posts to dashboard page    --need to figure out how to get only one users posts
export const getPostsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" })
  }
  const userPosts = await PostModel.find({posts:id})
  res.status(200).json(userPosts);
}


//deleting a post
export const deletePost = async ( req, res ) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Post exists with id: ${id}` })
    }
    await PostModel.findByIdAndRemove(id)
    res.json({ message: "Post deleted!" })
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" })
  }
}

//updating/editing a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No post exist with id: ${id}` });
    }

    const updatedPost = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await PostModel.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const likePost = async (req, res,) => {
  //find the post id
  const { id } = req.params;

  try {
    //verify user and decline if not verified
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }
    //verify the post id 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No post exist with id: ${id}` });
    }
    //find the post id (from req.params)
    const post = await PostModel.findById(id);
    //in the likes we store the user ID
    const index = post.likes.findIndex((id) => id === String(req.userId));

    //allow only one like per user id 
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostModel.findByIdAndUpdate(id, post, {new: true, });

    res.status(200).json(updatedPost);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};














