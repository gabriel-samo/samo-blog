import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { config } from "../config";

export const createJWT = (userId: Types.ObjectId) => {
  return jwt.sign({ id: userId }, config.jwt.secret!, {
    expiresIn: config.jwt.expiresIn
  });
};
