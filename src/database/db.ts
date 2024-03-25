import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dburl: string =
  process.env.NODE_ENV === "test"
    ? process.env.DB_URL_TEST || ""
    : process.env.DB_URL || "";

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(dburl);
    console.log(
      `${
        process.env.NODE_ENV === "test"
          ? "Testing Database connected successfully!"
          : "Database connected successfully!"
      }`
    );
  } catch (error) {
    console.error({ error: (error as Error).message });
  }
};

const disconnectDb = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected successfully!");
  } catch (error) {
    console.error({ error: (error as Error).message });
  }
};

const dropDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.dropDatabase();
  } catch (error) {
    console.error({ error: (error as Error).message });
  }
};

export { connectDb, disconnectDb, dropDatabase };
