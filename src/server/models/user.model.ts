import mongoose, { Document } from "mongoose";

// export interface IUser {
//   _doc: IUser;
//   __v: number;
//   _id: Types.ObjectId;
//   username: string;
//   password: string;
//   email: string;
//   createdAt: Date | string;
//   updatedAt: Date | string;
//   profilePicture?: string;
//   isAdmin?: boolean;
// }

export interface IUser extends Document {
  _doc: IUser;
  username: string;
  password: string;
  email: string;
  profilePicture?: string;
  isAdmin?: boolean;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
