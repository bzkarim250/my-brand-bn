import express, { Application } from "express";
import { Server } from "http";
import cors from "cors";

import connectDb from "./database/db";
import route from "./routes/index";
import swaggerDocs from "./api-docs/swagger";

connectDb();
const app: Application = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const server: Server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", route);
swaggerDocs(app);

export default server;
