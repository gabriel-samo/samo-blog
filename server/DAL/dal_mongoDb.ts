import mongoose from "mongoose";
import { config } from "../config";

export const db =
  // checking if the uri exsits and only then connecting to the DB
  config.db.uri &&
  mongoose
    .connect(config.db.uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
