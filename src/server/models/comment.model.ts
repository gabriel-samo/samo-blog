import mongoose from "mongoose";

interface IComment extends mongoose.Document {
  content: string;
  postId: string;
  userId: string;
  likes: string[];
  numberOfLikes: number;
}

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    likes: {
      type: Array,
      default: []
    },
    numberOfLikes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
