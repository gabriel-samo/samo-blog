import jwt from "jsonwebtoken";
import { config } from "../config";
import { errorHandler } from "./errorHandler";
import { NextFunction, Request, Response } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["access_token"];
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, config.jwt.secret!, (err: any, user: any) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.currentUser = user;
    next();
  });
};
