import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: {
    type: [String],
    default: []
  },
  likes: {
    type: [String],
    default: []
  },
  comments: {
    type: [String],
    default: []
  },
  createAt:{
    type: Date,
    default: new Date()
  },
})

const Post = mongoose.model('Post', postSchema)

export default Post