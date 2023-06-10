import mongoose, { Schema, Document, Model } from 'mongoose'

export interface PostDocument extends Document {
  title: string
  description: string
  content: string
  author: Schema.Types.ObjectId,
  tags: Array<string>
  img: string,
  likes: Array<Schema.Types.ObjectId>,
  comments: Array<string>,
  date: Date,
}

export interface PostModel extends Model<PostDocument> {}


const postSchema = new Schema<PostDocument, PostModel>({
  title: String,
  description: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  img: String,
  likes: {
    type: [{type: Schema.Types.ObjectId, ref: 'User', required: true }],
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