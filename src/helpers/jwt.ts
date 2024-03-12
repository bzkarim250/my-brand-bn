import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRETKEY;

if (!jwtSecretKey) {
  throw new Error("JWT_SECRETKEY is not defined in the environment variables.");
}

export const sign = (payload: string | object | Buffer): string =>
  jwt.sign(payload, jwtSecretKey, { expiresIn: "48h" });

export const verify = (token: string): string | object =>
  jwt.verify(token, jwtSecretKey);
