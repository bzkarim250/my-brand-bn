import express from "express";
import BlogController from "../controllers/blogController";

const blogRoute = express.Router();

blogRoute.post("/create", BlogController.createBlog);
blogRoute.get("/all", BlogController.getAllBlogs);
blogRoute.delete("/delete/:blogId", BlogController.deleteBlog);
blogRoute.put('/update/:blogId',BlogController.updateBlog);
blogRoute.get("/single/:blogId", BlogController.singleBlog);

export default blogRoute;
