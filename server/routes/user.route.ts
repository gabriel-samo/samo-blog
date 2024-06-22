import express from "express";
import { userTest } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", userTest);

export default userRouter;
