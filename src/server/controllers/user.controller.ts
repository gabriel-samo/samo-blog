import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { errorHandler } from "../utils/errorHandler";
import { type Request, type Response, type NextFunction } from "express";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.currentUser?.id.toString() !== req.params.userId) {
      return next(
        errorHandler(403, "You are not allowed to updated this user")
      );
    }

    let { username, email, password, profilePicture } = req.body;

    if (password) {
      if (password.length < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );
      }
      password = bcryptjs.hashSync(password, 10);
    }
    if (username) {
      if (username.length < 7 || username.length > 20) {
        return next(
          errorHandler(400, "Username must be between 7 and 20 characters")
        );
      }
      if (username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contains spaces"));
      }
      if (username !== username.toLowerCase()) {
        return next(errorHandler(400, "Username must be lowercase"));
      }
      if (!username.match(/^[a-zA-Z][a-zA-Z0-9-_]+$/)) {
        return next(
          errorHandler(400, "Username must contian only letter and numbers")
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username,
          email,
          password,
          profilePicture
        }
      },
      { new: true }
    );
    const { password: newPassword, ...rest } = updatedUser!._doc;
    res.status(200).json(rest);
  } catch (error: any) {
    return next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.currentUser?.id.toString() !== req.params.userId) {
      return next(errorHandler(403, "You are not allowed to delete this user"));
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error: any) {
    return next(error);
  }
};

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("access_token");

    res.status(200).json("User has been sign-out");
  } catch (error: any) {
    return next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser?.isAdmin) {
    return next(errorHandler(403, "Only admin allowed to get all users"));
  }
  try {
    const startIndex = +req.query.startIndex! || 0;
    const limit = +req.query.limit! || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const users = await User.find({}, "-password")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    });

    return res.status(200).json({
      users,
      // users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers
    });
  } catch (error: any) {
    return next(error);
  }
};
