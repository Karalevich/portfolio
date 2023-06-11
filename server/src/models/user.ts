import mongoose, { Document, Schema, Model } from 'mongoose';

interface UserDocument extends Document {
  name: string
  email: string
  password: string
  imageUrl: string
  isActivated: boolean
  activationLink: string
  transform: () => any
}

interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  imageUrl: { type: String },
  id: { type: String },
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String }
});


userSchema.methods.transform = function () {
  const user = this.toObject()
  user.id = user._id.toString()
  delete user._id
  delete user.activationLink
  delete user.password
  return user
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

export default User