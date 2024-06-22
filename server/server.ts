import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route";
import { config } from "./config";
import { db } from "./DAL/dal_mongoDb";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);

const { port, host } = config.app;
app.listen(port, () => {
  db;
  console.log(`http://${host}:${port}`);
});
