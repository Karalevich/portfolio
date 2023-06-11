import mongoose, { Document, Schema, Model } from 'mongoose'

interface TokenDocument extends Document {
  user: Schema.Types.ObjectId,
  refreshToken: string

}

interface TokenModel extends Model<TokenDocument> {
}

const refreshTokenSchema = new Schema<TokenDocument, TokenModel>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
})


const Token = mongoose.model<TokenDocument, TokenModel>('Token', refreshTokenSchema)

export default Token