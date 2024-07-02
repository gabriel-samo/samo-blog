import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { createJWT } from "../utils/createJWT";
import { errorHandler } from "../utils/errorHandler";
import { type NextFunction, type Request, type Response } from "express";
import crypto from "crypto";
import { cookieOptions } from "../utils/cookieOptions";
//require('crypto').randomBytes(64).toString('hex');

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extracting user credentials from the request body
    const { username, email, password } = req.body;
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
    return next(error);
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
      const token = createJWT(foundUser);

      // sperating the password from the user credentials
      const { password: pass, ...rest } = foundUser._doc;
      return res
        .status(200)
        .cookie("access_token", token, cookieOptions)
        .json(rest);
    }
  } catch (error: any) {
    // if there is any error, catch it and send an 500 (server error) with an error message
    return next(error);
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // extracting the email and password from the request body
  const { email, name, googlePhotoUrl } = req.body;
  try {
    // searching the db for a user with the provided email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      // if the user exsist, creating a JWT
      const token = createJWT(foundUser);
      // sepereting the password and the rest of the credentials
      const { password, ...rest } = foundUser._doc;
      // sending the user credentials
      return res
        .status(200)
        .cookie("access_token", token, cookieOptions)
        .json(rest);
    } else {
      // if the user was not found,
      // generating a random password
      const generatedPass = crypto.randomBytes(8).toString("hex");
      // hashing the password
      const hashedPass = bcryptjs.hashSync(generatedPass, 10);
      // creating a new user with the credentials provided from google
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        profilePicture: googlePhotoUrl,
        password: hashedPass,
        email
      });
      // saving to the db
      await newUser.save();
      // generatin a token
      const token = createJWT(newUser);
      // seperatin the password fron the user cerds
      const { password, ...rest } = newUser._doc;
      // sending the token with a HTTP only cookie
      return res
        .status(200)
        .cookie("access_token", token, cookieOptions)
        .json(rest);
    }
  } catch (error: any) {
    // if there is any error, catch it and send an 500 (server error) with an error message
    return next(error);
  }
};
