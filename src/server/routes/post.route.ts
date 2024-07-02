import express from "express";
import { createPost } from "../controllers/post.controller";
import { verifyToken } from "../utils/verifyToken";

const postRouter = express.Router();

postRouter.post("/create", verifyToken, createPost);

export default postRouter;
