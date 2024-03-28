import supertest from "supertest";
import { app } from "../index";

export const request = supertest(app);

const user = {
  fullname: "Test Admin",
  username: "admin",
  email: "admin@gmail.com",
  password: "@A1234pass",
  role: "admin",
};

let token: string;

describe("Message Tests", () => {
  let messageId: string;
  test("Should create an admin to view and delete messages", async () => {
    const res = await request.post("/api/user/signup").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Signup successful");
    token = res.body.data.accessToken;
    expect(res.body.data).toBeDefined();
  });

  test("Should send a message", async () => {
    const messageData = {
      email: "bzkarim250@gmail.com",
      message: "Hello, How can I reach out to you?",
    };

    const res = await request
      .post("/api/message/contact-me")
      .set("Authorization", `Bearer ${token}`)
      .send(messageData);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Message sent!");
    expect(res.body.data).toBeDefined();
    messageId = res.body.data._id;
  });

  test("Should Retrieve all messages", async () => {
    const res = await request
      .get("/api/message/all")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("All messages retrieved!");
    expect(res.body.data).toBeDefined();
  });

  test("Should get single message", async () => {
    const res = await request
      .get(`/api/message/single/${messageId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Message retrieved successfully");
    expect(res.body.data).toBeDefined();
  });

  test("Should delete a message", async () => {
    const res = await request
      .delete(`/api/message/delete/${messageId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Message deleted successfully");
    expect(res.body.data).toBeDefined();
  });
});
