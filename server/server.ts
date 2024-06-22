import { config } from "./config";
import { db } from "./DAL/dal_mongoDb";
import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

const { port, host } = config.app;
app.listen(port, () => {
  db;
  console.log(`http://${host}:${port}`);
});
