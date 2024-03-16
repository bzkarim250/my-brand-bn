import express from "express";
import userRoute from "./userRoute";
import blogRoute from "./blogRoutes";
import commentRoute from "./commentRoutes";

const route = express.Router();

route.use("/user", userRoute);
route.use("/blog", blogRoute);
route.use("/comment",commentRoute);

export default route;
