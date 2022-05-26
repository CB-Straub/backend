import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    name: {
        type: String
    },
    creator: {
        type: String
    },
    imageFile: {
        type: String
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
    likeCount: {
        type: Number,
        default: 0
    },
    dislikeCount: {
        type: Number,
        default: 0
    }
     
})


const PostModel = mongoose.model('Post',  postSchema)

export default PostModel