import express from "express";
import { verifyToken } from "../utils/verifyToken";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  getPostComments,
  likeComment
} from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/post-comments/:postId", getPostComments);
commentRouter.put("/like-comment/:commentId", verifyToken, likeComment);
commentRouter.put("/edit/:commentId", verifyToken, editComment);
commentRouter.delete("/delete/:commentId", verifyToken, deleteComment);
commentRouter.get("/all-comments", verifyToken, getAllComments);

export default commentRouter;
