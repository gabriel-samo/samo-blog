import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller";
import { verifyToken } from "../utils/verifyToken";

const postRouter = express.Router();

postRouter.post("/create", verifyToken, createPost);
postRouter.get("/allPosts", getAllPosts);

export default postRouter;
