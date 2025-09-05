import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed assword only
    firstName: String,
    lastName: String,
    avatarUrl: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// const UrlModel = mongoose.model("UrlModel", urlSchema);
const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
