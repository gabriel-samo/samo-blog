import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  updateUser
} from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyToken";

const userRouter = express.Router();

userRouter.put("/update/:userId", verifyToken, updateUser);
userRouter.delete("/delete/:userId", verifyToken, deleteUser);
userRouter.post("/signout", signout);
userRouter.get("/all-users", verifyToken, getUsers);
userRouter.get("/:userId", getUser);

export default userRouter;
