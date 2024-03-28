import supertest from "supertest";
import { app} from "../index";
import { User } from "../database/models/user";

export const request = supertest(app);

const user = {
  fullname: "Test User",
  username: "test",
  email: "testuser@gmail.com",
  password: "@A1234pass",
};

const loginUser = {
  account: "testuser@gmail.com",
  password: "@A1234pass",
};

beforeAll(async () => {
  await User.deleteMany();
});

describe("POST /api/user/signup", () => {
  test("should create user", async () => {
    const res = await request.post("/api/user/signup").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Signup successful");
    expect(res.body.data).toBeDefined();
  });

  test("should not create duplicate users", async () => {
    const res = await request.post("/api/user/signup").send(user);
    expect(res.statusCode).toBe(409);
  });
});

describe("POST /api/user/login", () => {
  test("should not login user with incorrect email", async () => {
    const res = await request
      .post("/api/user/login")
      .send({ account: "wrongemail@gmail.com", password: "@A1234pass" });
    expect(res.statusCode).toBe(404);
  });

  test("should not login user with incorrect password", async () => {
    const res = await request
      .post("/api/user/login")
      .send({ account: "testuser@gmail.com", password: "@Wrongpassword1" });
    expect(res.statusCode).toBe(401);
  });

  test("should return authentication token on successful login", async () => {
    const res = await request.post("/api/user/login").send(loginUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
  });

  test("should not login user with invalid formatted or empty email or password", async () => {
    const res = await request
      .post("/api/user/login")
      .send({ account: "", password: "" });
    expect(res.statusCode).toBe(404);
  });
});


