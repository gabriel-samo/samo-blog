import { type NextFunction, type Request, type Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import Post from "../models/post.model";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.currentUser?.isAdmin) {
      return next(errorHandler(403, "You are now allowed to create posts"));
    }
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "All fields are required"));
    }
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.currentUser?.id
    });

    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error: any) {
    return next(error);
  }
};
