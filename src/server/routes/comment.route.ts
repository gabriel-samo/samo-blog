import express from "express";
import { verifyToken } from "../utils/verifyToken";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  likeComment
} from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/post-comments/:postId", getPostComments);
commentRouter.put("/like-comment/:commentId", verifyToken, likeComment);
commentRouter.delete("/delete-comment/:commentId", verifyToken, deleteComment);

export default commentRouter;
