import { type Request, type Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";

export const signUp = async (req: Request, res: Response) => {
  try {
    // extracting user credentials from the request body
    const { username, email, password } = req.body;
    // validating that the credentials are pressent and not empty
    if (
      !username ||
      !email ||
      !password ||
      username === " " ||
      password === " " ||
      email === " "
    ) {
      // if one of them are responding with 400 (Bad Request)
      return res.status(400).json("All fields are required");
    }
    // hashing the password to store in the DB
    const hashedPass = bcryptjs.hashSync(password, 10);
    // creating a new user with the hashed password
    const newUser = new User({ username, email, password: hashedPass });
    // saving to the DB (asynchronus)
    await newUser.save();
    // responding with status 200 (OK)
    return res.status(200).json("User was created successfully :)");
  } catch (error: any) {
    // if there is any error, catch it and send an 500 (server error) with an error message
    return res.status(500).json("ERROR!, " + error.message);
  }
};