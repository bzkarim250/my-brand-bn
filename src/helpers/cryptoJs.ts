import cryptoJs from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRETKEY;

if (!jwtSecretKey) {
  throw new Error("JWT_SECRETKEY is not defined in the environment variables.");
}

export const generate = async (password: string): Promise<string> =>
  cryptoJs.AES.encrypt(password, jwtSecretKey).toString();

export const check = (hashedPassword: string, password: string): boolean => {
  const decryptedPassword = cryptoJs.AES.decrypt(
    hashedPassword,
    jwtSecretKey
  );
  const originalPassword = decryptedPassword.toString(cryptoJs.enc.Utf8);
  return originalPassword === password;
};
