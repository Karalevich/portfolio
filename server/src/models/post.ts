import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  author: String,
  tags: [String],
  img: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: new Date(),
  },
})

const Post = mongoose.model('Post', postSchema)

export default Post