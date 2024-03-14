import { IBlog, Blog } from "../models/blog";

class BlogServices {
  static async getAllBlogs() {
    const blogs = await Blog.find()  //.populate("author","name email");
    return blogs;
  }

  static async getSingleBlog(query: string): Promise<IBlog | null> {
    const blog = await Blog.findOne({ title: query });
    return blog;
  }
  static async createBlog(blogData: { title: string; description: string; author: string }): Promise<IBlog> {
    const blog = await Blog.create(blogData);
    return blog;
  }

  static async getBlogById(blogId: string): Promise<IBlog | null> {
    const blog = await Blog.findById(blogId);
    return blog;
  }

  static async updateBlog(
    blogId: string,
    blogData: Partial<IBlog>
  ): Promise<IBlog | null> {
    const blog = await Blog.findByIdAndUpdate(blogId, blogData, { new: true });
    return blog;
  }

  static async deleteBlog(blogId: string): Promise<IBlog | null> {
    const blog = await Blog.findByIdAndDelete(blogId);
    return blog;
  }
}

export default BlogServices;
