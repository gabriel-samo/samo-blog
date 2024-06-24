import { type Request, type Response } from "express";

export const userTest = async (req: Request, res: Response) => {
  try {
    res.status(200).json("Server is working :)");
  } catch (error: any) {
    return res.status(500).json("ERROR!, " + error.message);
  }
};
