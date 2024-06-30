import express from "express";
import {
  googleAuth,
  signIn,
  signUp,
  validateToken
} from "../controllers/auth.controller";
import { verifyToken } from "../utils/verifyToken";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/googleAuth", googleAuth);
// authRouter.post("/vaildateToken", verifyToken);

export default authRouter;
