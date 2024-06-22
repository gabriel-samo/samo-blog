import express from "express";
import cors from "cors";
import { config } from "./config";
import { db } from "./DAL/dal_mongoDb";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  try {
    res.status(200).json("OK");
  } catch (error: any) {
    res.status(500).json(error);
  }
});

const { port, host } = config.app;
app.listen(port, async () => {
  await db;
  console.log(`http://${host}:${port}`);
});
