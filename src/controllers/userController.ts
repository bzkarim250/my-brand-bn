import { Request, Response } from "express";
import UserServices from "../database/services/userService";
import { generate, check } from "../helpers/cryptoJs";
import { sign } from "../helpers/jwt";
import response from "../helpers/response";

class UserController {
  static async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const userExist = await UserServices.getSingleUser({
        $or: [{ username }, { email }],
      });
      if (userExist) {
        response(
          res,
          409,
          "This username or email is already taken",
          null,
          "USER_EXISTS"
        );
        return;
      }
      const hashedPassword = await generate(password);
      const newUser = { ...req.body, password: hashedPassword };
      const user = await UserServices.userSignup(newUser);
      user.password = undefined;
      const accessToken = sign({
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      });

      const userObject = user.toObject();
      userObject.accessToken = accessToken;

      response(res, 201, "Signup successful", userObject);
    } catch (error) {
      response(
        res,
        500,
        (error as Error).message || "Internal Server Error",
        null,
        "SERVER_ERROR"
      );
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { account, password } = req.body;
      const user = await UserServices.getSingleUser({
        $or: [{ username: account }, { email: account }],
      });

      if (!user) {
        response(res, 404, "Email or username not registered", null, "USER_NOT_FOUND");
        return;
      }

      if (!user.password) {
        response(res, 401, "Password is not set for this account", null, "UNAUTHORIZED");
        return;
      }

      if (!check(user.password, password)) {
        response(res, 401, "Wrong password", null, "UNAUTHORIZED");
        return;
      }

      const accessToken = sign({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      const userObject = user.toObject();
      userObject.accessToken = accessToken;
      delete userObject.password;

      response(res, 200, "Login successful", userObject);
    } catch (error) {
      response(
        res,
        500,
        (error as Error).message || "Internal Server Error",
        null,
        "SERVER_ERROR"
      );
    }
  }
}

export default UserController;
