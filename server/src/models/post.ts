import mongoose, { Schema, Document, Model } from 'mongoose'

interface PostDocument extends Document {
  title: string
  description: string
  content: string
  author: Schema.Types.ObjectId,
  tags: Array<string>
  img: string,
  likes: Array<string>,
  comments: Array<string>,
  date: Date,
}

interface PostModel extends Model<PostDocument> {}


const postSchema = new Schema<PostDocument, PostModel>({
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

const Post = mongoose.model<PostDocument, PostModel>('Post', postSchema)

export default Post