import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//models
import UserModel from '../models/user.js'

//post request, sign up new user
export const signUp = async ( req, res ) => {
    const { email, password, firstName, lastName } = req.body
        try {

            const oldUser = await UserModel.findOne({ email })

            //check to see if user already exists
            if(oldUser) {
                return res.status(400).json({ message: "User already exists" })
            }
            //hash the password with salt of 12. 
            const hashedPassword = await bcrypt.hash( password, 12 )

            const result = await UserModel.create({
                email, 
                password: hashedPassword,
                name: `${firstName} ${lastName}` 
            })
            //creating the token
            const token = jwt.sign({ email: result.email, id: result._id}, process.env.JWT_SECRET, { expiresIn:  "1h"})
                res.status(201).json({ result, token })

        }catch(error) { 
            res.status(500).json({ message: "Something went a bit wrong"})
            console.log(error)

        }
}
//post request, login a new user 
export const login = async ( req, res ) => {
    const { email, password } = req.body

    try {

        //check for existing user
        const oldUser = await UserModel.findOne({ email })
        if(!oldUser) 
            return res.status(403).json({ message: 'Invalid Credentials, verify your login and retry'})

        //verify password if user exists
        const isPasswordCorrect = await bcrypt.compare( password, oldUser.password)
        if(!isPasswordCorrect)
        return res.status(400).json({ message: 'Invalid Credentials'})

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id, }, process.env.JWT_SECRET, { expiresIn: '1h'})
            res.status(200).json({ result: oldUser, token})

    }catch(error) {
        res.status(500).json({ message: 'Please try again'})
        console.log(error)

    }
} 