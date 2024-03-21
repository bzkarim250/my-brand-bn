import { Response } from "express";
import response from "../helpers/response";
import CommentServices from "../database/services/commentService";
import BlogServices from "../database/services/blogService";
import { CustomeRequest } from "../middlewares/auth";

class CommentController {
  static async addComment(req: CustomeRequest, res: Response) {
    try {
      const { content } = req.body;
      const userId = req.user?.id as string;
      const { blogId } = req.params;
      const blog = await BlogServices.getBlogById(blogId);
      if (!blog) {
        response(res, 404, "Blog not found", null, "NOT_FOUND");
        return;
      }

      const newComment = await CommentServices.addComment(
        content,
        userId,
        blogId
      );

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
