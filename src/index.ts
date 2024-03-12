import express, { Application } from "express";
import { Server } from "http";
import cors from "cors";

import connectDb from "./database/db";
import route from "./routes/index";

connectDb();
const app: Application = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const server: Server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", route);

export default server;
