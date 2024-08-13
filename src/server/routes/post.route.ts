import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost
} from "../controllers/post.controller";
import { verifyToken } from "../utils/verifyToken";

const postRouter = express.Router();

postRouter.post("/create", verifyToken, createPost);
postRouter.get("/allPosts", getAllPosts);
postRouter.delete("/delete/:postId/:userId", verifyToken, deletePost);
postRouter.put("/update/:postId/:userId", verifyToken, updatePost);

export default postRouter;
