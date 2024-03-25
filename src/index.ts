import express, { Application } from "express";
import cors from "cors";

import { connectDb } from "./database/db";
import route from "./routes/index";
import swaggerDocs from "./api-docs/swagger";

connectDb();
const app: Application = express();
app.use(cors());
app.use(express.json());

const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

app.use("/api", route);
swaggerDocs(app);

export { app };
