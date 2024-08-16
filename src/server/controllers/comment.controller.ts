import { errorHandler } from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";

import Comment from "../models/comment.model";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, userId, content } = req.body;
    if (!postId || !userId || !content) {
      return next(errorHandler(400, "All fields are required"));
    }
    if (userId !== req.currentUser?.id) {
      return next(errorHandler(403, "You are not allowed to create comments"));
    }
    const newComment = new Comment({
      postId,
      userId,
      content
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
