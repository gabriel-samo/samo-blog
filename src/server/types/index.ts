import { IUser } from "../models/user.model";

declare global {
  namespace Express {
    export interface Request {
      currentUser?: {
        id: string;
        createdAt: string;
        updatedAt: string;
        isAdmin: boolean;
      };
    }
  }
}
