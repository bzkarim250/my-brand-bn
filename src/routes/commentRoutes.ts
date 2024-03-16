import express from "express";
import CommentController from "../controllers/commentController";
import { isUserOrAdmin } from "../middlewares/auth";

const commentRoute=express.Router();

commentRoute.post("/add/:blogId",isUserOrAdmin,CommentController.addComment);

export default commentRoute;