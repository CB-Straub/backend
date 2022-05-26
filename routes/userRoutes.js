import express from 'express'

const router = express.Router()

import { signUp, login } from '../controllers/user.js'


//sign up a new user,  post method
router.post('/signup', signUp)
//login in existing user, post method
router.post('/login', login)




export default router