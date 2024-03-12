import { Request, Response } from "express";
import UserServices from "../database/services/userService";
import { generate } from "../helpers/cryptoJs";
import { sign } from "../helpers/jwt";
import response from "../helpers/response";

class UserController {
  static async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const userExist = await UserServices.getSingleUser({ $or: [{ username }, { email }] });
      if (userExist) {
        response(res, 409, "This username or email is already taken", null, "USER_EXISTS");
        return;
      }
      const hashedPassword = await generate(password);
      const newUser = { ...req.body, password: hashedPassword };
      const user = await UserServices.userSignup(newUser);
      user.password = undefined;
      const accessToken = sign({
        id: user._id, username: user.username, role: user.role, email: user.email
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { blogs, comments, ...userWithoutBlogsAndComments } = user.toObject();
      const userWithToken = { ...userWithoutBlogsAndComments, accessToken };

      response(res, 201, "Signup successful", userWithToken);
    } catch (error) {
      response(res, 500, (error as Error).message || "Internal Server Error", null, "SERVER_ERROR");
    }
  }
}

export default UserController;
