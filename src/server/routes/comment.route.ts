import express from "express";
import { verifyToken } from "../utils/verifyToken";
import {
  createComment,
  getPostComments
} from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/post-comments/:postId", getPostComments);

export default commentRouter;
