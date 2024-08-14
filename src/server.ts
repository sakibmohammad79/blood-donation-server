import { Server } from "http";
import app from "./app";
import config from "./config";

const main = () => {
  const server: Server = app.listen(config.port, () => {
    console.log("Server is running on port:", config.port);
  });
};

main();

//DATABASE_URL=postgresql://postgres:YTjaaDPaULOHdGDqtnFIObTlGnByzofy@monorail.proxy.rlwy.net:26093/railway
