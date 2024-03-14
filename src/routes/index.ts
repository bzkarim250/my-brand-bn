import express from "express";
import userRoute from "./userRoute";
import blogRoute from "./blogRoutes";

const route = express.Router();

route.use("/user", userRoute);
route.use("/blog", blogRoute);

export default route;
