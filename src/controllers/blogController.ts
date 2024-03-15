import { Request, Response } from "express";
import BlogServices from "../database/services/blogService";
import response from "../helpers/response";
import cloudinary from "../helpers/cloudinary";
class BlogController {
  static async createBlog(req: Request, res: Response): Promise<void> {
    try {
      let postLink: string|undefined;
      if (req.file !== undefined) {
        const file = req.file.path;
        const link = await cloudinary.uploader.upload(file);
        postLink = link.secure_url;
      }
      const { title, description } = req.body;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authorId = (req as any).user?.id;
      const blogExists = await BlogServices.getSingleBlog(title);
      if (blogExists) {
        response(res, 409, "Blog already exists", null, "BLOG_EXISTS");
        return;
      }

      const blog = await BlogServices.createBlog({
        title,
        description,
        imageURL: postLink,
        author: authorId,
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
