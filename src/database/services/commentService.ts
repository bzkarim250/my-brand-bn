import { Comment, IComment } from "../models/comment";

class CommentServices {
  static async addComment(
    content: string,
    userId: string,
    blogId: string
  ): Promise<IComment> {
    const comment = new Comment({
      content,
      user: userId,
      blog: blogId,
    });
    return await comment.save();
  }
}

export default CommentServices;
