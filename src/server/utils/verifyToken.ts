import jwt from "jsonwebtoken";
import { config } from "../config";
import { errorHandler } from "./errorHandler";
import { NextFunction, Request, Response } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  // console.log("cookies:", req.cookies);
  if (!token) {
    // console.log("token:", token);
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, config.jwt.secret!, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return next(errorHandler(401, "Unauthorized"));
    }
    req.currentUser = user;
    next();
  });
};
