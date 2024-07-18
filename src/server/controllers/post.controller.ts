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

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const startIndex = +req.query.startIndex! || 0;
    const limit = +req.query.limit! || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } }
        ]
      })
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts
    });
  } catch (error: any) {
    return next(error);
  }
};
