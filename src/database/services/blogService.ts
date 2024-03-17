import { IBlog, Blog } from "../models/blog";
import { Types } from "mongoose";

class BlogServices {
  static async getAllBlogs() {
    const blogs = await Blog.find()
      .populate("author", "fullname email -_id")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "fullname -_id",
        },
        select: "content",
      });
    return blogs;
  }

  static async getSingleBlog(query: string): Promise<IBlog | null> {
    const blog = await Blog.findOne({ title: query });
    return blog;
  }

  static async createBlog(blogData: { title: string; description: string; author: string; imageURL: string | undefined }): Promise<IBlog> {
    const blog = await Blog.create(blogData);
    return blog;
  }

  static async getBlogById(blogId: string): Promise<IBlog | null> {
    const blog = await Blog.findById(blogId);
    return blog;
  }

  static async updateBlog(blogId: string, blogData: Partial<IBlog>): Promise<IBlog | null> {
    const blog = await Blog.findByIdAndUpdate(blogId, blogData, { new: true });
    return blog;
  }

  static async deleteBlog(blogId: string): Promise<IBlog | null> {
    const blog = await Blog.findByIdAndDelete(blogId);
    return blog;
  }

  static async addCommentToBlog(blogId: string, commentId: Types.ObjectId): Promise<void> {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog not found");
    }
    blog.comments!.push(commentId);
    await blog.save();
  }
}

export default BlogServices;
