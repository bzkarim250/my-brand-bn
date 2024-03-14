import { Request, Response } from "express";
import BlogServices from "../database/services/blogService";
import response from "../helpers/response"; // Corrected import statement

class BlogController {
  static async createBlog(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      // const { id } = req.user.id;
      const blogExists = await BlogServices.getSingleBlog(title);
      if (blogExists) {
        response(res, 409, "Blog already exists", null, "BLOG_EXISTS");
        return;
      }

      const blog = await BlogServices.createBlog({
        title,
        description,
        author:"",
      });
      response(res, 201, "Blog created", blog);
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

  static async getAllBlogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await BlogServices.getAllBlogs();
      response(res, 200, "All blogs retrieved!", blogs);
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

  static async deleteBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params;
      const blog = await BlogServices.getBlogById(blogId);
      if (!blog) {
        response(res, 404, "Blog not found", null, "NOT_FOUND");
        return;
      }
      const deletedBlog = await BlogServices.deleteBlog(blogId);
      response(res, 200, "Blog deleted successfully", deletedBlog);
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

  static async updateBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params;
      const blog = await BlogServices.getBlogById(blogId);
      if (!blog) {
        response(res, 404, "Blog not found", null, "NOT_FOUND");
        return;
      }
      const { title, description } = req.body || {};
      const updatedBlog = await BlogServices.updateBlog(blogId, {
        title,
        description,
      });
      response(res, 200, "Blog updated successfully", updatedBlog);
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

  static async singleBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params;
      const getBlog = await BlogServices.getBlogById(blogId);
      if (!getBlog) {
        response(res, 404, "Blog not found", null, "NOT_FOUND");
        return;
      }
      const blog = await BlogServices.getBlogById(blogId);
      response(res, 200, "Blog retrieved successfully", blog);
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

export default BlogController;
