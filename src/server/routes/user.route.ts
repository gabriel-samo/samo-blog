import express from "express";
import { updateUser, userTest } from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyToken";

const userRouter = express.Router();

userRouter.get("/", userTest);
userRouter.put("/update/:userId", verifyToken, updateUser);

export default userRouter;
