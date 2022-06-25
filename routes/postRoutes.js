import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'


import { 
    createPost, 
    deletePost, 
    getAllPosts, 
    getPost, 
    getPostsByUser, 
    likePost, 
    updatePost,  } from '../controllers/post.js'

//  CREATE
router.post('/',  auth, createPost )

//  READ
router.get('/' , getAllPosts )
router.get('/:id' , getPost )
router.get('/userPosts/:id', auth, getPostsByUser)

//  UPDATE
router.patch('/:id', auth, updatePost)

//  DELETE
router.delete('/:id', auth, deletePost)

//LIKES 
router.patch('/like/:id', auth, likePost)




export default router

