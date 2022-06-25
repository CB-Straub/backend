import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title:  String,
  description:  String,
  name:  String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
    
     
})


const PostModel = mongoose.model('Post',  postSchema)

export default PostModel