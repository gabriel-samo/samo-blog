import express from "express";
import { googleAuth, signIn, signUp } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/googleAuth", googleAuth);

export default authRouter;
