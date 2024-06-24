import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { createJWT } from "../utils/createJWT";
import { errorHandler } from "../utils/errorHandler";
import { type NextFunction, type Request, type Response } from "express";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extracting user credentials from the request body
    const { username, email, password } = req.body.formData;
    // validating that the credentials are pressent and not empty
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      password === "" ||
      email === ""
    ) {
      // if one of them are empty or not provided, responding with 400 (Bad Request)
      // return res.status(400).json("All fields are required");
      // using error handler function instead
      return next(errorHandler(400, "All fields are required"));
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
    // return res.status(500).json("ERROR!, " + error.message);
    return next(errorHandler(500, "ERROR!, " + error.message));
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extracting the email and password from the request body
    const { email, password } = req.body;
    // validating that the credentials are provided and not empty
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "all fields are required"));
    }
    // searching the db for a user with the provided email
    const foundUser = await User.findOne({ email });
    // validating that the user exists
    if (!foundUser) {
      return next(errorHandler(404, "User not found"));
    } else {
      // comapring the password of the found user and the provided password
      const checkedPass = bcryptjs.compareSync(password, foundUser.password);
      // if the passwords do not match, then returning an error
      if (!checkedPass) {
        return next(errorHandler(400, "Invalid password"));
      }
      // if the passwords are equal than creating a jwt and sending it with a HTTP only cookie (a cookie that are not accessible from JS)
      const token = createJWT(foundUser._id);

      // sperating the password from the user credentials
      const { password: pass, ...rest } = foundUser._doc;
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error: any) {
    // if there is any error, catch it and send an 500 (server error) with an error message
    return next(errorHandler(500, "ERROR!, " + error.message));
  }
};
