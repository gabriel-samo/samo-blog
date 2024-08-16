import express from "express";
import { verifyToken } from "../utils/verifyToken";
import { createComment, getComments } from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/", verifyToken, getComments);

export default commentRouter;
