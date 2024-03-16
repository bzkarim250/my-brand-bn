import { Request, Response, NextFunction } from "express";
import { verify } from "../helpers/jwt";
import response from "../helpers/response";

interface DecodedUser {
  role: string;
  id: string;
  username: string;
  email: string;
}

export const isAdmin = async (
  req: Request & { user?: DecodedUser },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) throw new Error("You don't have access to do that action");
    const token = authHeader.replace("Bearer ", "");
    const user = verify(token) as DecodedUser;

    if (user.role !== "admin") {
      response(
        res,
        403,
        "You don't have access to do that action",
        null,
        "FORBIDDEN"
      );
      return;
    }
    req.user = user;
    return next();
  } catch (error) {
    response(
      res,
      401,
      (error as Error).message || "Not Authorized",
      null,
      "AUTHENTICATION_ERROR"
    );
    return;
  }
};

export const isUser = async (
  req: Request & { user?: DecodedUser },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) throw new Error("You don't have access to do that action");
    const token = authHeader.replace("Bearer ", "");
    const user = verify(token) as DecodedUser;

    if (user.role !== "user") {
      response(
        res,
        403,
        "You don't have access to do that action",
        null,
        "FORBIDDEN"
      );
      return;
    }
    req.user = user;
    return next();
  } catch (error) {
    response(
      res,
      401,
      (error as Error).message || "Not Authorized",
      null,
      "AUTHENTICATION_ERROR"
    );
  }
};

export const isUserOrAdmin = async (
  req: Request & { user?: DecodedUser },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) throw new Error("You don't have access to do that action");
    const token = authHeader.replace("Bearer ", "");
    const user = verify(token) as DecodedUser;

    if (user.role !== "user" && user.role !== "admin") {
      response(
        res,
        403,
        "You don't have access to do that action",
        null,
        "FORBIDDEN"
      );
      return;
    }
    req.user = user;
    return next();
  } catch (error) {
    response(
      res,
      401,
      (error as Error).message || "Not Authorized",
      null,
      "AUTHENTICATION_ERROR"
    );
  }
};
