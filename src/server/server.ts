import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import postRouter from "./routes/post.route";
import commentRouter from "./routes/comment.route";

import { config } from "./config";
import { db } from "./DAL/dal_mongoDb";
import { errorMiddleware } from "./middlewares/error.middleware";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const app = express();

// middlewares
if (isDevelopment) {
  const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true
  };
  app.use(cors(corsConfig));
}

if (isProduction) {
  app.use(express.static("public"));
}

app.use(express.json());
app.use(cookieParser());

// all our api routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use(errorMiddleware);

// 404 fallback for client side routing
if (isProduction) {
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "public" });
  });
}

const { port, host } = config.app;
app.listen(port, async () => {
  console.log(await db);
  console.log(`http://${host}:${port}`);
});
