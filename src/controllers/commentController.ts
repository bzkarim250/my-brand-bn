import { Request, Response } from "express";
import response from "../helpers/response";
import CommentServices from "../database/services/commentService";
import BlogServices from "../database/services/blogService";

class CommentController {
  static async addComment(req: Request, res: Response) {
    try {
      const { content } = req.body;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userId = (req as any).user?.id;
      const { blogId } = req.params;
      const blog = await BlogServices.getBlogById(blogId);
      if (!blog) {
        response(res, 404, "Blog not found", null, "NOT_FOUND");
        return;
      }

      // Add the comment to the blog
      const newComment = await CommentServices.addComment(
        content,
        userId,
        blogId
      );

      // Push the comment to the blog
      await BlogServices.addCommentToBlog(blogId, newComment._id);

      response(res, 201, "Comment added successfully", newComment);
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

export default CommentController;
