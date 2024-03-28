import express from "express";
import userRoute from "./userRoute";
import blogRoute from "./blogRoutes";
import commentRoute from "./commentRoutes";
import messageRoute from "./messageRoutes";

const route = express.Router();

route.use("/user", userRoute);
route.use("/blog", blogRoute);
route.use("/comment",commentRoute);
route.use("/message",messageRoute)

export default route;
