import mongoose, { Types } from "mongoose";

export interface IUser {
  _doc: IUser;
  __v: number;
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  profilePicture?: string;
  name?: string;
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
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    name: {
      type: String
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
