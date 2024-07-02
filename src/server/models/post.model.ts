import mongoose, { Types } from "mongoose";

export interface IPost {
  _doc: IPost;
  __v: number;
  _id: Types.ObjectId;
  userId: string;
  title: string;
  content: string;
  image: string;
  category: string;
  slug: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
    },
    category: {
      type: String,
      default: "none"
    },
    slug: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;
