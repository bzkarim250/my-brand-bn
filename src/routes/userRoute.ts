import express from "express";
import userController from "../controllers/userController";
import UserValidation from "../middlewares/validation/user";

const userRoute = express.Router();

userRoute.post("/signup", UserValidation.signup, userController.signUp);
userRoute.post("/login", userController.login);

export default userRoute;
