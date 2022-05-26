import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'


import { 
    createPost, 
    getAllPosts 


} from '../controllers/post.js'

router.post('/', createPost )
router.get('/' , getAllPosts )


export default router

