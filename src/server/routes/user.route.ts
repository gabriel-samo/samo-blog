import express from "express";
import {
  deleteUser,
  signout,
  updateUser,
  userTest
} from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyToken";

const userRouter = express.Router();

userRouter.get("/", userTest);
userRouter.put("/update/:userId", verifyToken, updateUser);
userRouter.delete("/delete/:userId", verifyToken, deleteUser);
userRouter.post("/signout", signout);

export default userRouter;
