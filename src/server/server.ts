import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import { config } from "./config";
import { db } from "./DAL/dal_mongoDb";
import { errorMiddleware } from "./middlewares/error.middleware";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const app = express();

// middlewares
if (isDevelopment) {
  app.use(cors());
}

if (isProduction) {
  app.use(express.static("public"));
}

app.use(express.json());

// all our api routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use(errorMiddleware);

// 404 fallback for client side routing
if (isProduction) {
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "public" });
  });
}

const { port, host } = config.app;
app.listen(port, () => {
  console.log(db);
  console.log(`http://${host}:${port}`);
});
