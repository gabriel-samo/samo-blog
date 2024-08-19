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

export const getPostComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1
    });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const likeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.currentUser?.id!);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.currentUser?.id!);
    } else {
      comment.numberOfLikes <= 0
        ? (comment.numberOfLikes = 0)
        : (comment.numberOfLikes -= 1);
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const editComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.currentUser?.id || !req.currentUser?.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }
    comment.content = req.body.content;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.currentUser?.id || !req.currentUser?.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    await comment.deleteOne();
    res.status(200).json("Comment deleted successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.currentUser?.isAdmin) {
      return next(errorHandler(403, "You are not allowed to access this"));
    }
    const startIndex = +req.query.startIndex! || 0;
    const limit = +req.query.limit! || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const today = new Date();
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    });
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
