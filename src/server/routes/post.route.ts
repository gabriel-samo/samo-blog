import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts
} from "../controllers/post.controller";
import { verifyToken } from "../utils/verifyToken";

const postRouter = express.Router();

postRouter.post("/create", verifyToken, createPost);
postRouter.get("/allPosts", getAllPosts);
postRouter.delete("/delete/:postId/:userId", verifyToken, deletePost);

export default postRouter;
