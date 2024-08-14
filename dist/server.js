"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const main = () => {
    const server = app_1.default.listen(config_1.default.port, () => {
        console.log("Server is running on port:", config_1.default.port);
    });
};
main();
//DATABASE_URL=postgresql://postgres:YTjaaDPaULOHdGDqtnFIObTlGnByzofy@monorail.proxy.rlwy.net:26093/railway
