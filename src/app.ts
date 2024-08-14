import express, { Application } from "express";
import cors from "cors";
import router from "./app/router";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { apiNotFoundHandler } from "./app/middleware/apiNotFoundHandler";
const app: Application = express();

//parser
app.use(
  cors({
    origin: "http://localhost:3000",
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

//bloodCaresa79kib..
//DATABASE_URL=postgresql://postgres:YTjaaDPaULOHdGDqtnFIObTlGnByzofy@monorail.proxy.rlwy.net:26093/railway
//DATABASE_URL=postgres://postgres.snpiuhfryrlvzmyratse:bloodCaresa79kib..@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
//https://blood-donation-client-one.vercel.app
