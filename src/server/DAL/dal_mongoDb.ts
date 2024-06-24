import mongoose from "mongoose";
import { config } from "../config";

export const db =
  // checking if the uri exsits and only then connecting to the DB
  config.db.uri &&
  mongoose
    .connect(config.db.uri)
    .then(() => "Connected to MongoDB")
    .catch((err) => err);
