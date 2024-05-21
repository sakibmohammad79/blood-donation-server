import express, { Application } from "express";
import cors from "cors";
const app: Application = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Welcome blood donation application!",
  });
});

export default app;
