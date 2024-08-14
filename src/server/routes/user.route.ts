import express from "express";
import {
  deleteUser,
  getUsers,
  signout,
  updateUser
} from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyToken";

const userRouter = express.Router();

userRouter.put("/update/:userId", verifyToken, updateUser);
userRouter.delete("/delete/:userId", verifyToken, deleteUser);
userRouter.post("/signout", signout);
userRouter.get("/get-users", verifyToken, getUsers);

export default userRouter;
