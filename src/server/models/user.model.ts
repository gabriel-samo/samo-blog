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
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
