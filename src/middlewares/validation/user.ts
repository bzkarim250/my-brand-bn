import { Request, Response, NextFunction } from "express";
import validateSchema from "../../helpers/validator";
import signupSchema from "./schemas/signup";

class UserValidation {
  static signup(req: Request, res: Response, next: NextFunction) {
    validateSchema(signupSchema, req.body, res, next);
  }
}

export default UserValidation;
