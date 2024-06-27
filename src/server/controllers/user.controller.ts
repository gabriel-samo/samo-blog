import bcryptjs from "bcryptjs";
import { type Request, type Response, type NextFunction } from "express";
import { errorHandler } from "../utils/errorHandler";
import User, { IUser } from "../models/user.model";

export const userTest = async (req: Request, res: Response) => {
  try {
    res.status(200).json("Server is working :)");
  } catch (error: any) {
    return res.status(500).json("ERROR!, " + error.message);
  }
};

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
      if (!username.matches(/^[a-zA-Z0-9]+$/)) {
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
