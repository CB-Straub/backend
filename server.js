import express  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'

//routes
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'


const app = express()
dotenv.config()

app.use(morgan("dev"))

//using express built in body parser to limit size of uplaoded user images
app.use(express.json({ limit: "30mb", extended: true}))
app.use(express.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())


// testing browser server setup
app.get('/', (req, res) =>{
    res.send("whats express!")
})

app.use('/users', userRouter)  //http://localhost:5000/users/signup
app.use ('/post', postRouter)

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`)))
    .catch((error) => console.log(error.message) )