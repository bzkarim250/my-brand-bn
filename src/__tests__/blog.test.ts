import supertest from "supertest";
import { app } from "../index";
import { Blog } from "../database/models/blog";

export const request = supertest(app);

const user = {
  fullname: "Test User",
  username: "test",
  email: "author@gmail.com",
  password: "@A1234pass",
  role: "admin",
};

let token: string;
let userId: string;
let blogID: string;

beforeAll(async () => {
  await Blog.deleteMany();
});

describe("POST /api/blog", () => {
  test("Should create an author", async () => {
    const res = await request.post("/api/user/signup").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Signup successful");
    userId = res.body.data._id;
    token = res.body.data.accessToken;
    expect(res.body.data).toBeDefined();
  });

  test("should create a new blog post", async () => {
    const res = await request
      .post("/api/blog/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Blog",
        author: userId,
        description: "This is a test blog post",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Blog created");
    expect(res.body.data).toBeDefined();
    blogID = res.body.data._id;
  });
  test("should not create duplicate", async () => {
    const res = await request
      .post("/api/blog/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Blog",
        author: userId,
        description: "This is a test blog post",
      });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Blog already exists");
  });
});

describe("GET /api/blog/:blogId", () => {
  test("should retrieve a single blog post", async () => {
    const newBlog = new Blog({
      title: "Test Blog 2",
      description: "This is another test blog post",
      author: userId,
    });
    await newBlog.save();

    const res = await request.get(`/api/blog/single/${blogID}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Blog retrieved successfully");
    expect(res.body.data).toBeDefined();
  });
  test("should return Blog not found ,Blog id doesn't exist", async () => {
    const res = await request.get(`/api/blog/single/65f3134a494934b10177c062`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Blog not found");
  });
});

describe("GET /api/blog/all", () => {
  test("should retrieve all blogs", async () => {
    const res = await request.get("/api/blog/all");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("All blogs retrieved!");
    expect(res.body.data).toBeDefined();
  });
});
describe("PATCH /api/blog/update/:blogId", () => {
  test("should update the blog", async () => {
    const res = await request
      .patch(`/api/blog/update/${blogID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Update Title",
        description: "Update the description",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Blog updated successfully");
    expect(res.body.data).toBeDefined();
  });
  test("should not update a non-existing blog", async () => {
    const res = await request
      .patch(`/api/blog/update/65f3134a494934b10177c062`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Update Title",
        description: "Update the description",
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Blog not found");
  });
});

describe("PATCH /api/blog/like/:blogId", () => {
  test("should like a blog", async () => {
    const res = await request
      .patch(`/api/blog/like/${blogID}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Blog liked successfully");
    expect(res.body.data).toBeDefined();
  });
  test("should not like blog two times", async () => {
    const res = await request
      .patch(`/api/blog/like/${blogID}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("You have already liked this blog");
  });
  test("should not like a non-existing blog", async () => {
    const res = await request
      .patch(`/api/blog/like/65f3134a494934b10177c062`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Blog not found");
  });
});

describe("POST /api/comment/add/:blogId", () => {
  test("should add comment to a blog", async () => {
    const res = await request
      .post(`/api/comment/add/${blogID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: " Thanks this is very informative",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Comment added successfully");
    expect(res.body.data).toBeDefined();
  });
  test("should not comment to a non-existing blog", async () => {
    const res = await request
      .post(`/api/comment/add/65f3134a494934b10177c062`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: " Thanks this is very informative",
      });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Blog not found");
  });
});

describe("DELETE /api/blog/delete/:blogId", () => {
  test("should delete to a blog", async () => {
    const res = await request
      .delete(`/api/blog/delete/${blogID}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Blog deleted successfully");
    expect(res.body.data).toBeDefined();
  });
  test("should not delete a non-existing blog", async () => {
    const res = await request
      .delete(`/api/blog/delete/${blogID}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Blog not found");
  });
});
