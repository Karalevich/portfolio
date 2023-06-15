import mongoose, { Schema, Document, Model } from 'mongoose'

export interface CommentDocument extends Document {
  message: string
  timestamps: {
    createAt: Date
    updatedAt: Date
  }
  author: Schema.Types.ObjectId
  post: Schema.Types.ObjectId
  parent: Schema.Types.ObjectId
  children: Array<Schema.Types.ObjectId>
  likes: Array<Schema.Types.ObjectId>
}

export interface CommentModel extends Model<CommentDocument> {}


const commentSchema = new Schema<CommentDocument, CommentModel>({
  message: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
  children: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }],
    default: []
  },
  likes: {
    type: [{type: Schema.Types.ObjectId, ref: 'User', required: true }],
    default: [],
  },
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})

const Comment = mongoose.model<CommentDocument, CommentModel>('Comment', commentSchema)

export default Comment