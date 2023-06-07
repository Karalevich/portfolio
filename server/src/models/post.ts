import mongoose, {Schema} from 'mongoose'

const postSchema = new Schema({
  title: String,
  description: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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