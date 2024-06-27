import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { config } from "../config";
import { IUser } from "../models/user.model";

export const createJWT = (user: IUser) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, config.jwt.secret!, {
    expiresIn: config.jwt.expiresIn
  });
};
