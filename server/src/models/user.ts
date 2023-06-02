import mongoose, { Document, Schema, Model } from 'mongoose';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  transform: () => any;
}

interface UserModel extends Model<UserDocument> {
  // Additional static methods can be added here
}

const userSchema = new Schema<UserDocument, UserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  imageUrl: { type: String },
  id: { type: String },
});


userSchema.methods.transform = function () {
  const user = this.toObject();
  user.id = user._id.toString();
  delete user._id;
  return user;
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;