import express from "express";
import BlogController from "../controllers/blogController";
import { isAdmin, isUserOrAdmin } from "../middlewares/auth";
import upload from "../helpers/multer";
const blogRoute = express.Router();

blogRoute.post(
  "/create",
  isAdmin,
  upload.single("image"),
  BlogController.createBlog
);
blogRoute.get("/all", BlogController.getAllBlogs);
blogRoute.delete("/delete/:blogId", isAdmin, BlogController.deleteBlog);
blogRoute.patch("/update/:blogId", isAdmin, BlogController.updateBlog);
blogRoute.get("/single/:blogId", BlogController.singleBlog);
blogRoute.patch("/like/:blogId", isUserOrAdmin, BlogController.likeBlog);

export default blogRoute;
