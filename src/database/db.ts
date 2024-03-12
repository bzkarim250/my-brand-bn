import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dburl: string = process.env.DB_URL as string;

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(dburl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error({ error: (error as Error).message });
  }
};

export default connectDb;
