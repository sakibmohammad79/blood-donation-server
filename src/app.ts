import express, { Application } from "express";
import cors from "cors";
import router from "./app/router";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { apiNotFoundHandler } from "./app/middleware/apiNotFoundHandler";
const app: Application = express();

//parser

app.use(
  cors({
    origin: "https://blood-donation-client-one.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application route
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome blood donation application!",
  });
});

app.use(globalErrorHandler);

app.use(apiNotFoundHandler);

export default app;


