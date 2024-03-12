import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dburl = process.env.DB_URL as string;

const connectDb = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("Database connect successfully");
  } catch (error: any) {
    console.error({ error: error.message });
  }
};

export default connectDb;
