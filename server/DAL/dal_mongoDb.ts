import mongoose from "mongoose";
import { config } from "../config";

export const db = mongoose
  .connect(config.db.uri!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
